class ChatroomController < ApplicationController
  before_action :require_logged_in_user

  def new
    @message = Message.new
    @messaging = Message.all
    @user = current_user
  end

  def create
    @message = Message.new(msg_params)
    @message.user = current_user
    @user = current_user
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: message_render(@message)
    else
    end
  end

  private

  def msg_params
    params.require(:message).permit(:body)
  end

  def message_render(message)
    render(partial: 'messages/message', locals: {msg: message})
  end

end
