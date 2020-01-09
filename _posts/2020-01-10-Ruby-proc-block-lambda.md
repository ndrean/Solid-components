---
layout: post
title: Ruby, Examples with proc, lambda, block, yield
---

## blocks
A block is a peice of code enclosed by `{ something }` or `do something  end` passed or executed by a method. These blocks cannot be assigned to variables. A method can accept only one block. Blocks can accept arguments.
```ruby
def show
  puts 'Hi '
  yield
end

puts show { 'from yield'}

def show
  puts 'Hi '
  yield('John')
end
puts show { |name| "#{name} from yield"}
 ```
 which returns 'Hi from yield' and 'Hi John from yield'.
 ! Remember to use double quotes "" when interpolating.
 
 We can pass a block to a method, while we have to declare this with the `&`, and can  use it several times.
 ```ruby
 def show(i  ,&a_proc)
  puts a_proc.call(i)
  puts a_proc.call(i*2)
  puts a_proc.call(i*3)
end

puts show(3) { |i|  i**2 }
```
which return 9,36,81.  

 We can save a block as a `proc`   by `my_proc = Proc.new { |i| i**2 }`   or simply `my_proc = proc { |i| i**2 }`.
 We can then pass use this proc to a method
 ```ruby
 def calc( i,a_proc )
  a_proc.call(i)
  a_proc.call(i*2)
 end
 calc(3) , my_proc)
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
 will measure the time to calculate and  output 10 times 25.
 
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
