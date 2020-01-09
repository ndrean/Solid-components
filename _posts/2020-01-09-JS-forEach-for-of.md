---
layout: post
title: JS, forEach vs for of
---

Suppose we want to write a Javascript function that efficiently checks whether the running sum of numbers in an array ever exceeds some maximum:

```javascript
function isSumGreaterThan(array, max) {
  let sum = 0;
  for(let x of array) {
    sum += x;
    if(sum > max) {
      return true;  // Stop searching! We have our answer.
    }
  }
  return false;
}
```

If we try to write this code with forEach(), which closely resembles Ruby’s each(), the same approach suddenly breaks:
 
```javascript   
function isSumGreaterThan(array, max) {
  let sum = 0;
  array.forEach((x) => {
    sum += x;
    if(sum > max) {
      return true;  // Oops! Doesn't work
    }
  });
  return false;
}
```

The problem is that "return true" doesn’t return from isSumGreaterThan(); it only returns from the closure we’re passing to forEach. To make that work using functional iteration in Javascript -- or in most true functional languages, for that matter! -- we have to switch from forEach to an entirely different method of Array:
```javacsript
function isSumGreaterThan(array, max) {
let sum = 0;
 return array.some((x) => {
   sum += x;
    return sum > max;
  });
}
```
