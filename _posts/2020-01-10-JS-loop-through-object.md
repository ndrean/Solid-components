---
layout: post
title: Javascript - Loop through object with  for   of
---

We don't use `for  in` as this loop through all the properties  of an object (with `hasOwnProperty`. Instead, we use the `keys`of an object (obtained as an array with `Object.keys(myObject)` and iterate with `for of` on this array `keys`. We also have `Object.entries(myObject)`  which destructurates the object and returns an array of array.


```javascript
const obj = { a: 1, b: 2, c: 3,  d: 4 }
```
## To access to a particular element of an objet:
we have `obj.a` or equivalently `obj['a']`that returns the value `1`.

## To get all the keys:
`console.log(Object.keys(obj))` that returns the array of keys `[ 'a', 'b', 'c', 'd' ]`

## to get all the values:
`console.log(Object.values(obj))` that returns the array of values `[ 1, 2, 3, 4 ]`

## to get an array `[key,value]`:
`console.log(Object.entries(obj))` returns the destructared array of arrays `[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ], [ 'd', 4 ] ]`.

## Example:
```javascript
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