---
layout: post
title: scopes in JS & Ruby
---


```javascript
var adder = function (x) {
    return function (y) {
        return x + y;
    };
};
add5 = adder(5);
add5(1) == 6
```

```js
const adder = x => y => x + y;
add5 = adder(5);
add5(1) == 6
```



```ruby
def adder(x)
  lambda { |y| x + y }
end
add5 = adder(5)
add5[1] == 6

```ruby
def adder(x)
  -> y { x + y }
end
```
