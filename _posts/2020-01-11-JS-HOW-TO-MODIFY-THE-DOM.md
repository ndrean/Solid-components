---
layout: post
title: Javascript, how to modifiy the DOM
---

## CSS selectors

The method `document.querySelector()` returns the first element found when we select elements of the DOM:
- by tag (`div`)
- by id (`#btn_red`),
- by class (`.btn`)  or psuedo-class (`a:hover`)
- with both class `(".class1.class2")`
- mixed: `li` with class1 with `("li.class1")`
- Inside: descendants with class2 of parents with class1:  `(".class1 .class2")`
- Inside: `li` descendants inside a `div`: `("div li")`,
- AND: search for paragraphs and  links with `("p,a")`,
- Direct childs with `("div > li")`
- for first childs `("p:first-child")`

- by attribute: `("p[color=blue]")` for  <p style="color:blue;">
- class ends with:  a[href$=".pdf"]
 - starts with: a[href^="https"]

The method `document.querySelectorAll('.a_class')` returns all found.

We also have `document.getElementById('my_id')` which returns the first found.

We have advanced selectors:
- `p#an_id`   (paragraph with `id = an_id`)
- `p > .an_id` (for any child of a paragraph whose `id`  is 'an_id') .... 
- TODO

### Example `nth-of-type()`
<table id="score">
  <thead>
    <tr>
      <th>Test
      <th>Result
  <tfoot>
    <tr>
      <th>Average
      <td>82%
  <tbody>
    <tr>
      <td>A
      <td>87%
    <tr>
      <td>B
      <td>78%
    <tr>
      <td>C
      <td>81%
</table>

`document.querySelectorAll("#score>tbody>tr>td:nth-of-type("1")` returns an array `[A,B,C]` and ``document.querySelectorAll("#score>tbody>tr>td:nth-of-type("2")` returns the array `[ 87%, 78%, 81% ]`.


## Create new Nodes

Property/Method  |	Description
-----------------|---------------
createElement() |	Create a new element node
createTextNode() |	Create a new text node
node.textContent | 	Get or set the text content of an element node
node.innerHTML |	Get or set the HTML content of an element

### `elt.textContent` and `elt.appendChild(document.createTextNode())` and `innerHTML`.

The property `textContent` renders the full content of `Node` objects and the property `innerHTML` returns the visible content of HTML elements. For example, if we create a paragraph `p = document.createElement('p')`, then both the method `createTextNode(text)` with `appendChild`  and `p.innerHTML(text)` will render raw text: if  `text = '<ul><li> A point </li></ul>'`, we will see the text, not the 'normal 'bullet point' which is rendered by `innerHTML`.

Setting the property `elt.textContent` or `innerHTML` will erase everything, whilst `elt.appendChild(document.createTextNode())` will append to the existing text. 

If we just add some raw text inside an element, then `textContent`is prefered to `innerHTML` to avoid XSS.

```javascript
const par = document.CreateElement('p')
const text = par.textContent
// or equivalently
  const text = document.createTextNode('My first paragraph')
  par.appendChild(text)
document.body.appendChild(par)

```

## `insertAdjacentElement` to insert elements in the DOM

We use the method `insertAdjacentHTML`

    'beforebegin': Before the targetElement itself.
    'afterbegin': Just inside the targetElement, before its first child.
    'beforeend': Just inside the targetElement, after its last child.
    'afterend': After the targetElement itself.
    
<'!-- beforebegin -->
<'p>
<'!-- afterbegin -->
  some text
<'!-- beforeend -->
<'/p>
<'!-- afterend -->


`const ul = document.querySelector('ul')`
`const li = document.createElement('li')`

Property/Method |	Description | Example
----------------|-------------|--------
node.appendChild('tag') |	Add a node as the last child of a parent element | `ul.appendChild(li)`
node.insertBefore() |	Insert a node into the parent element before a specified sibling node | `ul.insertBefore(li, ul.firstElementChild)`
node.replaceChild() |	Replace an existing node with a new node | `ul.replaceChild(li, ul.children[1])`


Method |	Description
-------|-----------
node.removeChild() | 	Remove child node
node.remove() |	Remove node

`elt.childElementCount`  counts the number of children  of an element (the length of the  HTML collection). We have the method `firstElementChild`  and `lastElementChild` and the selector `nth-child(i)` where `i<elt.childElementCount`.

The method `nextElementSibling`   gives acces to the next  HTML sibling element if exists (otherwise, it returns `null`). The method `previousElementSibling`  also exists.
