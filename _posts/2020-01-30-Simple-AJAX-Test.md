---
layout: post
title: AJAX injection with XMLHttpRequest with simple Ruby web server
---


In a directory, we run the script `ruby -run -e http . -p 8000` in the terminal so that we have a `web server` at `localhost:8000`.

> Note: we can also run the file bellow `ruby my-web-server.rb`.

```ruby
#my-web-server.rb
require "webrick"
WEBrick::HTTPServer.new( Port: 8000, DocumentRoot: Dir::pwd ).start
 server = WEBrick::HTTPServer.new Port: 8000
 trap 'INT'  do server.shutdown end
 server.start
```

In this directory, we have 2 files:

- `file.txt` that contains (for example) the line `<h1> Here we go!...</h1>`. Check again in the terminal the command `curl http://localhost:8000/filex.txt` so that it is ok.

- a file named `index.html` (it will be directly displayed by the browser when get `http://localhost:8000`).

In this file, we have 2 parts. First the `<div id="target"> </div>` which `innerText` will be changed by a Javascript script bellow when the button with `#actionBtn` is clicked. We create an object `XMLHttpRequest` that will get from the web server the data contained into the file `file.txt`  and upon reception will set this data into the DOM at the location `#target`.


      <!DOCTYPE html>
      <html>
      <body>
          <div>
              <p>Start a web server with 'ruby -run -e httpd . -p 8000' in this directory</p>
              <br>
              <p>Check if the file 'file.txt' is located in the same directory</p>
          </div>
          <div id="target"> 
              <p>Click bellow to inject the file content here.....</p>
          </div>

          <br>

          <button id="actionBtn"> Change !</button>

          <script>
              const btn = document.getElementById('actionBtn')

              btn.addEventListener('click', (e) => {
                  const myUrl = 'http://localhost:8000/file.txt'
                  const xhr = new XMLHttpRequest();
                  xhr.open("GET", myUrl, asyn = true);
                  xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                          const target = document.getElementById('target');
                          target.innerHTML = xhr.responseText;
                              }
                    };
                    xhr.send();  
                });
            </script>
        </body>
        </html>

or slightly shorter with `document.getElementById('actionBtn').onclick = function () {...}`.
