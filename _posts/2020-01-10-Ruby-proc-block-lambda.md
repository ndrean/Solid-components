---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

## Block
A block is a piece of code enclosed by curly braces `{ some code }` or enclosed by `do ...end`  when you have multiline. Blocks passed or executed by a method. 

The bloc `{ |n| puts n }`  has `|n|` as argument and `puts n` as body. The following code
```ruby
[1,2,3].each { |n| puts n }
```
will return 1,2,3.

Blocks can have multiple arguments defined between pipes `|arg1, arg2|`.
```Ruby
{a:1, b:2}.each do |k,v|
  puts k
  puts v**2
end

[[1,2],[3,4]].each   do |a,b|
  puts a
  puts b**2
end

```
returns `a,1,b,4` and `1,4,3,16`.

### how to use a block
Blocks can't be saved into a variable unless we declare the block as a `proc` object (see bellow). Thus blocks don't run by themselves. They have to be used within a method.

A method can accept only one block, but the block can be called several times.

We have two ways to use a block within a method:
- keyword `yield`. You append an inline  block code at the end of a method when calling the method: the block will be run within the method where the `yield` keyword is declared
- ampersand `&`. You add an additional argument `&my_bloc` to a method and call `my_block.call`  within the method.


```Ruby
def show_bloc
  puts 'Hi '
  yield
  puts "after yield"
end

show { puts 'from yield' }
```
returns `'Hi', 'from yield','after yield'`.

```Ruby
def show_bloc(&block)
  block.call
  puts "there"
end
show_bloc { puts "Hello" }
```
returns 'Hello, there'.

### Methods accept a unique block, and can them multiple times.
A method can accept only one block, but the block can be called several times.
```Ruby
def show_if_bloc(n, &block)
  puts n
  block.call 
  yield
  yield
end
show_if_bloc(3) { puts "there" }
```
returns '3,there, there, there'.

### `if block_given?`
If a  method  uses `yield`  or `.call`   with no block given, this raises an exception. You have to use use `if block_given?` to prevent this. The program won't stop when we use `if block_given?` and this line will simply be skipped.
```Ruby
def show_if_bloc(word, &block)
  puts word
  block.call if block_given?
  yield if block_given?
  yield if block_given?
  puts "ok"
end
show_bloc("Hi")
show_if_bloc("Hi) { puts "there" }
```
will return respectively 'Hi, ok' and 'Hi, there, there, ok'.

Note:  methods accept only ONE block.

### Blocks can accept arguments.
Note: Remember to use double quotes " " when interpolating.
You can pass an argument to a block, and the argument is declared within pipes `|` within the code block.
```Ruby
def show
  puts 'Hi '
  yield('John') if block_given?
  yield('John again') if block_given?
end
show { |name| puts "#{name} from yield"}
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
 
### The  `yield` returns values
The block will return the last line.
 ```ruby
def show
  puts "Hi #{yield}"
end

show do |n|
  'Tom'
  'Jim'
end
 ```
 returns 'Hi Jim'.


## Inline blocks passed to a method with `&block`

The ampersand `&`converts the block to a `proc`.

Example: we pass the block `{ |i| i**2 }` 

 ```ruby
 def calc_powers(i  ,&block)
  puts block.call(i) if block_given?
  puts block.call(i*2) if block_given?
  puts block.call(i*3) if block_given?
end
calc_powers(3) { |i|  i**2 }
```
which return 9,36,81.  

Blocks are mostly used on enumerators. For example, `['a','b','c'].each { |l| l.upcase }`.






## Class `Proc`
A block of code can be saved into a variable by defining this block as a new instance of the class `Proc`. A `proc` can be called with the method `.call`. To do so, we use `my_proc = Proc.new { my code }` or simply `my_proc = proc {my code }`.

Note: `{ puts "hi" }.call` raises an error whilst `Proc new { puts "hi" }.call` returns 'hi'.

A special kind of `proc` is `lambda` and is declared using `-> { my code }` (or `lambda { my code }`).

### lambdas
Lambads can be save in variables, accept arguments. In this case, an error is thrown if the arguments are missing, like a regular method. We need `return` to be able to use the output.

All of the following examples return 20 
```ruby
l =  -> { puts 20 }
l.call

l = lambda { |i| puts i }
l.call(20)

l = -> { return 19 }
puts l.call + 1

l = -> (var) { var += 10 }
puts l.call(10)

x=5
puts -> { x += 15 }.call
```

```Ruby
square = -> (x) { x**2 }
square(3)
```
returns 9.



###  Class `Proc`
A lambda is a special case of the class `Proc`. A `proc` object is a block of code than can be called by the method `.call`. It is declared by `Proc.new { my code }`  or simply `proc do my code end`.


We can save a proc into a varaible. 

### pass a `proc`to a method
```ruby
hi = Proc.new { puts "hi" }

def say_hi(bloc)
    bloc.call
end

say_hi(hi)
```
returns 'hi'.

```Ruby
def power(n)
  proc { |x| x**n }
end
puts power(3).call(2)
```
returns `2**3 = 8`.

puts power(3).call(2)

 
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
