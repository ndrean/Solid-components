---
layout: post
title: Javascript, how to select and modifiy the DOM
---

## Access selected elements in Javascript

- `document.querySelector('.class1')` returns the first found, and `querySelectorAll('.class1')`  returns them all. We have to put `.class1`  and `#my_id` with this method.

- `document.getElementById('my_id')` which returns the first found (since we are looking for `id`,  no need to specifiy `#my_id`).



### Example `nth-of-type()`

If we have the following HTML file:

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

which displays as:

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

then `document.querySelectorAll("#score>tbody>tr>td:nth-of-type("1")` returns an array `[A,B,C]` and `document.querySelectorAll("#score>tbody>tr>td:nth-of-type("2")` returns the array `[ 87%, 78%, 81% ]`.


## Create new Nodes

Property/Method  |	Description
-----------------|---------------
createElement() |	Create a new element node
createTextNode() |	Create a new text node
node.textContent | 	Get or set the text content of an element node
node.innerHTML |	Get or set the HTML content of an element

### Differences between `elt.textContent` and `elt.appendChild(document.createTextNode())` and `innerHTML`.

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
    
    <!-- beforebegin -->
    <'p>
    <!-- afterbegin -->
      some text
    <!-- beforeend -->
    </p>
    <!-- afterend -->

The method `elt.childElementCount`  counts the number of children  of an element (the length of the  HTML collection). We have the method `firstElementChild`  and `lastElementChild` and the selector `nth-child(i)` where `i<elt.childElementCount`.


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

### `nextElementSibling`
The method `nextElementSibling`   gives acces to the next  HTML sibling element if exists (otherwise, it returns `null`). The method `previousElementSibling`  also exists.

## Modify attributes and classes

