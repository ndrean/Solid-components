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

We can pluck the name of the object with `let name = person.name`  or:

```javascript
let { name } = person;
```

For an array:
```javascript
const [head, ...tail] = [1, 2, 3, 4];
head
// 1
tail
// [2, 3, 4]
tail[1]
//3
```
We can concate two arrays:
```javascript
const arr1 = [1,2,3]
const arr2 = [4,5,6]
[...arr1,...arr2]
///[1,2,3,4,5,6]
```
Same with
