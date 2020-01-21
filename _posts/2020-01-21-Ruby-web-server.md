---
layout: post
title: Create simple web server with Ruby Webrick
---



## To serve a local directory at `http://localhost:8000` with a web server from the terminal:


  ruby -run -ehttpd . --port=8000


## Launch a local directory web server from a Ruby file visible at `http://localhost:5000`

```ruby
require "webrick"
WEBrick::HTTPServer.new(Port: 5000, DocumentRoot: Dir::pwd).start
```

### Serve named files from a Ruby file:

If we just want to give access to some files, at `http://localhost:8000/file1`  or `/file2`, then:

```ruby
require 'webrick'
server = WEBrick::HTTPServer.new Port: 8000
trap 'INT'  do server.shutdown end

server.mount_proc "/file1" do |req, res|
   res.body = html_string_1
end

server.mount_proc "/file2" do |req, res|
   res.body = html_string_2
end

server.start
```



    html_string_1 = %w(
    <!DOCTYPE html>
        <html>
          <body>
              Hello 1
          </body>
        </html>
    )


### With Sinatra (`http://localhost:4567/file`

```ruby
require 'sinatra'
get '/file1' do
  html_string_fil1
end
```
