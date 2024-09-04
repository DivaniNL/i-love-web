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

Op de I Love Website zullen hieronder afbeeldingen getoond worden van de schetsen voor deze website.