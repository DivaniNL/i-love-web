# My Tribe

Voor deze opdracht moesten we een online visitekaartje maken in je eigen stijl.

## Waar heb ik voor gekozen?

Ik heb gekozen om een layout te maken waar in de linkerkant een menu te vinden is met buttons waardoor het gedeelte rechts beperkt is qua hogote en er geen nieuwe pagina's nodig zijn.

## Waar liep ik tegen aan?

Aan het begin stonden mijn scss -> css watch instellingen nog niet helemaal goed, dus dit duurde even voordat mijn scss goed gecompiled werdt naar css code.
Daarnaast waren sommige stukke content niet selecteerbaar. Dit heb ik opgelost met de volgende code:

```css 
.wrapper{
 opacity: 0;
 padding: 24px;
 width: 100%;
 box-sizing: border-box;
 position: absolute;
 top: 0;
 height: 100%;
   &.active{
     opacity: 1;
     z-index: 99;
     overflow: auto;
   }
}
```
Met behulp van een hoge z-index op de actieve wrapper valt deze over alle blokken heen, waardoor alleen deze tekst selecteerbaar is.

### 04-09-2024 Shortened Some Code
Er bestond een functie die na een page load de eerste button en wrapper ative class geeft. Later bedacht ik me dat ik simpelweg in de HTML deze handmatig een active class kan geven. Dit is voor nu beter aangezien mijn menu nu niet dynamisch is, maar hard in de code staat. Mocht ik deze code later nog nodig hebben, dan weet ik hem te vinden ;)

```JS
function setActiveTab(){
    //At page load set the first tab
    var $this = $('nav .nav_item').first();
    let num = $this.data('giver');
    $this.toggleClass("active")
    let toshow = $('article .wrapper[data-receiver='+num+']');
    toshow.toggleClass("active")
}
```

Op de I Love Website zullen hieronder afbeeldingen getoond worden van de schetsen voor deze website.

Hier nog wat info over uitklapbaar social media blok