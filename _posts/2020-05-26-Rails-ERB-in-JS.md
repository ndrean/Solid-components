---
layout: post
title: Rails - Add ERB support in JS files and import JS methods in .js.erb
---


<https://github.com/rails/webpacker/blob/master/docs/integrations.md#erb>

To add Erb support in your JS templates, run:

```bash
bundle exec rails webpacker:install:erb
```

on a Rails app already setup with Webpacker.

With this setting, we then can create a *.js.erb* file in the folder */javascript/packs/*. Then we can use ERB (Ruby parses the file first) and import external libraries with `import { myFunction } from '../components/myJsFile.js`. 

In other words, we can import *.js* libraries into *.js.erb* files.

> This can save on _data-attributes_: the `<div data-something="<%= Post.first.id%>">` in the HTML file with it's searching `document.qureySelector('[data-something]')`in a *.js* file can be replaced simply by eg `const id = <%= Post.first.id%>` in the _.js.erb_ file)


> Note 1: A 'standard' view rendering file *.js.erb* located in the views does <strong>not</strong> have access to `import`, only those located in the folder */javascript/packs/* do (after running `webpacker:install:erb`).
 
> Note 2: To use a JS library inside a view *.html.erb* we need to:

- import the library in a *someFile.js.erb* file in the folder */javascript/packs/*

 - import the *someFile.js.erb* file in the view with `<t%= javascript_pack_tag 'someFile' %>`


 > Note 3: we need to have Turbolinks loaded to access to the DOM, so all the code in the *someFile.js.erb* file is wrapped as a callback: `document.addEventListener("turbolinks:load", myFunction})`, and declare `const myFunction = ()=> {[...]}` after.
