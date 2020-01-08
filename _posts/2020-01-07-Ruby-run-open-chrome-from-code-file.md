---
layout: post
title: Ruby - How to run a shell command  from a Ruby  file
---

```ruby
%x[ open -a 'Google Chrome' example.html ]
%x[ open -a 'Firefox' example.html ]
```

#Example
Say my Ruby code file is `test_erb.rb` where:
```ruby
require "erb"

string_layout = %(
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <h1>Hello <%= name %></h1>
      <ul>
        <% messages.each do |message| %>
          <li><%= message %></li>
        <% end %>
      </ul>
    </body>
  </html>)

name = "ERB"
messages = [ "Ligne 1", "Ligne 2" ]

obj = ERB.new(string_layout)

html_string=obj.result(binding)

File.open("layout.html", "w") { |file| file.puts html_string}
%x[ open -a 'Firefox' layout.html ]
```
