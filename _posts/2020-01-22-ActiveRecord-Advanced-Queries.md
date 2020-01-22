---
layout: post

title: ActiveRecord, polymorphism, associations
---


```ruby
class Person < ApplicationRecord
  has_many :accounts
  has_many :computers
end
```
```ruby
class Computer < ApplicationRecord
  has_many :accounts
  has_many :people, through: :accounts

  scope :employee_role_j, -> { joins(:accounts).where(accounts: {role: 'employee'}) } # plus rapide
  # équivalent mais un peu moins rapide
  scope :employee_role_j2, -> { joins(:accounts).where('accounts.role=?', 'employee') }

  # much slower with includes
  scope :employee_role_i, -> { includes(:accounts).where(accounts: {role: 'employee'}).references(:accounts) }

  scope :apple, -> { where(name: 'Apple') }
end
```
We can ask for all the computers with name 'Apple' with `Computer.apple`, ask for acconts where role si 'admin' with `Account.admin`.
If 'a = Account.first', we can ask `a.person.name`  and `a.computer.name`.
Since  Account `belongs_to :computer` and `belongs_to :person`,  we can join the table 'accounts' with the table 'computers' or 'people'
with `Account.joins(:computer), or `Account.joins(:computer, :person)`.

  
  
```ruby
class Account < ApplicationRecord
  belongs_to :person, counter_cache: true
  belongs_to :computer, counter_cache: true

  scope :admin, -> { where(role: 'admin') }

  def person_name
    read_attribute('person_name') ||   people.name
  end
end
```


  Account.order('people.name').joins(:person, :computer).admin.select('role', 'person_name').pluck('people.name').uniq
  
  Account.order('people.name').joins(:person, :computer).admin.each {|c| c.computer}
  Account.order('people.name').joins(:person, :computer).admin
  
  Computer.joins(:accounts).merge(Account.admin).distinct
  Computer.joins(:accounts).merge(Account.admin).apple.distinct 
