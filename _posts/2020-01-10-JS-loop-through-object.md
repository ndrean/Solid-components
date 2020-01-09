---
layout: post
title: Javascript - Loop through object with  for   of
---

We don't use `for  in` as this loop through all the properties  of an object. Instead, we use `for of` on the `keys`of an object.

```javascript
const obj = { a: 1, b: 2, c: 3,  d: 4 }

console.log(Object.keys(obj)) // [ 'a', 'b', 'c', 'd' ]
console.log(Object.values(obj)) // [ 1, 2, 3, 4 ]
console.log(Object.entries(obj)) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ], [ 'd', 4 ] ]

console.log(obj.a)


for (const key of Object.keys(obj)) {
  console.log(`${key} = ${obj[key]}`);
}


for (const [k,v] of Object.entries(obj)) {
  console.log(`${k} = ${v}`)
}


l = Object.keys(obj).length
for (i = 0; i < l; i++) {
  console.log(`${Object.keys(obj)[i]} = ${Object.values(obj)[i]}`)
}
```
