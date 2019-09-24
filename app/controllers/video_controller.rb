class VideoController < ApplicationController

  def new
    id = params[:id]
    @client = User.find(id)
  end

  def create
    id = params[:id]
    @client = User.find(id)
    @videoClient = VideoClient.find_by(user: current_user, client_id: @client.id)
    @videoClient2 = VideoClient.find_by(user: @client, client_id: current_user.id)
    if @videoClient.nil? == false
      @videoClient.destroy
    end
    if @videoClient2.nil? == false
      @videoClient2.destroy
    end
    @videoClient = VideoClient.new(user: current_user, client_id: @client.id)
    @videoClient2 = VideoClient.new(user: @client, client_id: current_user.id)
    if @videoClient.save && @videoClient2.save
      #broadcast to both users the link
      #VideoChannel.broadcast_to(@client, { notification: 'Test message' })
      #VideoChannel.broadcast_to(@videoClient.user, { notification: 'Test message' })
      redirect_to controller: 'video', action: 'new', id:@client.id
    end
  end

  def destroy
    id = params[:id]
    @client = User.find(id)
    @videoClient = VideoClient.find_by(user: current_user, client_id: @client.id)
    @videoClient2 = VideoClient.find_by(user: @client, client_id: current_user.id)
    if @videoClient.nil? == false && @videoClient.destroy && @videoClient2.nil? == false && @videoClient2.destroy
      redirect_to live_path
    end
  end

  def video_params
    params.require(:video_client).permit(:user, :client)
  end

end
