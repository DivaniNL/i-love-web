### Daily Checkout 26-11: CSS Challenge States  

Vandaag hebben we uitleg gekregen over wat je met CSS kunt doen voor inputs en states. Hier zijn mijn notities en een samenvatting van wat ik heb geleerd:  

---

#### **Buttons**  
- **Standaard browserstijlen verwijderen**:  
  ```css
  appearance: none;
  ```  
- **Verschillende states**:  
  - `:focus`: Wordt geactiveerd bij klikken of navigeren via toetsenbord.  
  - `:focus-visible`: Wordt alleen geactiveerd bij toetsenbordnavigatie.  

- **Gebruik van `currentcolor`**:  
  De eigenschap gebruikt de huidige tekstkleur:  
  ```css
  outline: 0.15em currentcolor;
  outline-offset: -0.3em;
  ```  

---

#### **Links**  
- **Styling van onderlijnen**:  
  - `text-decoration-thickness`: Regelt de dikte van onderstrepen.  
  - `text-underline-offset`: Verplaatst de onderstreping verder naar beneden.  
  - `text-decoration-style: wavy`: Geeft een golvende lijn als onderstreping.  

- **Specifieke links targeten**:  
  - `a[href$="pdf"]`: Selecteert links die eindigen op `.pdf`. Je kunt een icoon of tekst toevoegen met `::after`:  
    ```css
    a[href$="pdf"]::after {
      content: " 📄";
    }
    ```  
  - `a[href^="mailto"]`: Selecteert links die beginnen met `mailto`.  

---

#### **Thema-opties**  
- Gebruik van `color-scheme` voor licht en donker thema:  
  ```css
  color-scheme: light dark;
  ```  

- Gebruik variabelen voor kleuren:  
  ```css
  --kleur: light-dark(#000, #fff);
  ```  

---

#### **Checkbox als switch**  
Checkbox-styling kan een switch imiteren:  
```css
input[type="checkbox"] {
  appearance: none;
  aspect-ratio: 2 / 1;
  background-color: white;
  border-radius: 0.75em;
}

input[type="checkbox"]::after {
  content: "";
  height: 100%;
  display: block;
  background-color: gray;
  border-radius: inherit;
}

input[type="checkbox"]:checked::after {
  opacity: 0.5;
  transform: translateX(100%);
  background-color: blue;
}
```  

---

#### **Media query voor motion voorkeuren**  
Geanimeerde overgangen uitschakelen voor gebruikers die bewegingsgevoelig zijn:  
```css
@media (prefers-reduced-motion: no-preference) {
  transition: 1s;
}
```  

---

#### **:has() Pseudo-class**  
- **Styling met afhankelijkheden**:  
  ```css
  label:has(input:checked) {
    background-color: blue;
    color: white;
  }
  ```  
- **Focus-gebaseerde styling**:  
  ```css
  label:has(input:focus-visible) {
    outline: solid 0.15em currentcolor;
    outline-offset: 0.5em;
  }
  ```  
- **Rotatie van een element afhankelijk van een state**:  
  ```css
  body:has(input:checked) main {
    rotate: 0.25turn;
  }
  ```  

---

#### **Gebruik van :is()**  
In plaats van meerdere selectors afzonderlijk te schrijven:  
```css
:is(ul, ol) li {
  margin-left: 1em;
}
```  

---

#### **Codepen**  
Mijn oefeningen zijn te zien op [[CodePen](https://codepen.io/Dylan-HvA/pen/PwYoPgQ)](https://codepen.io/Dylan-HvA/pen/PwYoPgQ).  
