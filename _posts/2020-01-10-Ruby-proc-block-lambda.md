---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

## two ways to write lambdas
```ruby
l =  -> { return 20}
puts l.call

l= lambda { |i| puts i }
puts l.call(30)
```
