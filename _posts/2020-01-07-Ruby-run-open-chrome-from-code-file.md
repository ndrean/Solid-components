---
layout: post
title: How to render a file into a browser from the console
---

To open `example.html` from the console, type `open -a 'Firefox' example.html`

Within a Ruby file, to render a file into a browser, first save some result as `a_string` into a file `a_string.html`, then render this file with `%x()`:

```ruby
File.open("a_string.html", "w") { |file| file.puts html_string}
%x( open -a 'Firefox' example.html )
```

#Example
Say my Ruby code file is `test.rb` where:
```ruby
a_string = %( <h1>Hello </h1> )

File.open("a_file.html", "w") { |file| file.puts a_string}

%x[ open -a 'Firefox' a_file.html ]
```
then running `ruby test.rb` will open the browser and display:
<h1> Hello </h1>
