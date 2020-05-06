---
layout: post
title : Create dynamic nested forms
---

## Setup with One-to-many association
We setup a simple example with two models. The table *restos* has one coliumn  `[name: string]`  and the table `comments` has two columns,  `[comment: string, resto_id: integer]`. 

> We use the standard method `accepts_nested_attributes` to allow you to save attributes on associated records (*comments* here) through the parent (*resto* here). 

> We also use the attribute *dependend: : destroy* to delete every associated records when deleting the parent. We could also use `@resto.comments.destroy_all` in the *destroy* method of the controller *restos*.

```ruby
#models/resto.rb
class Resto < ApplicationRecord
    has_many :comments, dependent: :destroy
    validates :name, uniqueness: true
    accepts_nested_attributes_for :comments 
end

class Comment < ApplicationRecord
  belongs_to :resto
  validates :comment, length: {minimum: 2}
end
```

## Controllers:
Besides the classic two controllers *restos_controller.rb* and *comments_controller.rb* for the two models, we make a specific controller *nests_controller.rb* to handle the specific view with the dynamic nested form. The controller has two methods, `new` and `create`, and the params clearance method `nest_params`
```ruby
def new
    @resto = Resto.new
    @resto.comments.build
 end

 def create
    @resto = Resto.new(nest_params)
    if @resto.save
      redirect_to restos_path
    else
      render :new
    end
  end

  private
  def nest_params
      params.require(:resto).permit(:name, comments_attributes: [:id, :comment])
  end
end
```

## The nested form *new* view

The use the formbuilder `form_with` object with `model: @resto` for the parent form, and the formbuilder `fields_for` object with the association `:comments`. This formbuilder object will generate form fields for us, and will render a block for every element in the association by iteration. We first instanciate a first block by instanciating a first association in the line `@resto.comments.build`  in the *nests_controller* above.

We add a dataset to the *fieldset* wrapper and set it to the  `formbuilder.id`.

```
<div id="myform">
    <%= form_with( model: @resto,  url: 'create', method: :post, local: true) do |f| %>  
        <fieldset>
            <div class="form-group">
            <%= f.label :name, class:"pr-5" %>
            <%= f.text_field :name, required: true %>
            </div>
        </fieldset>
        <div id="commentsDiv">
            <%= f.fields_for :comments do |c| %>
                <fieldset class="form-group  fieldComment" data-id = "<%= c.index%>">
                    <%= c.label "Comment:" %>
                    <%= c.text_field :comment, required: true %>
                </fieldset>
            <% end %>
            <!-- JS will inject a new block here -->
        </div>
        <p> <%= f.button :submit, class:"btn btn-primary pl-2",  id:"submitBtn"%> </p>
    <% end %>
    <p> <button id="newComment", class=" btn-success pl-3">Create Comment</button> </p>
</div>
```

We can add the following CSS to move the button *create comment* below the form *submit* button.
```
#myform {
    position: relative;
}

#submitBtn {
    position: absolute;
    bottom: -0px;
}
```

## Javacsript

This function injects a HTML string after the last input field block, and gives a unique id to the input by incrementing the penultimate block id (given by the formbuilder method `f.id`).
```js
#javascript/components/createComment.js

function createComment() {
  const createCommentButton = document.getElementById("newComment");
  createCommentButton.addEventListener("click", (e) => {
    e.preventDefault();
    const arrayComments = [...document.querySelectorAll(".fieldComment")];
    const lastId = arrayComments[arrayComments.length - 1];
    const newId = parseInt(lastId.dataset.id, 10) + 1;

    document.querySelector("#commentsDiv").insertAdjacentHTML(
      "beforeend",
      `<fieldset class="form-group pl-1 fieldComment" data-id="${newId}">
          <label  for="resto_comments_attributes_${newId}_Comment:">Comment:</label>
          <input type="text" name="resto[comments_attributes][${newId}][comment]" required="required">
        </fieldset>`
    );
  });
}

export { createComment };
```

We have to wait for Turbolinks to be loaded to load the Javascript function.
```
#javascript/packs/application.js

import { createComment } from "../components/createComment.js";

document.addEventListener("turbolinks:load", () => {
  const createCommentButton = document.getElementById("newComment");
  if (createCommentButton) {
    createComment();
  }
});
```

