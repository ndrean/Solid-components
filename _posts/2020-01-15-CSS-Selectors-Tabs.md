---
layout: post
title: CSS, selectors, example with tabs
---



## Tabs

/* the logic */

```css
/* to not display all inputs = radio buttons */
input {display: none;} 


/* group the inputs with same name = 'radiobutton' */
/* select all the 'label' immediately after 'input' with 'input+label'
and create a row of labels with "display:inline-block" so that all
the labels will be aligned  */
input + label { display: inline-block;} 

/* select every element with class '.textbox' preceded by tag 'label'
and do not display it */
label ~.textbox {display: none; } 

/* #tab-1:check ~.tab.content-1  means select the elt with .content-1
/* immediately after #tab-1 with property checked */

/* display any class 'textbox' preceded by a label that is checked */

#tab-1:checked ~ .content-1,
#tab-2:checked ~ .content-2,
#tab-3:checked ~ .content-3 {
    display: block;
}

/* some styling */

/* select all labels immediately following an input with property checked */
input:checked + label { background-color: white;}

/* select all labels immediately following an input with property NOT checked */
input:not(:checked) + label { background-color: lightgrey; }




label { 
    padding: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0px;
    font-weight: bold;;
}

.textbox { 
    background-color: white;
    padding: 1rem;
}

```
    

```
<!-- start by default with label 1 -->
<!-- group the checkoxes with same name -->
<input type="radio" name="radiobutton" id="tab-1" checked />
<label for="tab-1">Tab one</label>

<input type="radio" name="radiobutton" id="tab-2" />
<label for="tab-2">Tab two</label>

<input type="radio" name="radiobutton" id="tab-3" />
<label for="tab-3">Tab three</label>

<!-- give all divs a .textbox to select them after a label -->
<!--  give every div a unique .content-i for indivual display when input is checked -->
<div class="textbox content-1">1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, provident?     </div>
<div class="textbox content-2">2: Lorem ipsum dolor sit amet consectetur adipisicing elit. In, minus.               </div>
<div class="textbox content-3">3: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, cupiditate! </div>
 
```
    
    
