// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

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

const filesWithInfo = [];
files.forEach((file) => {
    let fileWithIinfo = [];
    let cleanedFile = file.replace(/[‐−]/g, '-'); // Haal die kut minnetjes weg en verander naar normaal streepje
    let termIndexStart = cleanedFile.indexOf("T");
    let termIndexEnd = cleanedFile.indexOf("-", termIndexStart);
    let term = cleanedFile.slice(termIndexStart + 1, termIndexEnd);

    let sprintIndexStart = cleanedFile.indexOf("S");
    let sprintIndexEnd = cleanedFile.indexOf("-", sprintIndexStart);
    let sprint = cleanedFile.slice(sprintIndexStart + 1, sprintIndexEnd);
    let hasSubject = cleanedFile.indexOf("~") != -1;
    let subject;
    let dateIndexStart;
    let dateIndexEnd
    let date;
    if(hasSubject){
        let subjectIndexStart = cleanedFile.indexOf("~");
        let subjectIndexEnd = cleanedFile.indexOf(".", subjectIndexStart);
        subject = cleanedFile.slice(subjectIndexStart + 1, subjectIndexEnd);
        console.log(subject);

        dateIndexStart = sprintIndexEnd + 1;
        dateIndexEnd = subjectIndexStart;
        date = cleanedFile.slice(dateIndexStart, dateIndexEnd);
        console.log(date);
    }
    else{
        subject = "Daily Checkout"
        dateIndexStart = sprintIndexEnd;
        dateIndexEnd = cleanedFile.indexOf(".", dateIndexStart);
        date = cleanedFile.slice(dateIndexStart + 1, dateIndexEnd);
    }
    filesWithInfo.push({
        date: date,
        Title: subject,
        term: term,
        sprint: sprint,
        fileName: file
    });

});
let SortedFiles = { Terms: [] };
filesWithInfo.forEach(file => {
    // Haal semester en sprint uit de file array instantie
    const termNum = parseInt(file.term);
    const sprintNum = parseInt(file.sprint);
    // Zoekt term op in object
    let term = SortedFiles["Terms"].find(s => s.term === termNum);
    // Als de term niet bestaat maak de term object aan met een sprints array
    if (!term) {
        term = { term: termNum, Sprints: [] };
        SortedFiles.Terms.push(term);
    }
    // Zoekt sprint op in term object met juiste termnummer
    let sprint = term["Sprints"].find(s => s.id === sprintNum);
    // Als sprint niet bestaat, maak sprint aan in het juiste term met een files array
    if (!sprint) {
        sprint = { id: sprintNum, SprintTitle: sprintsWTitle[sprintNum - 1]["title"], Files: [] };
        term.Sprints.push(sprint);
    }
    // Voeg file toe aan de juiste sprint
    sprint.Files.push(file);
});

let highestSprintSoFar;
function mostExpensiveItemName(filesWithInfo) {
    highestSprintSoFar = 0;
    for (const { sprint } of filesWithInfo) {
        if (sprint > highestSprintSoFar) {
            highestSprintSoFar = sprint;
        }
    }
}
mostExpensiveItemName(filesWithInfo);

app.get('/', async function(request, response){

    response.render('home.liquid', {files: SortedFiles, highestSprintSoFar: highestSprintSoFar});
})
app.get('/semester1', async function(request, response){
    response.render('semester1.liquid');
})
app.get('/semester2', async function(request, response){
    response.render('semester2.liquid');
})
app.get('/journal/:slug', async function(request, response){

    console.log(request.params.slug)
    let fileContent = await readFile('content/'+ request.params.slug + ".md", {encoding: 'utf-8'})
    const markedUp = marked.parse(fileContent)

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



    response.render('article.liquid',{content: finalHTML, contentTitle: request.params.slug});
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
