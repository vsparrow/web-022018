class CreateLaptop < ActiveRecord::Migration
  def change
    create_table :laptops do |t|
      t.string :name
      t.string :brand
    end
  end
end
