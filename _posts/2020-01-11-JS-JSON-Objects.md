---
layout: post
title: Javascript, JSON and Objects
---


## Object

Javascript objects can allow many types of data, even functions.

https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript


```javascript
const user = {
    firstName: "James",
    lastName : "Brown",
    alive    : false,
    fullName : function() { return this.firstName + " " + this.lastName; }
    // or also valid
//  fullName() {return this.firstName + " " + this.lastName };
};

```

and we can do `user.lastName`  or `user.fullName()`. 

Note that arrow function does not work here since we don't have `this` with arrow functions.

 ## JSON
 
 It is a format for sharing data. Files have the extension `.json`. The format is curly braces with pairs of `"keys" : "values"` where `values`  can be a nested.
 
 JSON or an array in JSON format. 
 CSV files can be converted to JSON format.
 
 ```javascript
 const artist = {
    "firstName": "James",
    "lastName" : "Brown",
    "alive"    : false,
    "fans": [
      {
        "fbName" : "stranger",
        "link"   : "https://facebook.com/stranger"
      },
      {
        "fbName" : "unknown",
        "link"   : "https://facebook.com/unknown"
      }
    ]
};
 ```
 We can do  `console.log(artist.lastName)` or `console.log(artist['lastName'])` or `console.log(artist.fans[1].fbName)`.
 
 ## `JSON.stringify`  and `JSON.parse`
 
 | object | string |
 | -------|--------|
 | obj => | `JSON.stringify(obj)` |
 | `JSON.parse(str)` | <= str |
 
 - object -> string by the `JSON.stringify(obj)` function
 - string =>  object     with the `JSON.parse(s)` function
 
## Example in the context of HTML

Suppose we have a script that stores a string `s`. For Javascript to use object methods, we `JSON.parse`  the string.
```
<!DOCTYPE html>
<html>
<body>
  <p id="star"></p>

  <script>
    const s = '{"firsName" : "James", "lastName" : "Brown", "profession" : "singer"}';
    const obj = JSON.parse(s);
    
    document.getElementById("star").innerHTML =
      "The famous " + obj.firstName + " " + obj.lastName + "<br>" + " is a " + obj.profession;
  </script>
</body>
</html>

```
which will  display a paragraph  'James Brown is a singer'.
