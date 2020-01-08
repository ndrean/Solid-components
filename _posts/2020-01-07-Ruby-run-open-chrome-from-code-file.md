---
layout: post
title: How to display a file into a browser
---

## from the console:
To open `example.html` from the console, type 
```
open -a 'Firefox' example.html
```

## from a Ruby code file:
Within a Ruby file, to render a result into a browser instead of a puts, first save the result `a_string = my_result.to_s` into a file `example.html`, then render with `%x()`:

```ruby
a_string = my_result.to_s
File.open("example.html", "w") { |file| file << a_string}
%x( open -a 'Firefox' example.html )
```
or with system("")
```ruby
system("open -a 'Firefox' example.html")
```
or with backticks ``
```ruby
`open -a 'Firefox' example.html`
```

#Example
Say my Ruby code file is `test.rb` where:
```ruby
a_string = %( <h1>Hello </h1> )

File.open("example.html", "w") { |file| file << a_string}

%x( open -a 'Firefox' example.html )
```
then running `ruby test.rb` will open the browser and display:
<h1> Hello </h1>
