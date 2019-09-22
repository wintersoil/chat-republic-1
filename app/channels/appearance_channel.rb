class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance_channel"
    current_user.appear
  end

  def unsubscribed
    current_user.disappear
  end

  def appear
    current_user.appear
  end

  def away
    current_user.away
  end
end
