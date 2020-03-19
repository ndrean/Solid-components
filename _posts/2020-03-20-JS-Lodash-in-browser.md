---
layout: post
title: Using Lodash in browser
---

```javacsript
const newScript = document.createElement('script');
newScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.core.js';
document.querySelector('head').appendChild(script);

# Use _.VERSION or any other function to verify that it worked
```
