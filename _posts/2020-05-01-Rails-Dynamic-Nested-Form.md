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

```
```

## Javacsript
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

