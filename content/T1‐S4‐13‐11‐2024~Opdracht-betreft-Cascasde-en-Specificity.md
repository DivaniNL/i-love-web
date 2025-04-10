## Opdracht betreft Cascasde en Specificity [13-11-2024]
Na de Workshop "stylesheets for styleguides" zijn we zelf aan de slag gegaan met verschillende experimenten betreft Cascasde en Specificity.

***

### Experiment 1: Element Selector

Ik heb een ```<h2>``` element gemaakt met een class uit de gezamenlijke stylesheet en nog een ```<h2>``` element zonder class:

```html
<h2 class="heading-medium">Ik ben een heading, welke kleur krijg ik?</h2>
<h2>Ik ben ook een heading, welke kleur krijg ik?</h2>
```
In specificity.css heb ik een element selector gemaakt met een andere kleur dan in de huisstijl:

```css
h2 {
    color: purple;
}
```
### Vragen
**Wordt de heading nu paars? Of wordt de huisstijl uitgevoerd?**  

De heading wordt inderdaad Paars.  

**Waarom gebeurt dit?**  

Dit gebeurt omdat het specificity css-bestand later ingeladen wordt als de file met de huisstijl.
***

### Experiment 2: Class Selector
Ik heb een extra ```<h2>``` element toegevoegd met twee classes:

```html
<h2 class="heading-medium green">Ik ben een heading met twee classes</h2>
```
Vervolgens heb ik de green class in specificity.css toegevoegd met een nieuwe kleur:

```css
.green {
    color: green;
}
```
### Vragen
**Welke kleur krijgt de heading met twee classes? De kleur van de huisstijl of de green class?**  

Deze wordt zwart. Deze kleur is afkomstig uit de huisstijl.  

**Waarom krijgt de heading die kleur?**  

Omdat in ```redpers.css``` deze code staat:
```css
.h2.heading_quote {
 /*Quote */
 color: var(--black);
 font-family: var(--font-heading-important);
 font-weight: bold;
 line-height: var(--line-height-xs);
 font-size: var(--font-size-header-xl);
}
```
Deze selector heeft een weight van ```0 0 1 1```. Het target de class en het element. De waarde hiervan is 11
De selector in ```specifity.css``` bevat de volgende code:
```
.green {
    color: green;
}
```
Deze selector heeft een weight van ```0 0 1 0```. Het target enkel de class. De waarde hiervan is 10.

Aangezien ```10 > 11``` wint de selector in de huisstijl.
### Experiment 3: Class Volgorde
In specificity.css heb ik een class gemaakt met dezelfde naam als in de gezamenlijke stylesheet, maar met een andere kleur:

```css
.heading-medium {
    color: pink;
}
```
**Welke kleur hebben de headings nu?**  

Zwart

**Waarom hebben de headings deze kleur?**

Om de zelfde reden als in Experiment 2. In de huisstijl wordt ook het element gebruikt in de selector.

### Experiment 4: ID Selector

Ik heb nog een ```<h2>``` element toegevoegd met de heading-medium class uit de gezamenlijke stijlesheet en een ID:

```html
<h2 class="heading-medium test" id="heading">Ik ben een heading met een ID</h2>
```
In specificity.css heb ik een ID selector gemaakt met een andere kleur:

```css
#heading {
    color: yellow;
}
```
**Welke kleur krijgt de heading?**
Deze laatste heading wordt geel

**Waarom wint de kleur van de ID-selector of de class?**

Omdat een ID selector zxwaarder weegt dan een class selector.