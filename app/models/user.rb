class User
  include Mongoid::Document

  attr_accessible :email

  key :email, String

end
