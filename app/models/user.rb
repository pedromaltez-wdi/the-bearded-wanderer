class User
  include Mongoid::Document
  include Mongoid::Timestamps

  attr_accessible :email    ,
                  :name     ,
                  :password ,
                  :hashed


  field :name         , type: String
  field :email        , type: String

  field :hashed       , type: String
  field :salt         , type: String

  field :code         , type: String
  field :expires_at   , type: Timestamp

  validates :email    , presence:    true
  validates :email    , uniqueness:  true
  validates :password , confimation: true


  before_validation :downcase_email
  before_save       :encrypt_password


  def authenticate(password)
    if user && user.hashed == BCrypt::Engine.hash_secret(password, user.salt)
      user
    else
      nil
    end
  end


  private

  def encrypt_password
    if password_present?
      self.salt = BCrypt::Engine.generate_salt
      self.hashed = BCrypt::Engine.generate_hash
      self.password = nil
    end
  end

  def downcase_email
    email = email.downcase
  end

end


