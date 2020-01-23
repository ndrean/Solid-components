---
layout: post

title: ActiveRecord, polymorphism, associations
---

We have a 1-n relation with `people -> accounts`  and a 1-N with `computers -> accounts`, and 'accounts' is the joint table that decribes which person is using which computer with which role. 


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

  scope :user_profil, -> { joins(:accounts).where(accounts: {role: 'employee'}) }
  # équivalent to  -> { joins(:accounts).where('accounts.role=?', 'employee') }

  # much slower with includes
  scope :employee_role_i, -> { includes(:accounts).where(accounts: {role: 'employee'}).references(:accounts) }

  scope :apple, -> { where(name: 'Apple') }
end
```
### Select and Pluck columns
`Pluck`returns a column as an array. 
- `Person.all.pluck(:name)` which returns an array.
- `Account.pluck(:profil, :computer_id)` for several columns.

'Select' will prepare the query to display only the selected columns.

### 'Find', 'Find_by'  and 'where'
We can search by 'id' or by 'name' and return the first matching object:
- `Person.find(1)` finds by 'id=1' or equivalently `Person.find(Person.last)`
- `Account.find_by(profil: 'employee')
We can search with `where` which returns all matching rows.
`Account.where(profil: 'emloyee') returns them all.

If we wish to query on associated tables, then we `join`:


With the scopes, we can ask:
- for all computers with name 'Apple' with `Computer.apple`,
- for all accounts with 'admin' profil with `Account.admin`,
- for all computers used with and 'admin' profil with `Computer.employee_profil`

With the association `through`, if say 'a = Account.first', we can ask `a.person.name`  and `a.computer.name`.

Since  Account `belongs_to :computer` and `belongs_to :person`,  we can join the table 'accounts' with the table 'computers' or 'people' or both: `Account.joins(:computer), or `Account.joins(:computer, :person)`.

  
 ### Join
 
  Computer.joins(:accounts).merge(Account.admin).distinct
  
If we want to know the list of computers which have an employee profil:

  Account.where(role: 'employee').joins(:computer).map { |a| a.computer.name }
  
```ruby
class Account < ApplicationRecord
  scope :admin, -> { where(role: 'admin') }
end
```
`Merge` retourn un array permet de faire passer le block qui recherche sur la table 'people'.
Account.joins(:person).where(people: {name: 'Jo'})
Account.joins(:person).merge(Person.where(name: 'Jo'))

Contrainte sur la table 'computers' et sur la table 'accounts'
Computer.apple.joins(:accounts).merge(Account.admin)
Computer.apple.joins(:accounts).where(accounts: {role: 'admin'})


Account.order('people.name').joins(:person, :computer).admin.select('role', 'person_name').pluck('people.name').uniq
  
  Account.order('people.name').joins(:person, :computer).admin.each {|c| c.computer}
  Account.order('people.name').joins(:person, :computer).admin
  
  Computer.joins(:accounts).merge(Account.admin).distinct
  Computer.joins(:accounts).merge(Account.admin).apple.distinct 


## Counting; `counter_count' and counter_culture
https://github.com/magnusvk/counter_culture

      >rails g migration AddAccountsCountToPeople accounts_count:integer
      >rails g migration AddAccountsCountToComputers accounts_count:integer
      
```ruby
class Account  < 
  belongs_to :person, counter_count :true
  belongs_to :computer, counter_cache :true
end
```
    > rails db:migrate
    

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
    t.string "name"
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
  
