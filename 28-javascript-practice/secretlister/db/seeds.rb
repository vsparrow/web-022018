# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# reate_table "tasks", force: :cascade do |t|
#   t.string "description"
#   t.string "priority"
#   t.boolean "completed", default: false
Task.create(description: "test description", priority: "low", completed: false)
Task.create(description: "test description2", priority: "medium", completed: false)
Task.create(description: "test description3", priority: "8", completed: false)
Task.create(description: "test description4", priority: "Awesome", completed: false)
