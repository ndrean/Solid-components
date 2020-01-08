---
layout: post
title: Fetch API with curl and Ruby
---

## Use `curl`from console to fetch from an API
```
> curl -s https://api.github.com/users/ndrean" 
```
## Use `curl` in `Ruby` code file to fetch from an API
Run the code from inside a Ruby file with `system`or `%x("")` and output into the console:
```ruby
system(curl -s https://api.github.com/users/ndrean" )
```

or redict into a browser by sending this output into a file and rendering it.
```ruby
system(curl -s https://api.github.com/users/ndrean > data.json" )
%x("open -a 'Google Chrome"  data.json )
```

# Use class `net/http` from Ruby code file:
We can use the standard class  `uri + net/http` to get the response as a `String`:
```ruby
require 'net/http'
require 'uri'
uri = URI.parse("https://api.github.com/users/ndrean")
response = Net::HTTP.get_response(uri)
```
Then `response.body`contains the data (and `response.code` the header).

# Use gems in Ruby code file to fetch directly the `response.body` from API:
```ruby
require 'open-uri'
response = open("https://api.github.com/users/ndrean").read
```
# Parse the `string` response to a `hash` with the gem `json`:
The `response`can be viewed in the console but we need to parse it to dig into it:
```ruby
require 'json'
data = JSON.parse(response)
puts data['name']

```
gives Neven DREAN

and to visualize  nicely into the browser, parse this into a `.json` file:
```ruby
data = data.to_json
File.open('data.json', 'w') {|file| file.puts data }
%x( open -a 'Firefox' data.json)
```
