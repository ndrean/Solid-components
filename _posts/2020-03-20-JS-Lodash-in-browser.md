---
layout: post
title: Using Lodash in browser
---

```javacsript
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.core.js';
document.querySelector('head')[0].appendChild(script);

# Use _.VERSION or any other function to verify that it worked
```
