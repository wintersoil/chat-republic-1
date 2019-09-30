class PrivateMessage < ApplicationRecord

  belongs_to :user
  belongs_to :user, :foreign_key => 'recipient'
  validates :body, presence: true

end
