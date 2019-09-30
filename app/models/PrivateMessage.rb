class PrivateMessage < ApplicationRecord

  belongs_to :user
  belongs_to :recipient, foreign_key:"recipient", class_name: "User"
  validates :body, presence: true

end
