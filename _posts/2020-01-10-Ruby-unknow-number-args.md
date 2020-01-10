---
layout: post
title: Ruby, unknow number of args in method
---
## Use the `*my_args` with `reduce`

The method `reduce`combines all elements of enum by applying a binary operation, specified by a block or a symbol that names a method or operator. In the example, we
```ruby
def sum(*args)
  args.reduce { |sum, n| sum + n }
end
