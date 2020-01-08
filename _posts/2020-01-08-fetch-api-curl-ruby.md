---
layout: post
title: Fetch API with curl and Ruby
---

## Use  `curl` from console to fetch from an API
```
> curl -s https://api.github.com/users/ndrean" 
```
## Use `curl` in Ruby code file to fetch from an API
Run the code from inside a Ruby file with `system("xx")`or `%x(xx)` or with backticks and output:
### into the console:
```ruby
system(curl -s https://api.github.com/users/ndrean" )
`curl -s https://api.github.com/users/ndrean`
%x("curl -s https://api.github.com/users/ndrean")
```
### or display into a brower
Redirect into a file and rendering it.
```ruby
system(curl -s https://api.github.com/users/ndrean > data.json" )
%x(open -a 'Google Chrome"  data.json )
```

## Use class `net/http` from Ruby code file with `get_response`
Use the standard class  `uri + net/http` to get the response as a `String`:
```ruby
require 'net/http'
require 'uri'
uri = URI.parse("https://api.github.com/users/ndrean")
response = Net::HTTP.get_response(uri)
```
Then `response.body`contains the data (and `response.code` the header).

## Use gem `open-uri` in Ruby code file to fetch from an API:
```ruby
require 'open-uri'
response = open("https://api.github.com/users/ndrean").read
```
## Parse the `string` response to a `hash` with the gem `json`:
The `response`can be viewed in the console but we need to parse it to dig into it:
```ruby
require 'json'
data = JSON.parse(response)
puts data['name']

```
gives Neven DREAN

## Read  `.json` file and parse it to a `hash`

```ruby
file = File.read('data.json')
data = JSON.parse(file)
data['login']
```
