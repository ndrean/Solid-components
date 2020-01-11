---
layout: post
title: Rails, setup modules
---

## How to set up autoloading for modules located in /lib

Modify `config/application.rb` to include the following line:

```ruby
# config/application.rb

module MyApp
  class Application < Rails::Application
    config.eager_load_paths += %W(#{config.root}/lib) <-
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

When you `include Greeting` in a class, you can now use the `hello` function. For example:


```ruby
# app/models/customer.rb

class Customer < ActiveRecord::Base
  include Greeting
end
```

so you can do `Customer.new.hello` and get “hello” as a result.
