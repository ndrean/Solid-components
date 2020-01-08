---
layout: post
title: Fetch API with curl and Ruby
---

To fetch info from an API from the console we can use `curl`. For example:
```
> curl -s https://api.github.com/users/ndrean" 
```

This can be run from inside a Ruby file with:
```ruby
system(curl -s https://api.github.com/users/ndrean" )
```
To capture the data with a Ruby file:
```ruby
require 'net/http'
require 'uri'

uri = URI.parse("https://api.github.com/users/ndrean")
response = Net::HTTP.get_response(uri)

```
or
```ruby
require 'open-uri'
response = open("https://api.github.com/users/ndrean").read
```
then

require 'json'
data = JSON.parse(response.body)
puts data['name']

```
gives Neven DREAN

and to visualize  nicely into the browser, parse this into a `.json` file:
```ruby
data = data.to_json
File.open('data.json', 'w') {|file| file.puts data }
%x( open -a 'Firefox' data.json)
```
