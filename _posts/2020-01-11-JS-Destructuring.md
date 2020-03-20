---
layout: post
title: Javascript, object & array destructuring
---

> Note: we can run `serve` which will launch a Ruby web-server and touch an index.html file with `<script src=./myfile.js></script>`, and open http://localhost:8000 for live changes. 

My `myfile.js`:

## Array:
```javascript
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail, tail[1)
// 1, [2,3,4], 3
```
### Concate arrays:
```javascript
const arr1 = [1,2,3]
const arr2 = [4,5,6]
[...arr1,...arr2]
///[1,2,3,4,5,6]
```

### Default values
```javascript
const [first = window.prompt("name2?"), last] = [,  "Brown"];
alert(`firstname is ${first}`); // whatever input
alert(`lastname is ${last}`); // Brown
```
## Objects.

We can pluck the name of the object with `let name = person.name`  or:

```javascript
const person = {
  name: 'James',
  username: 'Brown'
};

const { name } = person;
console.log(name)
// 'James'
```

```javascript
let user = {};
[user.first, user.last] = "James Brown'.split(' ');
console.log(user.first);
// James
```

### Renaming keys, order unimportant
```javascript
const { username: u, name:n } = person;
console.log(u)
// 'Brown'
```

### Concate object
Ths order is important
```javascript
const employee = { name:'Jo', salaray: 20000}
const boss = {name:'Big', salaray: 100000, company:'Brown'}

alert({ ...employee, ...boss }.name); // Big
alert({ ...boss, ...employee }.name); // Jo
```


### Default values
```javacsript
const menu = { title: "Menu", height: 200, width: 100 };
const {height:h, ...rest} = menu;
alert(h); // 100
alert(rest.width);

```

## Nested destructuring
```javascript
const options = {
  size: { width: 100, height: 200 },
  items: ["Cake", "Donut"],
  extra: true
};
```
We can access directly to the nested arguments:
```javascript
const {
  size: { width, height },
  items: [item1, item2],
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

## Passing an object to a function
In this way, it will not depend upon the order of the arguments
```javascript
function showMenu({
  title = "Untitled",
  width: w = 100, // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
  alert(`${title} ${w} ${h}`); // My Menu 100 200
  alert(item1); // Item1
  alert(item2); // Item2
}

const options = {
  items: ["A1", "A2"],
  title: "My menu"
};

showMenu(options);
```
