---
layout: post
title: Ruby, self in action
---


```ruby
class Student
  def initialize(name)
    @name = name
  end

  def tell_name
    puts "The sender is: #{self.class}"
    @name
  end
end

class Teacher
  def initialize(student)
    @student = student
  end

  def ask_student_name
    puts "The asker object is : #{self.class}"
    @student.tell_name
  end
end


student = Student.new('Le Wagon')
puts student.tell_name

teacher = Teacher.new(student)
puts teacher.ask_student_name
```

will output:

```
The sender is: Student
Le Wagon
The asker object is : Teacher
The sender is: Student
Le Wagon
```
```
