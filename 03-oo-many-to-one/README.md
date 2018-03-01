## The World So Far
- create a new object using .new (calls initialize)
- attr accessor

- School, flatiron = School.new("Flatiron School")
- flatiron.instructors => ["Prince", "Andrew", "Hawar"]

- Instructor, prince = Instructor.new("Prince")
- flatiron.instructors => [<instructor Prince>]


## Objectives
- many to one relationship
- single source of truth
- classes should be responsible for their own stuff



## Deliverables
1. Create a User class. A user should initialize with a username and have a reader and writer method for the username. A user should have a method called `#tweets` that returns an array of Tweet instances.
2. Create a Tweet class. A tweet should have a method called `#message` that points to a string and `#user` that points to an instance of the user class. It should have a method called `.all` that returns all the Tweets created.
3. Tweet instances should respond to a message called `#username` that returns the username of the tweet's user.
4. User instances should respond to a method called `#post_tweet` that takes in a message, creates a new tweet and adds it to that user's collection.
