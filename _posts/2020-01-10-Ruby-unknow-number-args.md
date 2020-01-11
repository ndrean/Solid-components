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
so that we can do `sum(1,2)` or `sum(1,2,3,4)` that returns respectively `3` and  `6`. 

Note: we could also have used `(1..4).reduce(&:+)`  in this case.
