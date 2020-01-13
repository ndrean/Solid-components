---
layout: post
title: HTML, Dataset, how to use with Javascript and CSS
---

`dataset` is a way to store data inside an HTML file. Anything prefixed with `data-` will be a data attribute. This looks like:

  `<p id=1 data-test-id = "1" data-test2= 2>  Hello </p>`


### Reading & write dataset

With this first example, if we assign `par = document.getElementById('1')`, then `par.dataset` that will display all data attributes and return  `<p data-test-id = "1" data-test2= 2 >`.

To access a particular one, we do `par.dataset.testId`  (snake-case replaced by camelCase) and `par.dataset.test2`.

We can also do `par.getAttribute('data-test-id')`.

To change a `dataset`, we simply write `par.dataset.testId = 10`.

### Create & remove dataset

- writting directly into a HTML file. We can store data in an HTML file writting `<p id=1, data-test-id = "1" data-test2= 2>  Hello </p>`

- dynamically creating with Javascript: we select this paragraph with `const par = document.getElementById('1')` and we can add a `dataset` by
  `par.setAttribute('data-new','new value')`
  
 We can remove a `dataset`  by the method `removeAttribute`. For example,  `par.removeAttribute('data-new')


### Example
We can dynamically to the following
```javascript
<script>
const newPar = document.createElement('p')
document.body.appendChild(newPar)
newPar.setAttribute('data-counter', 3)
newPar.innerHTML = "This is paragraph number" + " " + newPar.dataset.counter
</script>
```
and render <p> This is paragraph number 3 </p>

### Display dataset via CSS
The `content` CSS property replaces an element with a generated value. We use the method `attr()` to read the dataset so that . We can  make the dataset appear ``::before`  or `::after` a selected tag.
Suppose we have the following 2 paragraphs:
  `<p id=1  data-p=10> My first paragraph </p>`
  `<p id=2 data-p=20> My second paragraph </p>` 
  
We can use the CSS property `::after`  or `::before` to display the attribute read by the method `attr()` respectively after and before the `innerHTML` of the paragraph. We can also use the data-value for conditionnal CSS.

when we define the style:
 
```css
p::after { content: attr('data-p') }
p:hover[data-p=1] { font-weight: bold; }
  ```
  
so that we print the value of the dataset as:
  
 <p> My first paragraph <strong>1</strong></p>
 <p> My second paragraph <strong>2</strong></p>
 
 which changes to bold when hovered over the first paragraph: 
 
 <p><strong> My first paragraph 2</strong></p> 
 <p> My second paragraph <strong>2</strong></p>

