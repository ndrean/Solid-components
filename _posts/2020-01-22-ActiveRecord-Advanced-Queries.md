---
layout: post

title: ActiveRecord, polymorphism, associations
---

We have a 1-n relation with `people -> accounts`  and a 1-N with `computers -> accounts`, and 'accounts' is the joint table that decribes which person is using which computer with which role. 



    > rails g model Person name
    > rails g model Computer brand
    > rails g model  Account profil  person:references computer:references
    > rails db:migrate
    
Table 'accounts' has then two addtional fields, the foreign keys `person_id`  and `computer_id`.
The models are:

```ruby
class Person < ApplicationRecord
  has_many :accounts
  has_many :computers, through: :accounts
end
```

```ruby
class Computer < ApplicationRecord
  has_many :accounts
  has_many :people, through: :accounts
end
```

```ruby
class Account < ApplicationRecord
  belongs_to :person
  belongs_to :computer
end
```

### Seeds

```ruby
require 'faker'
ROLE = ['admin','employee']
list=[]; 5.times { brand =  Faker::Device.manufacturer; list << brand unless list.include? brand }


users = %w(John Mike).map {|user| Person.create! name: user}
computers = list.map {|comp| Computer.create! name: comp}
5.times do
    Account.create! profil: ROLE.sample, computer: computers.sample, person: users.sample
end
```

## Basics:

#### Select and Pluck columns
`Pluck`returns a column as an array. 
- `Person.all.pluck(:name)` which returns an array.
- `Account.pluck(:profil, :computer_id)` for several columns.

'Select' will prepare the query to display only the selected columns.

#### 'Find', 'Find_by'  and 'where'
 We can search by 'id' or by 'name' and return the first matching object:
- `Person.find(1)` finds by 'id=1'
- `Person.find(Person.last.id)`
- `Account.find_by(profil: 'employee')`

We can search with `where` which returns all matching rows (and equivalently `select`  with a block):
  
    Account.where(profil: 'emloyee')
    Account.select { |a| a.profile == 'employee' }

#### 'through'

If say `a = Account.first`, we can ask `a.person.name`  and `a.computer.brand`.

With the association `through`, say `c = Computer.first`,  then `c` can access to the table 'computers' ('people -> accounts -> computers'). Then `c.people` gives all the people using computer 'c'.
  
 Symetrically, if `p = Person.first`,  then `p.computers`  gives all the computers used by person 'p'.
  

Note: `has_and_belongs_to_many :computers` and `has_and_belongs_to_many :people` in both models `Computer` and `Person` respectively also gives access  to `Person.first.computers` and `Computer.last.where(name: 'John')`, this without a joint table.
  
 ### Join
 
  If we wish to query on associated tables, then we `join` or `include`. We join 'table-B' to 'table-A' by using the **name of the relation** within the calling table.
  
  1) The model `Computer` has a relation `has_may :accounts`. We want to know all the computers whith a profil 'admin'. The table 'accounts' (B) will be joined to the table 'computers' (A) by  `Computer.joins(:accounts)`:
  
    Computer.joins(:accounts).where(accounts: {profil: 'employee'}).distinct
  
and we can write equivalently:

    Computer.joins(:accounts).where('accounts.role=?', 'admin')
  
  2) The model `Account` has a `belongs_to :computer`, then we use `Account.joins(:computer)` and we can write:
  
    Account.joins(:computer).where(computers: { brand: 'Apple' })
    
### Join multiple tables
We can even the table 'accounts' with the table 'computers' and 'people' so we can query with constraints on the tables 'people' and 'computers'.
  
    Account.joins(:computer, :person)
    
For example, we want to order the accounts by the `Person.name` column descending, and by `Computer.brand = 'Appple'`
 
    Account.order('people.name desc').joins(:person, :computer).where(computers: { brand: 'Apple' })
    

If we want to search  for the list of computers names with role of 'employee', then we do (we can use `pluck(

    Account.where(role: 'employee').joins(:computer).map { |a| a.computer.brand }
    
We can have a complete 'readable' picture of the 'accounts' table  with the following query (just added `order`to display this feature):

    Account.order('people.name').joins(:person, :computer).pluck('people.name', :role, 'computers.brand')
 
and this will return an array `[ [people.name, profil, Computer.brand],...]`. For example:
 
    [["John", "employee", "Apple"], ["John", "admin", "Dell"], ["Mike", "employee", "Apple"], ["Mike", "admin", "Apple"], ["Mike", "admin", "Lenovo"]]

We can get all the computers where the person 'John' has a profil 'employee':

    Computer.joins(:accounts, :people).where(accounts: {role: 'employee'}, people: {name: 'John'} ).distinct.pluck(:brand)

    
### Distinct, uniq
We use `uniq` when the result is an array, and `distinct` otherwise.


## Scope, merge

  We can simplify the previous by defining `scopes` in the model. We define a `lambda` in the `Account` model:
  
    class Account
      scope :admin, -> { where(accounts: { role: 'admin' } }
    end
    
then we can use:

      Account.admin
  
We then can use `merge` to call this block on other models after joining them, and `merge` returns an array:

    Person.joins(:accounts).merge(Account.admin)
    
If we define the following scope in the `Computer` model:

          class Computer
            scope :apple, -> { where(computers: { brand: 'Apple' } }
          end
          
 then we can chain the methods and query with selections on the model `Account` and `Computer`. For example:
 
        Computer.apple.joins(:accounts).merge(Account.admin)
  

The `lambda` in the scope can have variables. For example, In the `Computer` model:

    class Computer
      scope :search_by, -> (name) { where('brand = ?', name }
    end
    
We can further simply. If  the scope `.admin` is defined in the model `Account`,  then

    class Computer
      scope :as_admin, -> { joins(:accounts).merge(Account.admin) }
    end
  
then we can use:

    Computer.search_by('Apple').as_admin
 
    
instead of:

     Computer.where(name: 'Apple').joins(:accounts).where(accounts: {role: 'admin' })
    
   
    
  
In resume, we used:
```ruby
class Account < ApplicationRecord
  belongs_to :person, counter_cache: true
  belongs_to :computer, counter_cache: true
  scope :admin, -> { where(role: 'admin') }
end
```

and 
```ruby
class Computer < ApplicationRecord
  has_many :accounts
  has_many :people, through: :accounts

  scope :as_employee, -> { joins(:accounts).where(accounts: {role: 'employee'}).distinct }
  scope :as_admin, -> { joins(:accounts).merge(Account.admin) }

  scope :apple, -> { where(name: 'Apple') }

  scope :search_by, -> (var) { where('brand = ?', var)}
end
```

`Merge` retourn un array permet de faire passer le block qui recherche sur la table 'people'.

`Account.joins(:person).where(people: {name: 'Jo'})`
`Account.joins(:person).merge(Person.where(name: 'Jo'))`

Contrainte sur la table 'computers' et sur la table 'accounts'
`Computer.apple.joins(:accounts).merge(Account.admin)`
`Computer.apple.joins(:accounts).where(accounts: {role: 'admin'})`


`Account.order('people.name').joins(:person, :computer).admin.select('role', 'person_name').pluck('people.name').uniq`
  
  `Account.order('people.name').joins(:person, :computer).admin.each {|c| c.computer}`
 ` Account.order('people.name').joins(:person, :computer).admin`
  
  `Computer.joins(:accounts).merge(Account.admin).distinct`
 ` Computer.joins(:accounts).merge(Account.admin).apple.distinct `


## Counting; `counter_count' and counter_culture
https://github.com/magnusvk/counter_culture

      `>rails g migration AddAccountsCountToPeople accounts_count:integer`
      `>rails g migration AddAccountsCountToComputers accounts_count:integer`
      
```ruby
class Account  < 
  belongs_to :person, counter_count :true
  belongs_to :computer, counter_cache :true
end
```

    `> rails db:migrate`
    

```ruby
create_table "accounts", force: :cascade do |t|
    t.string "profil"
    t.integer "person_id", null: false
    t.integer "computer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["computer_id"], name: "index_accounts_on_computer_id"
    t.index ["person_id"], name: "index_accounts_on_person_id"
  end

  create_table "computers", force: :cascade do |t|
    t.string "brand"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "accounts_count"
  end

  create_table "people", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "accounts_count"
  end

  add_foreign_key "accounts", "computers"
  add_foreign_key "accounts", "people"
end
```

`Computer.last.accounts.size` ou `Person.first.accounts.size`

`Computer.joins(:accounts).group('computer_id').count` returns a hash `{id => nb, ...}`.

https://blog.appsignal.com/2018/06/19/activerecords-counter-cache.html
```ruby
namespace :counters do
  task update: :environment do
    Article.find_each do |article|
      Article.reset_counters(article.id, :responses)
    end
  end
end
```
  
