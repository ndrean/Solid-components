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
         <h3>Hello <%= name %></h3>
          <ul>
            <% messages.each do |message| %>
              <li><%= message %></li>
            <% end %>
          </ul>
      </body>
    </html>
)
```
and define an object `ERB.new(template)` and use the method `.result` (of  class `String`) with `binding`. The context will be `'name'`and `'messages'`.

```ruby
name = 'ERB'
messages = ['ligne 1', 'ligne 2']

layout = ERB.new(template).result(binding)
```
Then save this into a file and render it with Google Chrome or Firefox by
```ruby
File.open("my_layout.html", "w") { |file| file.puts layout }
%x[ open -a 'Google Chrome' my_layout.html ]
```
The browser opens and renders:
<h3> Hello ERB</h3>
<ul>
  <li> Ligne 1 </li>
  <li> Ligne 2 </li>
</ul>

  
# A step further:
Insert a partial into the yield

```ruby
require 'erb'

template = %( <!DOCTYPE html> <html> <body> <%= yield %> </body> </html> )

```

Then we define the partial you want to pass to `yield`:
```ruby
partial = %(
    <h3>Hello <%= name %> </h3>
    <ul>
      <% messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
    </ul>
```


We define a class:
```ruby
class Template

  def initialize( template:, partial: )
    @template = ERB.new(template)
    @partial = ERB.new(partial)
  end

  def set_binding
    binding
  end

  def display
    @template.result set_binding { @partial.result }
  end
end
```
We defined a lambda with params `'name','messages'` and let `binding` pass them to `.result` on the object `@template = ERB.new(partial)` and this lambda will by called by `set_partial.call(my_name, my_messages)`.

We then define two variables:
```ruby
text= "ERB from yield with class"
messages = [ "This is a line", "This  is another great line" ]
```

and finally use our methods:
```ruby
render = Template.new(template: template, partial: partial)
puts view = render.display

File.open("app.html", "w") do
   |file| file << view
end
#%x[ open -a 'Google Chrome' app.html ]
```


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
messages = [ "Ligne 3", "Ligne 4" ]

view = obj.result( set_binding { set_partial.call( name, messages ) } )

```

and save this in a file and render it with Google Chrome

```ruby
File.open("my_app.html", "w") { |file| file.puts view }
%x[ open -a 'Google Chrome' my_app.html ]
```

so that the browser opens and renders:
    
<h3> Hello ERB from yield </h3>
<ul>
  <li> Ligne 3 </li>
  <li> Ligne 4 </li>
</ul>
