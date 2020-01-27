---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

https://www.sihui.io/procs-in-ruby-p3/

## Blocks and procs

A block is a piece of code enclosed by curly braces `{ some code  }` or enclosed by `do ...end`  when you have multiline. Blocks can have arguments defined between pipes `|arg1, arg2|`. 

Blocks can't run by themselves unless we make a `Proc` object of them and use the method `.call`.

> Turn a block into a `Proc` bject by:
- `Proc.new { my code }` or simply
- `proc {my code }`
We can save a proc object into a variable `my_proc = proc { my code }`.

`Proc` objects are closures, meaning they remember and can use the entire context in which they were created.

Running   `{ puts "hi" }.call` raises an error, but  `proc { puts "hi" }.call` returns 'hi'.



### How to use a block: `yield` and `&`

We have two ways to use a block within a method:

- keyword  `yield`. You append an inline  block code at the end of a method when calling the method: the block will be run within the method where the `yield` keyword is declared

```ruby
def show_bloc
  puts 'before yield '
  yield
  puts "after yield"
end

irb> show_block do
        puts 'from the yield'
     end

before yield
from the yield
after yield
```

- ampersand `&`. The `&` method toggles a block to a `Proc`object. The `&` can be used in the definition of the method or during the when calling the method. Doing `&my_proc` is equivalent converting a block to a `Proc`.  

For example, consider the 2 methods:

```ruby
hello=proc { puts 'hello' }

def greet_b &my_block
  my_block.call
end
```

and

```ruby
def greet_y
  yield
end
```

Then all of the following   run `greet_b { puts "Hello" }`  and  `greet_b &hello`   and `greet_y { puts 'hi' }`   and `greet_y &hello` and `greet_y &hello` will return 'hi'. One confusion here is that we can use `yield`as well.

The method `greet_y`  expects a block, so wether  we pass one directly  or  converts a `Proc` into a block     with the `&`   method. Then the method `greet_y`  internaly yields the block.
Conversely, the `greet_b` method converts any arguments since we have the `&` in the definition. 


The last method bellow accepts only a `Proc` object:

```ruby
def greet(bloc)
  bloc.call
  #yield
end
```

so we can only write `greet hello`.


### Using `Method` to pass another method as a block
We define

```ruby
def hi
  puts 'hi'
end
```

The `Method` method looks up the specified method name in the current context and returns a `Method` object that represents it. Then:

```ruby
> puts method(:hi)

#<Method: main.hi
```

so that we can write `greet method(:hi)` or `greet_b &method(:hi)`

### Examples
The `map` method applies a block to each element of an enumerable object and collects the values. For example, we pass the block  `{ |n| n.even? }` to each element of an array with `map`. Since Ruby let's us use `:even?` instead, then we can write 
` [1,2,3].map(&:even?) ` whichs returns `'false,true,false'`.
As an example, we define a `proc` that returns `true`if a number is a multiple of 3. The method `select`returns the elements of an enumerable when the block returns `true`. We can't therefor select only multiples of 3 within a range by this method. We can't pass  the `proc`as such methods don't accept arguments; we thus pass the block, so we have to use `&multiple`.

```ruby
irb> multiples_of_3 = Proc.new { |n| n % 3 == 0 } 
irb> (1..10).to_a.select(&multiples_of_3)

[3,6,9]
```



### Methods accept a unique block, but can use it multiple times.
A method can accept only ONE inline block, but the block can be called several times.
```ruby
def show_multiple_blocs(&block)
  block.call 
  yield
  yield
end

irb> show_multiple_blocs { puts "there" }

there
there
there
```


### `if block_given?`
If a  method  uses `yield`  or `.call`   with no block given, this raises an exception. You have to use use `if block_given?` to prevent this. The program won't stop when we use `if block_given?` and this line will simply be skipped.

```ruby
def show_if_bloc(word, &block)
  puts word
  block.call if block_given?
  yield if block_given?
  puts "ok"
end

irb> show_bloc("Hi")

Hi, ok

irb> show_if_bloc("Hi) { puts "there" }

Hi, there, there, ok
```

### `yield`  accepts arguments when declared in the bloc

You can pass an argument to a block, and the argument is declared within pipes `| |` within the code block. 
```ruby
def show
  puts 'Hi '
  yield('John') if block_given?
  yield
end

irb> show do
      |name| puts "#{name} from yield"
    end

Hi
John from yield
from yield

```
Note: Remember to use double quotes " " when interpolating.


### Example: time it

 
 We can use `yield`  as a timer   of the execution of a method:
  ```ruby
 def time(m=1, x=0, n=1)
    start_time = Time.now
    m.times { yield(x,n) }
    puts "Execution time: #{ Time.now - start_time } secs."
end

irb> time(5,2,10) { |x,i| puts x  ** i }

1024
1024
1024
Execution time: 2e-05 secs
```
will measure the time to ouptut 5 times the number `2**10=1024`.

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

irb> say_hi(my_proc, my_lambda,'John') {  |name|  puts "hello #{name}" }
```

returns 'hello John, Bonjour there, Hola there, hello'.



### lambdas
A special kind of `proc` is `lambda` and is declared using `-> { my code }` (or `lambda { my code }`).
Lambdas can be save in variables, accept arguments. In this case, an error is thrown if the arguments are missing, like a regular method.

All of the following examples return 20:

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


A lambda throws an error is  a wrong number of arguments is given, but not a `proc`.
If you return from a `proc`, then the method will stop, whilst a lambda will continue. A lambda gives back the hand to the method if the lambda returns whilst not the  proc.

```ruby
def call_proc
  puts Proc.new { return 1 }.call
  puts "after proc"
end

irb> puts call_proc
1

def call_proc
  puts -> { return 2 }.call
  puts "after proc"
end

irb> puts call_proc
2
after proc
```

returns respectively '1' and '2, after proc'.

## Scope of variables

```ruby
def call_proc(my_proc)
  n = 50
  puts my_proc.call
end

irb> n   = 1
irb> my_proc = Proc.new { puts n + 1 }
irb> my_proc.call
```

We would expect '50' but it returns '1', thus the `proc` carries with it values like local variables and methods from the context where it was defined.
