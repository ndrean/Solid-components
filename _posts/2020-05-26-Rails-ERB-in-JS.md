---
layout: post
title: Rails - Add ERB support in JS files
---


<https://github.com/rails/webpacker/blob/master/docs/integrations.md#erb>

To add Erb support in your JS templates, run:

```bash
bundle exec rails webpacker:install:erb
```

on a Rails app already setup with Webpacker.

With this setting, we can import *.js* libraries into *.js.erb* files.

<p>To add Erb support in your JS templates, run <code>bundle exec rails webpacker:install:erb</code> 
on a Rails app already setup with Webpacker. We then can create a <em>.js.erb</em> file in the
folder <em>/javascript/packs</em>. Then we can use <em>ERB</em> (Ruby parses it first) and
external libraries with <code>import { myFunction } from '../components/myJsFile.js</code>. 
</p>
> Note 1: A 'standard' view rendering file *.js.erb* located in the views does <strong>not</strong>
have access to `import`, only those located in the folder */javascript/packs/* do
 (after running `webpacker:install:erb`).
 
> Note 2: To use a JS library inside a view *.html.erb<* we need to:
- import the library in a *someFile.js.erb* file in */javascript/packs*
 - import the *someFile.js.erb* file in the view with `<t%= javascript_pack_tag 'someFile' %>`


 >Note 3: we need to have Turbolinks loaded to access to the DOM, so all the code in the 
*someFile.js.erb*file is a callback: `document.addEventListener("turbolinks:load", myFunction})`
and declare `const myFunction = ()=> {[...]}` after.
