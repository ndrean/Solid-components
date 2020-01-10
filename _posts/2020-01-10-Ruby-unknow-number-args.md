---
layout: post
title: Ruby, unknow number of args in method
---
## Use the `*my_args` with `reduce`

The method `reduce` combines all elements of enum by applying a binary operation, specified by a block or a symbol that names a method or operator.

```ruby
def sum(*args)
  args.reduce { |sum, n| sum + n }
end
```
so `sum(1,2,3)` returns `6`. 

We could also have used `(1..3).reduce(&:+)`  in this case.
