---
layout: post
title : Create dynamic nested forms
---

## Setup with One-to-many association
We setup a simple example with two models. The table *restos* has one coliumn  `[name: string]`  and the table `comments` has two columns,  `[comment: string, resto_id: integer]`. 

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

