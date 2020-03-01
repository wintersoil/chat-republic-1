class PrivateMessage < ApplicationRecord

  belongs_to :user
  belongs_to :recipient, class_name: "User"
  validates :body, presence: true

end
