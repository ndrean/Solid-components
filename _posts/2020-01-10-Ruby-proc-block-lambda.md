---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

## lambdas
A lambda can be put into a variable, and then use `.call`to use it. Two ways to write:
- `lambda { puts 2 }.call`,
- ` -> { puts 2 }.call`
All the following examples return 20 (we need `return`   to be able to use the output).

```ruby
l =  -> { puts 20 }
puts l.call

l = lambda { |i|   puts i }
puts  l.call(20)

l = -> { return 19 }
puts l.call + 1
```
The outputreturns

l= lambda { |i| puts i }
puts l.call(30)
```