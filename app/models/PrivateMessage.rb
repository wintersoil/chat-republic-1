class PrivateMessage < ApplicationRecord

  belongs_to :user
  has_one :recipient, class_name: "User"
  validates :body, presence: true

end
