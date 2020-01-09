---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

## blocks passed through `yield`
A block is a peice of code enclosed by `{ something }` or `do something  end` passed or executed by a method. These blocks cannot be assigned to variables. A method can accept only one block. Blocks can accept arguments. We use `if block_given?`against exceptions   if a block is not given. The program won't stop in this case.
```ruby
def show
  puts 'Hi '
  yield if block_given?
end

puts show { 'from yield'}

def show
  puts 'Hi '
  yield('John') if block_given?
end
puts show { |name| "#{name} from yield"}
 ```
 which returns 'Hi from yield' and 'Hi John from yield'.
 
 ! Remember to use double quotes "" when interpolating.
 
 
 ## `n.times { yield(arg) }`
 One way to reuse the yield is described in this example:
 ```ruby
 def time_it(n=1)
    start_time = Time.now
    n.times  { yield(3) } 
    puts "Execution time: #{ Time.now - start_time } secs."
end

puts time_it(5) { |i| puts i  ** 2 }
```
will will measure the time to ouptut 5 times the number 3*2=6  and return "Execution time: 1.8e-05 secs

## `&block`
Unlike yield, we can pass a block several times to a method, and we have to declare the usage it with the `&` when the block is defined on-line with the call of the method.
 ```ruby
 def show(i  ,&block)
  puts block.call(i) if block_given?
  puts block.call(i*2) if block_given?
  puts block.call(i*3) if block_given?
end

puts show(3) { |i|  i**2 }
```
which return 9,36,81.  

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
 
## lambdas
A lambda can be put into a variable, and then use `.call`to use it. Two ways to write:
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
## proc
Two ways to write, `Proc.new { |i| i}`   or `proc { |i| i }`.
