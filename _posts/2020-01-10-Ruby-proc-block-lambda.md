---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

## Block
A block is a piece of code enclosed by `{ some code }` or `do some code  end` passed or executed by a method. A method can accept only one block, but the block can be called several times.
Blocks don't run by themselves unless   you use the method `.call` as `{ some code }.call`.

A block can be saved in a variable as `my_block = { some code }`.

We have two ways to use a block within a method:

- append an inline  block code when calling a method, and the block will be run where the `yield` keyword is declared
- add an additional argument `&my_bloc` and call `my_block.call`  within the method.



## Inline block passed to a method through `yield`
```Ruby
def show
  puts 'Hi '
  yield if block_given?
  puts "after yield"
end

show { 'from yield'}

```
which returns `'Hi', 'from yield','after yield'`.

Note: if we `yield` with no block, then we get a `no block given (yield) error`. We use `if block_given?`to prevent raising exceptions if a block is not given (the program won't stop when we use `if block_given?`   and don't pass a block: this line will simply be skipped).

### Blocks can accept arguments.

```Ruby
def show
  puts 'Hi '
  yield('John') if block_given?
  yield('again John') if block_given?
end
show { |name| "#{name} from yield"}
 ```
 returns `'Hi', 'John from yield','again John from yield', 'after yield'`.
 
  ```ruby
 def time_it(n=1)
    start_time = Time.now
    n.times  { yield(3) } 
    puts "Execution time: #{ Time.now - start_time } secs."
end

puts time_it(5) { |i| puts i  ** 2 }
```
will will measure the time to ouptut 5 times the number `3*2=6`  and returns `"Execution time: 1.8e-05 secs`
 
Note: Remember to use double quotes " " when interpolating.
 
 
### The  `yield` returns values
 
 ```ruby
 def show
  value = yield
  puts "Hi #{yield}"
end
show { 'Tom' }
 ```
 returns 'Hi Tom'.
 
 


## Inline blocks passed to a method with `&block`

The ampersand `&`converts the block to a `proc`.

Example: we pass the block `{ |i| i**2 }` 

 ```ruby
 def calc_powers(i  ,&block)
  puts block.call(i) if block_given?
  puts block.call(i*2) if block_given?
  puts block.call(i*3) if block_given?
end

puts calc_powers(3) { |i|  i**2 }
```
which return 9,36,81.  

Blocks are mostly used on enumerators. For example, `['a','b','c'].each { |l| l.upcase }`.


## Named blocks as `proc`

 We can save a block as a `proc`   by `my_proc = Proc.new { |i| i**2 }`   or simply `my_proc = proc { |i| i**2 }`.
 We can then pass use this proc to a method as an argument.
 
 ```ruby
 def calc(i,a_proc )
  a_proc.call(i)
  a_proc.call(i*2)
 end
 calc(3, my_proc)
 ```
 will return 16,64.
  
 One typical example is the timer
 ```ruby
 def time_it(n=1)
    start_time = Time.now
    n.times { yield(5) } if block_given?
    puts "Execution time: #{ Time.now - start_time } secs."
end
time_it(10) { |i| puts i**2 }
 ```
  and  output 10 times 25.
 
## Example
The `map`method applies a block to each element of an enumerable object and collects the values. For example, we pass the block  `{|n| n.even?}` to teach element of an array with `map`, then Ruby let's us use `:even?` as `&:even?`is converted into a block.
```ruby
[1,2,3].map(&:even?)
```
returns `'false,true,false'`.

## lambdas
A lambda can be put into a variable, and then use `.call` to use it. Two ways to write:
- `lambda { puts 2 }.call`,
- ` -> { puts 2 }.call`

All the following examples return 20 (we need `return`   to be able to use the output).

```ruby
l =  -> { puts 20 }
puts l.call

l = lambda { |i| i }
puts  l.call(20)

l = -> { return 19 }
puts l.call + 1

l = -> (var) { var += 10 }
l.call(10)

x=5
-> { x += 15 }.call

```

