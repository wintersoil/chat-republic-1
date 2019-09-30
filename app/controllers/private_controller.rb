class PrivateController < ApplicationController

  def new
    @private_message = PrivateMessage.new
    @recipient = params[:id]
    @private_messages = PrivateMessage.where(user: current_user, recipient: @recipient).merge(PrivateMessage.where(user: User.find(@recipient), recipient: current_user.id))
  end

  def create
    @private_message = PrivateMessage.new(private_msg_params)
    @private_message.user = current-user
    if @private_message.save
      redirect_to private_message_path(params[:recipient])
    end
  end

  private

  def private_msg_params
    params.require(:private_message).permit(:body, :recipient)
  end
end
