---
layout: post
title: JS, rest parameter to use an unknow number of arguments
---

## Rest parameter syntax
The rest parameter syntax allows us to represent an indefinite number of arguments as an array.

```javacsript
function sum(...args) {
  return args.reduce((previous, current) => {
    return previous + current;
  });
}
```
returns   `10`  for `sum(1,2,3,4)`
