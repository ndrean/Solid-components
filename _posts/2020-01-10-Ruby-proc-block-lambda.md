---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

## Block
A block is a piece of code enclosed by curly braces `{ some code }` or enclosed by `do ...end`  when you have multiline. Blocks are passed and executed by a method. 

The following well known code is a block passed to the method `.each`applied to the enumerable object array:
```ruby
[1,2,3].each { |n| puts n if n.even?}
```
will return 1,2,3. The bloc `{ |n| puts n }`  has `|n|` as argument and `puts n` as body. 

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
returns respectively `a,1,b,4` and `1,4,3,16`.

### How to use a block
Blocks can't be saved into a variable unless we declare the block as a `proc` object (see bellow). Thus blocks don't run by themselves. They have to be used within a method.

A method can accept only one block, but the block can be called several times.

We have two ways to use a block within a method:
- keyword `yield`. You append an inline  block code at the end of a method when calling the method: the block will be run within the method where the `yield` keyword is declared
- ampersand `&`. You pass an additional argument `&my_bloc` to a method, call `my_block.call`  within the method and declare an inline block when calling the method. The work of `&`is to convert a block to a `proc` object (see bellow).


```Ruby
def show_bloc
  puts 'before yield '
  yield
  puts "after yield"
end

show_block { puts 'from the yield' }
```
returns `'before yield', 'from the yield','after yield'`.

```Ruby
def show_bloc(&my_block)
  my_block.call
end
show_bloc { puts "Hello" }
```
returns 'Hello'.

The `map`method applies a block to each element of an enumerable object and collects the values. For example, we pass the block  `{|n| n.even?}` to each element of an array with `map`. Since Ruby let's us use `:even?` instead, then we can write:
```ruby
[1,2,3].map(&:even?)
```
returns `'false,true,false'`.


### Methods accept a unique block, but can use it multiple times.
A method can accept only ONE inline block, but the block can be called several times.
```Ruby
def show_multiple_blocs(n, &block)
  puts n
  block.call 
  yield
  yield
end
show_multiple_blocs(3) { puts "there" }
```
returns '3,there, there, there'.

### `if block_given?`
If a  method  uses `yield`  or `.call`   with no block given, this raises an exception. You have to use use `if block_given?` to prevent this. The program won't stop when we use `if block_given?` and this line will simply be skipped.
```Ruby
def show_if_bloc(word, &block)
  puts word
  block.call if block_given?
  yield if block_given?
  puts "ok"
end
show_bloc("Hi")
show_if_bloc("Hi) { puts "there" }
```
will return respectively 'Hi, ok' and 'Hi, there, there, ok'.


### Blocks can accept arguments.
Note: Remember to use double quotes " " when interpolating.
You can pass an argument to a block, and the argument is declared within pipes `|` within the code block.
```Ruby
def show
  puts 'Hi '
  yield('John') if block_given?
end
show { |name| puts "#{name} from yield"}
 ```
 returns `'Hi', 'John from yield'.
 
  ```ruby
 def time(m=1, x=0, n=1)
    start_time = Time.now
    m.times { yield(x,n) }
    puts "Execution time: #{ Time.now - start_time } secs."
end
puts time(5,2,10) { |x,i| puts x  ** i }
```
will measure the time to ouptut 5 times the number `2**10=1024`  and returns `"Execution time: 2e-05 secs`

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




## Class `Proc`
A block of code can be saved into a variable by defining this block as a new instance of the class `Proc`. A `proc` can be called with the method `.call`. To do so, we use `my_proc = Proc.new { my code }` or simply `my_proc = proc {my code }`.
In other words, a `proc`is a block container that can be used by calling it with `.call`, or used by a method.


Note: `{ puts "hi" }.call` raises an error whilst `Proc.new { puts "hi" }.call` returns 'hi'.

We can save a proc into a variable `my_proc = proc { puts "hi" }`.

To use `my_proc`, we have the two same ways as previously seen:
- declare a bloc as an argument to the method, and call it inside the method to execute it. There is no need of the `&` here since we already created a `proc` object, and the ampersand work it precisely to convert a block to a `proc`.
```ruby
hi = Proc.new { puts "hi" }

def say_hi(bloc)
    bloc.call
end
say_hi(hi)
```
returns 'hi'.

- pass the named block to a method, and yield it.
```ruby
hi = Proc.new { puts "hi" }

def say_hi
    yield
end
say_hi {hi.call}
```
returns 'hi'.

### Example
```ruby
my_proc = proc {  'Bonjour' }
my_lambda = ->{ 'Hola' }
hello = proc { puts "hello" }

def say_hi(*blocs, name)
  yield(name) if block_given?
  blocs.each {|bloc| puts bloc.call + ' there'}
  yield if block_given?
end

say_hi(my_proc, my_lambda,'John') {  |name|  puts "hello #{name}" }
```
returns 'hello John, Bonjour there, Hola there, hello'.

### lambdas
A special kind of `proc` is `lambda` and is declared using `-> { my code }` (or `lambda { my code }`).
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


##  Class `Proc`
A lambda is a special case of the class `Proc`. A `proc` object is a block of code than can be called by the method `.call`. It is declared by `Proc.new { my code }`  or simply `proc do my code end`. The ampserand `&`does the conversion block->proc inline.

```Ruby
def powered_to(n)
  proc { |x| x**n }
end
puts powered(3).call(2)
```
returns `2**3 = 8`.


## Scope

```ruby
def call_proc(my_proc)
  n = 50
  puts my_proc.call
end

n   = 1
my_proc = Proc.new { puts n + 1 }
my_proc.call
```
We would expect '50' but it returns '1', thus the proc carries with it values like local variables and methods from the context where it was defined.
