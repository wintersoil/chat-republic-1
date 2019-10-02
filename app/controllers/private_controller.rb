class PrivateController < ApplicationController

  def new
    @private_message = PrivateMessage.new
    @recipient = params[:id]
    @private_messages = PrivateMessage.where(user: current_user, recipient: @recipient).or(PrivateMessage.where(user: User.find(@recipient), recipient: current_user.id))
  end

  def create
    @private_message = PrivateMessage.new(private_msg_params)
    @recipient = User.find(params[:private_message][:recipient].to_i)
    @private_message.user = current_user
    @private_message.recipient = @recipient
    @current_user = current_user
    if @private_message.save
      ActionCable.server.broadcast "private:#{@recipient.to_gid_param}", mod_message: message_render(@private_message)
      redirect_to private_chat_path(id: @recipient.id)
    end
  end

  private

  def private_msg_params
    params.require(:private_message).permit(:body)
  end

  def sendagain
    ActionCable.server.broadcast "private:#{@current_user.to_gid_param}", mod_message: message_render_1(@private_message)
  end

  def message_render(message)
    render(partial: 'private/message', locals: {msg: message})
  end
  def message_render_1(message)
    render(partial: 'private/message', locals: {msg: message})
  end
end
