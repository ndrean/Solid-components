---
layout: post
title: Ruby - How to save a string  into  file
---
If I want to save the string `a_string` into a file named `a_file.html`, then:

```ruby
File.open("a_file.txt", "w") { |file| file << a_string}
```
