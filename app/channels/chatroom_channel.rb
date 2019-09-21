class ChatroomChannel < ApplicationCable::Channel

  @@arraying = []

  def subscribed
    # stream_from "some_channel"
    current_user.is_online = 1
    current_user.save
    @@arraying.push({user_name: current_user.user_name, first_name: current_user.first_name, last_name: current_user.last_name})
    ActionCable.server.broadcast "chatroom_channel", online: online_render(@@arraying)
    stream_from "chatroom_channel"
  end

  def unsubscribed
    current_user.is_online = 0
    current_user.save
    result = @@arraying.select do |elem|
      elem[:user_name] != current_user.user_name
    end
    @@arraying = result
    ActionCable.server.broadcast "chatroom_channel", online: online_render(result)
    # Any cleanup needed when channel is unsubscribed
  end

  def online_render(arraying)
    ApplicationController.render(partial: "online/people", locals: {online: arraying})
  end

end
