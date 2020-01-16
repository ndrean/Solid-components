---
layout: post
title: Rails React setup
---

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend

    rails new rails_react_recipe -d=postgresql -T --webpack=react --skip-coffee
    
then connect to a PosgreSQL database with:
  
    rails db:create

The database.yml file found in `config/database.yml` contains database details like database name for different development environments. Rails specifies a database name for the different development environments by appending an underscore (_) followed by the environment name to your app’s name. You can always change any environment database name to whatever you prefer.

-> React Router: handling navigation in a React application

-> Bootstrap (needs jquery, popper)

    yarn add react-router-dom bootstrap jquery popper.js

    Rails g controller Homepage index

Running this command generates the following files:
-   a `homepage_controller.rb` file for receiving all homepage-related requests. This file contains the index action you specified in the command.
- a `homepage.js` file for adding any JavaScript behavior related to the Homepage controller.
- a `homepage.scss` file for adding styles related to the Homepage controller.
- a `homepage_helper.rb` file for adding helper methods related to the Homepage controller.
- an `index.html.erb` file which is the view page for rendering anything related to the homepage.

Rails also adds a get route for your homepage updates your routes file which is located at `config/routes.rb`.
-> replace `get 'homepage/index'` with `root to: 'homepage#index'`.

-> Delete the contents of the `~/rails_react_recipe/app/views/homepage/index.html.erb file`.
By doing this, you will ensure that the contents of index.html.erb do not interfere with the React rendering of your frontend.

You will configure Rails to use React on the frontend of the application, instead of its template engine. This will allow you to take advantage of React rendering to create a more visually appealing homepage. Rails, with the help of the `Webpacker` gem, bundles all your JavaScript code into packs. These can be found in the packs directory at `app/javascript/packs`. You can link these packs in Rails views using the `javascript_pack_tag` helper, and you can link stylesheets imported into the packs using the `stylesheet_pack_tag` helper. To create an entry point to your React environment, you will add one of these packs to your application layout.

-> Rename the file:

  mv app/javascript/packs/hello_react.jsx ~app/javascript/packs/Index.jsx

Adding the JavaScript pack to your application’s header makes all your JavaScript code available and executes the code in 
your Index.jsx file on the page whenever you run the app. Along with the JavaScript pack, you also added a meta viewport tag
to control the dimensions and scaling of pages on your application.

-> Change the layout to:

```
<!DOCTYPE html>
<html>
  <head>
    <title>RailsReactRecipe</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <%= javascript_pack_tag 'Index' %>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

