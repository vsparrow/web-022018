require_relative "./user"
class Tweet
  attr_accessor :message
  attr_reader :user

  @@all = []

  def initialize(message, user)
    @message = message
    @user = user
    @@all << self
  end

  # Make #tweets, #post_tweet and #username methods

  def self.all
    @@all
  end

  def username
    # self.user.username  #this objects @user which holds the user object, and get the name from that
    # @user.username
    user.username #all three will work. this works because of inheritance chain, ruby infers you called self.user 
  end

end
