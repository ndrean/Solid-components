---
layout: post
title: HTML, Dataset, how to use with Javascript and CSS
---

`dataset` is a way to store data inside an HTML file. This looks like:

  `<p id=1, data-test-id = "1" data-test2= 2>  Hello </p>`

Anything prefixed with `data-` will be a dataset.

### Create dataset


- writting directly into a HTML file. We can store data in an HTML file writting `<p id=1, data-test-id = "1" data-test2= 2>  Hello </p>`

- dynamically creating with Javascript: we select this paragraph with `const par = document.getElementById('1')` and we can add a `dataset` by
  `par.setAttribute('data-new','new value')`
  
### Reading dataset

We can do `par.dataset` that will return `<p data-test-id = "1" data-test2= 2  data-new="new value">`.

To access a particular one, we do `par.dataset.testId`  (snake-case replaced by camelCase) and `par.dataset.test2` and `par.dataset.new`.

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

### Modify dataset

We simply do `newPar.dataset.counter = 4`.

We can remove a `dataset`  by the method `removeAttribute`. For example,  `newPar.removeAttribute('data-counter')

