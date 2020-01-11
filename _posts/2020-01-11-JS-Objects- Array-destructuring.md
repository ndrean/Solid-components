---
layout: post
title: Javascript, object & array destructuring
---

```javascript
const person = {
  name: 'James',
  username: 'Brown'
};
```

We can access to the name with `let name = person.name`  or:

```javascript
let { name, username } = person;
```
For an array:
```javascript
const [head, ...tail] = [1, 2, 3, 4];
console.log(tail);
// [2, 3, 4]````
