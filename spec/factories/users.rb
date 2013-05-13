FactoryGirl.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { SecureRandom.hex(8) }
  end

  factory :invalid_user , parent: :user do
    name nil
    email nil
  end

end