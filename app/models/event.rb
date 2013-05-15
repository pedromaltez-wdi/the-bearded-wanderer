class Event
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name         , type: String
  field :description  , type: String
  field :link         , type: String

  validates :name, presence: true
  validates :description, presence: true
  validates :link, presence: true

end
