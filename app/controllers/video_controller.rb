class VideoController < ApplicationController
  before_action :notify_online_controller_action

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

  def mp3audio
    @client = User.find(params[:client].to_i)
    @user = current_user
    #metadata_size = "data:audio/mp3;base64,".length
    #@audio = params[:data][metadata_size, params[:data].length]
    @audio = params[:data]
    #@audio1 = Base64.decode64(audio)
    ActionCable.server.broadcast("video:#{@client.to_gid_param}", data: {audio: true, audio_data: mp3_message_live_render(@audio)})
  end

  def video_params
    params.require(:video_client).permit(:user, :client)
  end

  def notify_online_controller_action
    action = params[:action]
    controller = params[:controller]
    only_relevant = []
    only_relevant.push({event: 'appear', user_id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, controller: controller, action: action})
    ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

  private

  def mp3_message_live_render(audio1)
    render_to_string(partial: 'messages/mp3messageLive', locals: {msg: audio1})
  end

end
