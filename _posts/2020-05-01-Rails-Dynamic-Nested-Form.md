---
layout: post
title : Create dynamic nested forms
---

## Setup with One-to-many association

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
Besides the classic two controllers *restos_controller.rb* and *comments_controller.rb* for the two models, we make a specific controller `nests_controller.rb` with two methods, `new` and `create`
```ruby

```
