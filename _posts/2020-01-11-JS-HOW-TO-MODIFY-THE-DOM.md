---
layout: post
title: Javascript, how to modifiy the DOM
---

## CSS selectors

- `document.getElementById('my_id')`
- `document.querySelector('.a_class')`
- `document.querySelector('#an_id')`
- `document.querySelectorAll('.a_class')`.

We have advanced selectors:
- `p#an_id`   (paragraph with `id = an_id`)
- `p > .an_id` (for any child of a paragraph whose `id`  is 'an_id') .... 
- TODO


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

## Insert Nodes in the DOM

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
