---
layout: post
title: Javascript, how to modifiy the DOM
---


## Create new Nodes

Property/Method  |	Description
-----------------|---------------
createElement() |	Create a new element node
createTextNode() |	Create a new text node
node.textContent | 	Get or set the text content of an element node
node.innerHTML |	Get or set the HTML content of an element

### `elt.textContent` and `elt.appendChild(document.createTextNode())` and `innerHTML`.

The property `textContent` renders the full content of `Node` objects and the property `innerHTML returns the visible content
of HTML elements. For example, if we create a paragraph `p = document.createElement('p')`, then `p.innerHTML = '<ul><li> Un point </li></ul>'`
will render a 'normal' bullet point' whilst `p.textContent`  will render plain text, namely '<ul><li> Un point </li></ul>'.

If we add some raw text inside an element, then `textContent`is prefered to `innerHTML` to avoid XSS.

The method `createTextNode()` with `appendChild`  wills also render plain text. However, setting the property `myParagraph.textContent = "some text"`
will erase everything, whilst `myParagraph.appendChild(document.createTextNode(" continues"))` will append 'continue' to the existing text. 
To insert text, one can use the property `textContent` or `innerHTML` or the method `createTextNode` . 


```javascript
const par = document.CreateElement('p')
const text = par.textContent
// or equivalently
  const text = document.createTextNode('My first paragraph')
  par.appendChild(text)
document.body.appendChild(par)

```

## Insert Nodes in the DOM

Property/Method |	Description
----------------|--------------
node.appendChild() |	Add a node as the last child of a parent element
node.insertBefore() |	Insert a node into the parent element before a specified sibling node
node.replaceChild() |	Replace an existing node with a new node


Method |	Description
-------|-----------
node.removeChild() | 	Remove child node
node.remove() |	Remove node
