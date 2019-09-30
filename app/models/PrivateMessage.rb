class PrivateMessage < ApplicationRecord

  belongs_to :user
  has_one :user, foreign_key:"recipient", class_name: "User"
  validates :body, presence: true

end
