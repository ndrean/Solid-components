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
To display a file into the browser from a Ruby file, you can use `%x()` or backticks or `system("")`:

```ruby
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
