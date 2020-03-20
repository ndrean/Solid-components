---
layout: post
title: Javascript, object & array destructuring
---



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
const [name = window.prompt("name2?"), surname = window.prompt("surname2?")] = [
  "Julius"
];
alert(`name is ${name}`); // Toto
alert(`surname is ${surname}`); // whatever input in prompt
```
## Objects.
Same process. The order has it's importance.

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

### Default values
```javacsript
const {height, width, title} = { title: "Menu", height: 200, width: 100 };
alert(width); // 100
```

## Nested destructuring
```javascript
const options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

let {
  size: {
    width,
    height
  },
  items: [item1, item2],
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```
