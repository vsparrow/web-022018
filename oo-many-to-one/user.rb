require_relative "./tweet"

class User
  attr_accessor :username

  def initialize(username)
    @username = username
    # @tweets = []
  end
  # Make #tweets, #post_tweet and #username methods
  # def username
  #   @username
  # end
  #
  # def username=(username)
  #   @username = username
  # end

  def tweets
    #returns an array of tweet instances for a user

    # usertweets = Tweets.all.collect { |t| t.username == @username}
    usertweets = Tweets.all.collect { |t| t.user == self}
  end

  def post_tweet(message)
    tweet = Tweet.new(message,self)
  end


end
