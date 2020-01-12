---
layout: post
title: Rails React setup
---

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend

rails new rails_react_recipe -d=postgresql -T --webpack=react --skip-coffee
rails db:create

-> React Router: handling navigation in a React application
-> Bootstrap (needs jquery, popper)

yarn add react-router-dom bootstrap jquery popper.js

rails g controller Homepage index

Running this command generates the following files:
A `homepage_controller.rb` file for receiving all homepage-related requests. This file contains the index action you specified in the command.
A `homepage.js` file for adding any JavaScript behavior related to the Homepage controller.
A `homepage.scss` file for adding styles related to the Homepage controller.
A `homepage_helper.rb` file for adding helper methods related to the Homepage controller.
An `index.html.erb` file which is the view page for rendering anything related to the homepage.

Rails also adds a get route for your homepage updates your routes file which is located at `config/routes.rb`.
-> replace `get 'homepage/index'` with `root to: 'homepage#index'`.

-> Delete the contents of the `~/rails_react_recipe/app/views/homepage/index.html.erb file`.
By doing this, you will ensure that the contents of index.html.erb do not interfere with the React rendering of your frontend.

you will configure Rails to use React on the frontend of the application, instead of its template engine. This will allow you to take advantage of React rendering to create a more visually appealing homepage.

Rails, with the help of the `Webpacker` gem, bundles all your JavaScript code into packs. 
These can be found in the packs directory at `app/javascript/packs`. 
You can link these packs in Rails views using the `javascript_pack_tag` helper, and you can link stylesheets imported into
the packs using the `stylesheet_pack_tag` helper. To create an entry point to your React environment, you will add one of these
packs to your application layout.

-> Rename the file:
`mv app/javascript/packs/hello_react.jsx ~app/javascript/packs/Index.jsx`

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

-> Create a React component for your homepage. Start by creating a components directory in the app/javascript directory:
    mkdir ~/rails_react_recipe/app/javascript/components
The components directory will house the component for the homepage, along with other React components in the application.
The homepage will contain some text and a call to action button to view all recipes.


-> Create a Home.jsx file in the components directory: 
  `nano app/javascript/components/Home.jsx`

```
import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Food Recipes</h1>
        <p className="lead">
          A curated list of recipes for the best homemade meal and delicacies.
        </p>
        <hr className="my-4" />
        <Link
          to="/recipes"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Recipes
        </Link>
      </div>
    </div>
  </div>
);
```

In this code, you imported React and also the Link component from React Router. The Link component creates a hyperlink to 
navigate from one page to another. You then created and exported a functional component containing some Markup language
for your homepage, styled with Bootstrap classes.

-> Set up now routing using React Router. Create a routes directory in the app/javascript directory:
    `mkdir app/javascript/routes`
The routes directory will contain a few routes with their corresponding components. Whenever any specified route is loaded,
it will render its corresponding component to the browser.

-> Create an Index.jsx file:
    `nano app/javascript/routes/Index.jsx`
Add the following code to it:

```
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);
```
In this Index.jsx route file, you imported a couple of modules: the React module that allows us to use React, and the 
BrowserRouter, Route, and Switch modules from React Router, which together help us navigate from one route to another.
Lastly, you imported your Home component, which will be rendered whenever a request matches the root (/) route. 
Whenever you want to add more pages to your application, all you need to do is declare a route in this file and match it
to the component you want to render for that page.
You have now successfully set up routing using React Router. For React to be aware of the available routes and use them,
the routes have to be available at the entry point to the application. To achieve this, you will render your routes in a
component that React will render in your entry file.

Create an App.jsx file in the app/javascript/components directory:
    `nano app/javascript/components/App.jsx`

Add the following code into the App.jsx file:

```
import React from "react";
import Routes from "../routes/Index";

export default props => <>{Routes}</>;
```

In the App.jsx file, you imported React and the route files you just created. You then exported a component that renders
the routes within fragments. This component will be rendered at the entry point of the aplication, thereby making the routes
available whenever the application is loaded.

It’s time to render it in your entry file. Open the entry Index.jsx file:

    `nano app/javascript/packs/Index.jsx`

-> Replace the code there with the following code:

```
import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
```
In this code snippet, you imported React, the render method from ReactDOM, Bootstrap, jQuery, Popper.js, and your App 
component. Using ReactDOM’s render method, you rendered your App component in a div element, which was appended to the body
of the page. Whenever the application is loaded, React will render the content of the App component inside the div element
on the page.

-> add some CSS styles to your homepage. Open:
`nano app/assets/stylesheets/application.css`
The following This creates the framework for a hero image, or a large web banner on the front page of your website, 
that you will add later. Additionally, this styles the button that the user will use to enter the application.

```
.bg_primary-color {
  background-color: #FFFFFF;
}
.primary-color {
  background-color: #FFFFFF;
}
.bg_secondary-color {
  background-color: #293241;
}
.secondary-color {
  color: #293241;
}
.custom-button.btn {
  background-color: #293241;
  color: #FFF;
  border: none;
}
.custom-button.btn:hover {
  color: #FFF !important;
  border: none;
}
.hero {
  width: 100vw;
  height: 50vh;
}
.hero img {
  object-fit: cover;
  object-position: top;
  height: 100%;
  width: 100%;
}
.overlay {
  height: 100%;
  width: 100%;
  opacity: 0.4;
}
```

In this step you’ll create a Recipe model and controller. The recipe model will represent the database table that will hold
information about the user’s recipes while the controller will receive and handle requests to create, read, update, or delete
recipes. When a user requests a recipe, the recipe controller receives this request and passes it to the recipe model, which
retrieves the requested data from the database. The model then returns the recipe data as a response to the controller. 
Finally, this information is displayed in the browser.

Start by creating a Recipe model by using the generate model subcommand provided by Rails and by specifying the name of the
model along with its columns and data types. Run the following command in your Terminal window to create a Recipe model:
    `rails generate model Recipe name:string ingredients:text instruction:text image:string`

The preceding command instructs Rails to create a Recipe model together with a name column of type string, an ingredients
and instruction column of type text, and an image column of type string. This tutorial has named the model Recipe, because
by convention models in Rails use a singular name while their corresponding database tables use a plural name.

Running the generate model command creates two files:
 - A recipe.rb file that holds all the model related logic.
 - A 20190407161357_create_recipes.rb file (the number at the beginning of the file may differ depending on the date when
 you run the command). This is a migration file that contains the instruction for creating the database structure.
 
 Validations to the recipe model file to ensure that only valid data is saved to the database.
 `nano app/models/recipe.rb`
 
 ```
 class Recipe < ApplicationRecord
  validates :name, presence: true
  validates :ingredients, presence: true
  validates :instruction, presence: true
end
```

Modify the file `db/migrate/20190407161357_create_recipes.rb`so that the file looks like this:

```ruby
class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :ingredients, null: false
      t.text :instruction, null: false
      t.string :image, default: 'https://raw.githubusercontent.com/do-community/react_rails_recipe/master/app/assets/images/Sammy_Meal.jpg'
      t.timestamps
    end
  end
end
```

This migration file contains a Ruby class with a change method, and a command to create a table called recipes along with the
columns and their data types. You also updated 20190407161357_create_recipes.rb with a NOT NULL constraint on the name, 
ingredients, and instruction columns by adding null: false, ensuring that these columns have a value before changing the 
database. Finally, you added a default image URL for your image column; this could be another URL if you wanted to use a 
different image.

With these changes, save and exit the file. You’re now ready to run your migration and actually create your table.
In your Terminal window, run the following command:

    `rails db:migrate`

Here you used the database migrate command, which executes the instructions in your migration file.


With your recipe model in place, create your recipes controller and add the logic for creating, reading, and deleting recipes. In your Terminal window, run the following command:

    `rails generate controller api/v1/Recipes index create show destroy -j=false -y=false --skip-template-engine --no-helper`

In this command, you created a Recipes controller in an api/v1 directory with an index, create, show, and destroy action.
The index action will handle fetching all your recipes, the create action will be responsible for creating new recipes, 
the show action will fetch a single recipe, and the destroy action will hold the logic for deleting a recipe.

You also passed some flags to make the controller more lightweight, including:

    -j=false which instructs Rails to skip generating associated JavaScript files.
    -y=false which instructs Rails to skip generating associated stylesheet files.
    --skip-template-engine, which instructs Rails to skip generating Rails view files, since React is handling your front-end needs.
    --no-helper, which instructs Rails to skip generating a helper file for your controller.

Running the command also updated your routes file with a route for each action in the Recipes controller. 
To use these routes, make changes to your `config/routes.rb file`. Open up the routes file in your text editor:

    `nano config/routes.rb`

Once it is open, update it to look like the following code, altering or adding the highlighted lines:
~/rails_react_recipe/config/routes.rb

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```

In this route file, you modified the HTTP verb of the create and destroy routes so that it can post and delete data. 
You also modified the routes for the show and destroy action by adding an :id parameter into the route. :id will hold the
identification number of the recipe you want to read or delete.

You also added a catch all route with get '/*path' that will direct any other request that doesn’t match the existing routes
to the index action of the homepage controller. This way, the routing on the frontend will handle requests that are not 
related to creating, reading, or deleting recipes.
