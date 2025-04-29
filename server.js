// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'
import matter from 'gray-matter';
// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

import { readdir, readFile } from 'node:fs/promises'
import * as cheerio from 'cheerio';
const files = await readdir('content');

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))
// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')
import { marked } from 'marked'
let sprintsWTitle = [
    { "sprint": 1, "title": "Your Tribe" },
    { "sprint": 2, "title": "The Client" },
    { "sprint": 3, "title": "All Human" },
    { "sprint": 4, "title": "Look and Feel" },
    { "sprint": 5, "title": "Fix the Flow" },
    { "sprint": 6, "title": "The Startup" },
    { "sprint": 7, "title": "Connect Your Tribe" },
    { "sprint": 8, "title": "Server-Side Rendering" },
    { "sprint": 9, "title": "The Web is for Everyone" },
    { "sprint": 10, "title": "User Experience" },
    { "sprint": 11, "title": "Pleasurable UI" },
    { "sprint": 12, "title": "Proof of Concept" }
];

let termsWTitle = [
    { "term": 1, "title": "Static Web" },
    { "term": 2, "title": "Data-Driven Web" },
    { "term": 3, "title": "Workflow, Tooling & Frameworks" },
    { "term": 4, "title": "Meesterproef" },
];

const filesWithInfo = [];
for (const file of files) {
    const rawContent = await readFile('content/' + file, { encoding: 'utf-8' });
    console.log(file)
    const { data: frontMatter } = matter(rawContent);


    filesWithInfo.push({
        frontMatter: frontMatter || {},
        date: file.slice(0, -3),
        sprint: frontMatter.Sprint || null,
        term : frontMatter.Term || null,
    });

}
console.log(filesWithInfo);

app.get('/', async function(request, response){

    response.render('home.liquid', {files: filesWithInfo});
})
app.get('/journal', async function(request, response){

    response.render('journal.liquid', {files: filesWithInfo, sprints: sprintsWTitle, terms: termsWTitle});
})
app.get('/semester1', async function(request, response){
    response.render('semester1.liquid');
})
app.get('/semester2', async function(request, response){
    response.render('semester2.liquid');
})
app.get('/journal/:slug', async function(request, response){

    console.log(request.params.slug)
  
    marked.use({
        renderer: {
            heading({ tokens, depth }) {
            const text = this.parser.parseInline(tokens);
            console.log('Heading Level:', depth);
      
            // Verschuif alle levels 1 hoger
            const newLevel = Math.min(depth - 1, 6);
            return `<h${newLevel}>${text}</h${newLevel}>`;
          }
        }
      });
      
      const rawContent = await readFile('content/' + request.params.slug + ".md", { encoding: 'utf-8' });
      const { content, data } = matter(rawContent); // content = markdown, data = frontmatter
      const markedUp = marked.parse(content);

    // Dit had ik echt nooit zelf kunnen doen, dankje ChadGPT. Hiermee zorg ik ervoor dat alle a elementen die direct in een parent element staan, worden omgezet naar a.button in een buttons div
    const $ = cheerio.load(markedUp);
    const result = [];
    let buffer = [];
    $('body').contents().each((i, el) => {
        const $el = $(el);
    
        // Alle <a>'s die direct kind zijn van dit element
        const $anchors = $el.is('a') ? [$el] : $el.find('a');
    
        // Check of dit element alleen maar <a>'s bevat (bv. een <p> met enkel <a>'s)
        const allAreLinks =
            $anchors.length &&
            $el.contents().filter((i, child) => {
                return child.type === 'tag' && child.tagName !== 'a';
            }).length === 0;
    
        if ($anchors.length && allAreLinks) {
            $anchors.each((i, a) => {
                $(a).addClass('button');
                buffer.push($(a));
            });
        } else {
            if (buffer.length) {
                const $group = $('<div class="buttons"></div>');
                buffer.forEach(a => $group.append(a));
                result.push($group);
                buffer = [];
            }
    
            result.push($el);
        }
    });
    if (buffer.length) {
        const $group = $('<div class="buttons"></div>');
        buffer.forEach(a => $group.append(a));
        result.push($group);
    }
    const finalHTML = result.map(el => $.html(el)).join('\n');
    // end of ChadGPT code



    response.render('article.liquid',{
        content: finalHTML, 
        contentTitle: data.title || request.params.slug,
        meta: data
    });
    console.log(finalHTML);
})

app.get('/garden', async function(request, response){
    response.render('garden.liquid');
})
app.get('/over-mij', async function(request, response){
    
 
    response.render('over-mij.liquid');
})


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
