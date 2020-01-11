---
layout: post
title: Rails, setup modules
---

## How to set up autoloading for modules located in /lib

Modify your config/application.rb to include the following line.
```ruby
# config/application.rb

module MyApp
  class Application < Rails::Application
    config.eager_load_paths += %W(#{config.root}/lib)
  end
end
```

## How to define and include a module

You can define a module like this:
```ruby
# /lib/greetings.rb

module Greeting
  def hello
    "hello"
  end
end
```

When you include that module in a class, you can use the `hello` function in the class from which you included the module.


## How to use a module in an ActiveRecord model

You can include a module in a class in your Rails project by using the include keyword followed by the name of your module.

```ruby
# app/models/customer.rb

class Customer < ActiveRecord::Base
  include Greeting
end
```

Now you should be able to do `Customer.new.hello` and get “hello” as a result.
