class User
  include MongoMapper::Document

  attr_accessible :email

  key :email, String

end
