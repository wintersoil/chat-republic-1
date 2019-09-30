class PrivateController < ApplicationController
  before_filter :sanitize_page_params

  def new
    @private_message = PrivateMessage.new
    @recipient = params[:id]
    @private_messages = PrivateMessage.where(user: current_user, recipient: @recipient)
    @private_messages2 = PrivateMessage.where(user: User.find(@recipient), recipient: current_user.id)
  end

  def create
    @private_message = PrivateMessage.new(private_msg_params)
    @private_message.user = current_user
    if @private_message.save
      redirect_to private_message_path(params[:private_message][:recipient])
    end
  end

  private

  def sanitize_page_params
    params[:private_message][:recipient] = params[:private_message][:recipient].to_i
  end

  def private_msg_params
    params.require(:private_message).permit(:body, :recipient)
  end
end
