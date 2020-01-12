---
layout: post
title: Rails React setup
---

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend

  `rails new rails_react_recipe -d=postgresql -T --webpack=react --skip-coffee`
  
  `rails db:create`

-> React Router: handling navigation in a React application
-> Bootstrap (needs jquery, popper)

    yarn add react-router-dom bootstrap jquery popper.js

  `Rails g controller Homepage index`

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

-> Create a React component for your homepage. Start by creating a components directory in the app/javascript directory:

    `mkdir ~/rails_react_recipe/app/javascript/components`
    
The components directory will house the component for the homepage, along with other React components in the application.
The homepage will contain some text and a call to action button to view all recipes.


-> Create a Home.jsx file in the components directory:

  `nano app/javascript/components/Home.jsx`

```jsx
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

In this code, you imported React and also the Link component from React Router. The Link component creates a hyperlink to navigate from one page to another. You then created and exported a functional component containing some Markup language for your homepage, styled with Bootstrap classes.

-> Set up now routing using React Router. Create a routes directory in the app/javascript directory:

    `mkdir app/javascript/routes`
    
The routes directory will contain a few routes with their corresponding components. Whenever any specified route is loaded, it will render its corresponding component to the browser.

-> Create an Index.jsx file:

    `nano app/javascript/routes/Index.jsx`
    
Add the following code to it:

```jsx
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
In this Index.jsx route file, you imported a couple of modules: the React module that allows us to use React, and the BrowserRouter, Route, and Switch modules from React Router, which together help us navigate from one route to another. Lastly, you imported your Home component, which will be rendered whenever a request matches the root (/) route. Whenever you want to add more pages to your application, all you need to do is declare a route in this file and match it to the component you want to render for that page.
You have now successfully set up routing using React Router. For React to be aware of the available routes and use them, the routes have to be available at the entry point to the application. To achieve this, you will render your routes in a component that React will render in your entry file.

Create an App.jsx file in the app/javascript/components directory:

    `nano app/javascript/components/App.jsx`

Add the following code into the App.jsx file:

```jsx
import React from "react";
import Routes from "../routes/Index";

export default props => <>{Routes}</>;
```

In the App.jsx file, you imported React and the route files you just created. You then exported a component that renders the routes within fragments. This component will be rendered at the entry point of the aplication, thereby making the routes available whenever the application is loaded.

It’s time to render it in your entry file. Open the entry Index.jsx file:

    `nano app/javascript/packs/Index.jsx`

-> Replace the code there with the following code:

```javascript
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
In this code snippet, you imported React, the render method from ReactDOM, Bootstrap, jQuery, Popper.js, and your App component. Using ReactDOM’s render method, you rendered your App component in a div element, which was appended to the body of the page. Whenever the application is loaded, React will render the content of the App component inside the div element on the page.

-> add some CSS styles to your homepage. Open:

  `nano app/assets/stylesheets/application.css`
  
The following This creates the framework for a hero image, or a large web banner on the front page of your website, that you will add later. Additionally, this styles the button that the user will use to enter the application.

```css
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

In this step you’ll create a Recipe model and controller. The recipe model will represent the database table that will hold information about the user’s recipes while the controller will receive and handle requests to create, read, update, or delete recipes. When a user requests a recipe, the recipe controller receives this request and passes it to the recipe model, which retrieves the requested data from the database. The model then returns the recipe data as a response to the controller. Finally, this information is displayed in the browser.

Start by creating a Recipe model by using the generate model subcommand provided by Rails and by specifying the name of the model along with its columns and data types. Run the following command in your Terminal window to create a Recipe model:

    `rails generate model Recipe name:string ingredients:text instruction:text image:string`

The preceding command instructs Rails to create a Recipe model together with a name column of type string, an ingredients and instruction column of type text, and an image column of type string. This tutorial has named the model Recipe, because by convention models in Rails use a singular name while their corresponding database tables use a plural name.

Running the generate model command creates two files:
 - A recipe.rb file that holds all the model related logic.
 - A 20190407161357_create_recipes.rb file (the number at the beginning of the file may differ depending on the date when
 you run the command). This is a migration file that contains the instruction for creating the database structure.
 
 Validations to the recipe model file to ensure that only valid data is saved to the database.
 
 `nano app/models/recipe.rb`
 
 ```ruby
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

This migration file contains a Ruby class with a change method, and a command to create a table called recipes along with the columns and their data types. You also updated 20190407161357_create_recipes.rb with a NOT NULL constraint on the name, ingredients, and instruction columns by adding null: false, ensuring that these columns have a value before changing the database. Finally, you added a default image URL for your image column; this could be another URL if you wanted to use a 
different image.

With these changes, save and exit the file. You’re now ready to run your migration and actually create your table. In your Terminal window, run the following command:

    `rails db:migrate`

Here you used the database migrate command, which executes the instructions in your migration file.

With your recipe model in place, create your recipes controller and add the logic for creating, reading, and deleting recipes. In your Terminal window, run the following command:

    `rails generate controller api/v1/Recipes index create show destroy -j=false -y=false --skip-template-engine --no-helper`

In this command, you created a Recipes controller in an api/v1 directory with an index, create, show, and destroy action. The index action will handle fetching all your recipes, the create action will be responsible for creating new recipes, the show action will fetch a single recipe, and the destroy action will hold the logic for deleting a recipe. You also passed some flags to make the controller more lightweight, including:

    -j=false which instructs Rails to skip generating associated JavaScript files.
    -y=false which instructs Rails to skip generating associated stylesheet files.
    --skip-template-engine, which instructs Rails to skip generating Rails view files, since React is handling your front-end needs.
    --no-helper, which instructs Rails to skip generating a helper file for your controller.

Running the command also updated your routes file with a route for each action in the Recipes controller. To use these routes, make changes to your `config/routes.rb file`. Open up the routes file in your text editor:

    `nano config/routes.rb`

Once it is open, update it to look like the following code:


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

In this route file, you modified the HTTP verb of the create and destroy routes so that it can post and delete data. You also modified the routes for the show and destroy action by adding an :id parameter into the route. :id will hold the identification number of the recipe you want to read or delete.

-> You also added a catch all route with get '/*path' that will direct any other request that doesn’t match the existing routes to the index action of the homepage controller. This way, the routing on the frontend will handle requests that are not related to creating, reading, or deleting recipes.


Rails uses the ActiveRecord library to handle database-related tasks like this. ActiveRecord connects classes to relational database tables and provides a rich API for working with them.

- In your `index` action, using the `.all` method provided by ActiveRecord, you get all the recipes in your database. Using the `.order` method, you order them in descending order by their created date. This way, you have the newest recipes first. Lastly, you send your list of recipes as a JSON response with `render`.
- In the `create` action, you use ActiveRecord’s create method to create a new recipe. The `create` method has the ability to assign all controller parameters provided into the model at once. This makes it easy to create records, but also opens the possibility of malicious use. This can be prevented by using a feature provided by Rails known as 'strong parameters'. This way, parameters can’t be assigned unless they’ve been whitelisted. In your code, you passed a `recipe_params` parameter to the `create` method. The `recipe_params` is a private method where you whitelisted your controller parameters to prevent wrong or malicious content from getting into your database. In this case, you are permitting a name, image, ingredients, and instruction parameter for valid use of the create method.
- you created a private `recipe` method. The recipe method uses ActiveRecord’s find method to find a recipe whose `id` matches the `id` provided in the `params` and assigns it to an instance variable `@recipe`.
- In the `show` action, you checked if a recipe is returned by the `recipe` method and sent it as a JSON response, or sent an error if it was not.
- In the `destroy` action, you did something similar using Ruby’s safe navigation operator `&.`, which avoids `nil` errors when calling a method. This let’s you delete a recipe only if it exists, then send a message as a response.


Seeds

```ruby
puts 'Cleaning...'
Recipe.destroy_all

puts 'Building'
9.times do |i|
  Recipe.create!(
    name: "Recipe #{i + 1}",
    ingredients: '227g tub clotted cream, 25g butter, 1 tsp cornflour,100g parmesan, grated nutmeg, 250g fresh fettuccine or tagliatelle, snipped chives or chopped parsley to serve (optional)',
    instruction: 'In a medium saucepan, stir the clotted cream, butter, and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.'
  )
end
```
To seed the database with this data, run the following command in your Terminal window:

    `rails db:seed`
Running this command adds nine recipes to your database. Now you can fetch them and render them on the frontend.

The component to view all recipes will make a HTTP request to the index action in the RecipesController to get a list of all recipes. These recipes will then be displayed in cards on the page.
Create a `Recipes.jsx` file in the `app/javascript/components` directory:

    `nano app/javascript/components/Recipes.jsx`

Once the file is open, import the React and Link modules into it by adding the following lines to the file: we create a `Recipes` class that extends the `React.Component` class:

```jsx
import React from "react";
import { Link } from "react-router-dom";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  componentDidMount() {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipes: response }))
      .catch(() => this.props.history.push("/"));
  }
  render() {
    const { recipes } = this.state;
    const allRecipes = recipes.map((recipe, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={recipe.image}
            className="card-img-top"
            alt={`${recipe.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    ));
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No recipes yet. Why not <Link to="/new_recipe">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Recipes for every occasion</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular recipes, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/recipe" className="btn custom-button">
                Create New Recipe
              </Link>
            </div>
            <div className="row">
              {recipes.length > 0 ? allRecipes : noRecipe}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

}
export default Recipes;-

```
- Inside the 'constructor', we are initializing a state object that holds the state of your recipes, which on initialization is an empty array (`[]`).
- add a componentDidMount method in the Recipe class. The componentDidMount method is a React lifecycle method that is called immediately after a component is mounted. In this lifecycle method, you will make a call to fetch all your recipes. 
- In your componentDidMount method, you made an HTTP call to fetch all recipes using the Fetch API. If the response is successful, the application saves the array of recipes to the recipe state. If there’s an error, it will redirect the user to the homepage.
- Finally, add a render method in the Recipe class. The render method holds the React elements that will be evaluated and displayed on the browser page when a component is rendered. In this case, the render method will render cards of recipes from the component state. 

Tthe next step is to create a route for it. Open the front-end route file located at `app/javascript/routes/Index.jsx` so that the file is now:
```jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes"; <-

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} /> <-
    </Switch>
  </Router>
);
```

We create a second component to view individual recipes. Create a `Recipe.jsx` file in the `app/javascript/components` directory. As with the Recipes component, import the React and Link modules by adding the following lines:

```jsx
import React from "react";
import { Link } from "react-router-dom";
```

Next create a `Recipe` class that extends `React.Component` class by adding the class:

```jsx
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: { ingredients: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }
}

export default Recipe;
```
Like with your `Recipes` component, in the 'constructor', you initialized a state object that holds the state of a recipe. You also bound an `addHtmlEntities` method to this so it can be accessible within the component. The `addHtmlEntities` method will be used to replace character entities with HTML entities in the component.

In order to find a particular recipe, your application needs the `id` of the recipe. This means your `Recipe` component expects an `id` `param`. You can access this via the `props` passed into the component.

Next, add a `componentDidMount` method where you will access the `id` `param` from the match key of the `props` object. Once you get the `id`, you will then make an HTTP request to fetch the recipe. Add the following highlighted lines to your file:

```jsx
class Recipe extends React.Component {
  [...]
  }
componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipe: response }))
      .catch(() => this.props.history.push("/recipes"));
  }
```
In the `componentDidMount` method, using object destructuring, you get the `id` `param` from the `props` object, then using the Fetch API, you make a HTTP request to fetch the recipe that owns the `id` and save it to the component state using the `setState` method. If the recipe does not exist, the app redirects the user to the recipes page.


Now add the addHtmlEntities method, which takes a string and replaces all escaped opening and closing brackets with their HTML entities. This will help us convert whatever escaped character was saved in your recipe instruction:

```jsx
  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
```

Finally, add a `render` method that gets the recipe from the state and renders it on the page. To do this, add the following highlighted lines:
```jsx
  render() {
    const { recipe } = this.state;
    let ingredientList = "No ingredients available";

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={recipe.image}
            alt={`${recipe.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipeInstruction}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger">
                Delete Recipe
              </button>
            </div>
          </div>
          <Link to="/recipes" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }
```
In this `render` method, you split your comma separated ingredients into an array and mapped over it, creating a list of ingredients. If there are no ingredients, the app displays a message that says 'No ingredients available'. It also displays the recipe image as a hero image, adds a delete recipe button next to the recipe instruction, and adds a button that links back to the recipes page.

To view the Recipe component on a page, add it to your routes file. Open your route file `app/javascript/routes/Index.jsx` to edit:

```jsx
  import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe/:id" exact component={Recipe} />
    </Switch>
  </Router>
);
```
In this route file, you imported your `Recipe` component and added a route for it. Its route has an `:id` `param` that will be replaced by the `id` of the recipe you want to view.
