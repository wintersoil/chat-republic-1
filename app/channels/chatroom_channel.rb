class ChatroomChannel < ApplicationCable::Channel

  @arraying = []

  def subscribed
    # stream_from "some_channel"
    current_user.is_online = 1
    current_user.save
    self.class.arraying.push({user_name: current_user.user_name, first_name: current_user.first_name, last_name: current_user.last_name})
    ActionCable.server.broadcast "chatroom_channel", online: online_render(self.class.arraying)
    stream_from "chatroom_channel"
  end

  def unsubscribed
    current_user.is_online = 0
    current_user.save
    result = self.class.arraying.select do |elem|
      elem.user_name != current_user.user_name
    end
    ActionCable.server.broadcast "chatroom_channel", online: online_render(result)
    # Any cleanup needed when channel is unsubscribed
  end

  def online_render(arraying)
    render(partial: "online/people", locals: {online: arraying})
  end

end
