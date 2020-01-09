---
layout: post
title: Ruby - How to save a string  into  file
---
To save `a_string` into `a_file.txt`, pass a bloc to `File.open` to avoid to have to `.close`  it after 

```ruby
File.open("a_file.txt", "w") { |file| file << a_string}
```
Option `"w"`is used here to rewrite the file.
