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
    if @private_message.save
      redirect_to private_chat_path id: params[:private_message][:recipient]
    end
  end

  private

  def private_msg_params
    params.require(:private_message).permit(:body)
  end
end
