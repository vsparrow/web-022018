class Fan < DynamicRecord
  attr_accessor :name, :artist_id
  attr_reader :id

  def initialize(fan_attributes) # fan_attributes = { name: "Howard", artist_id: 34 }
    @name = fan_attributes[:name]
    @artist_id = fan_attributes[:artist_id]
    @id = fan_attributes[:id]
    super
  end

  # ------ instance methods ------

  # save a instance to the db as a row
  def save
    sql = <<-SQL
      INSERT INTO fans (name, artist_id) VALUES (?, ?)
    SQL

    DB.execute(sql, self.name, self.artist_id)

    max_id = DB.execute('SELECT MAX(id) FROM fans')[0][0]

    resp = DB.execute("SELECT * FROM fans WHERE id=?", max_id)[0]
    Fan.format_sql(resp)
  end


  def update(attributes)

  end

  # delete a record from the database
  def delete

  end

  # ------ class methods -------

  # create should instantiate a new instance and save it to the database
  def self.create(attributes)
    new_fan = self.new(attributes)
    new_fan.save
  end

  # all should return all instances of the class from the database
  def self.all
    sql = <<-SQL
      SELECT * FROM fans
    SQL

    resp = DB.execute(sql)
    resp.map{|row| Fan.format_sql(row)}
  end


  # find an instance by id
  def self.find(id)
    sql = <<-SQL
      SELECT * FROM fans WHERE id = ?
    SQL

    resp = DB.execute(sql, id)[0]
    Fan.format_sql(resp)
  end

  def self.format_sql(response) # {"id"=>1, "name"=>"niky", "artist_id"=>11, 0=>1, 1=>"niky", 2=>11}
    name = response['name']
    id = response['id']
    artist_id = response['artist_id']
    Fan.new(name: name, id: id, artist_id: artist_id)
  end

end
