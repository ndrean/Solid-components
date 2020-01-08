---
layout: post

title: Ruby - How to render partial in an .erb layout
---

# First step:
`require 'erb'` and define the template:
```ruby
template = %(
  <!DOCTYPE html>
    <html>
      <body>
        Hello
          <%= yield %>
      </body>
    </html>
)
```
and define an object `ERB.new(template)` and use the method `.result` (of  class `String`)

```ruby
layout = ERB.new(template).result
```
Then save this into a file and render it with Google Chrome or Firefox by
```ruby
File.open("my_layout.html", "w") { |file| file.puts layout }
%x[ open -a 'Google Chrome' my_layout.html ]
```
The browser opens and renders:
<p>
    Hello <%= yield %>
<p>
  
# A step further:
Insert a partial into the yield

```ruby
require 'erb'

template = %( <!DOCTYPE html> <html> <body> <%= yield %> </body> </html> )

```
Define the partial you want to pass to `yield`:
```ruby
partial = %(
    <h1>Hello <%= name %> </h1>
    <ul>
      <% messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
    </ul>
```

Define a lambda with params `'name','messages'` and let `binding` pass them to `.result` on the object `ERB.new(partial)` and this lambda will by called by `set_partial.call(my_name, my_messages)`


```ruby
set_partial = ->(name,messages) { ERB.new(partial).result(binding) }
```
We define a method with binding to bind the bloc `set_partial.call`

```ruby
def set_binding
  binding
end
```

Then:

```ruby
obj = ERB.new(template)

name = "ERB from yield"
messages = [ "Ligne 1", "Ligne 2" ]

view = obj.result( set_binding { set_partial.call( name, messages ) } )

```

and save this in a file and render it with Google Chrome

```ruby
File.open("my_app.html", "w") { |file| file.puts view }
%x[ open -a 'Google Chrome' my_app.html ]
```

so that the browser opens and renders:
    
<h1> Hello ERB from yield </h1>
<ul>
  <li> Ligne 1 </li>
  <li> Ligne 2 </li>
</ul>
