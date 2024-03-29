class PrivateController < ApplicationController
  before_action :notify_online_controller_action, only: [:new, :destroy]
  before_action :remove_from_chatroom

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
      ActionCable.server.broadcast "private:#{@current_user.to_gid_param}", mod_message: message_render_1(@private_message)
    end
  end

  def destroy
    @recipient = params[:id]
    @private_messages = PrivateMessage.where(user: current_user, recipient: @recipient).or(PrivateMessage.where(user: User.find(@recipient), recipient: current_user.id))
    @private_messages.delete_all
    redirect_to private_chat_path(id: @recipient)
  end


  def mp3audio
    @private_message = PrivateMessage.new(body: "msg")
    @private_message.user = current_user
    @private_message.recipient = User.find(params[:recipient].to_i)
    @recipient = User.find(params[:recipient].to_i)
    @user = current_user
    metadata_size = "data:audio/mp3;base64,".length
    audio = params[:data][metadata_size, params[:data].length]
    audio1 = Base64.decode64(audio)
    if @private_message.mp3.present?
      @private_message.mp3.file.delete
    else
    end
    s3 = Fog::AWS::Storage.new(:aws_access_key_id => ENV['S3_ACCESS_KEY'], :aws_secret_access_key => ENV['S3_SECRET_KEY'], :region => "ca-central-1")
    directory = s3.directories.get("aliphotoappimages")

    extension = 'mp3'
    name = "private_messages/" + ('a'..'z').to_a.shuffle[0..7].join + ".#{extension}"
    data = audio1
    file = directory.files.create(:key => name,:body => data,:public => true)
    file.save
    url = file.public_url
    puts url
    @private_message.mp3 = url
    if @private_message.save
      ActionCable.server.broadcast "private:#{@recipient.to_gid_param}", mod_message: mp3_message_render(@private_message)
      ActionCable.server.broadcast "private:#{@current_user.to_gid_param}", mod_message: mp3_message_render(@private_message)
    else
      puts "Havoc in banf"
    end
  end

  def video
    puts params[:recipient].to_i
    @private_message = PrivateMessage.new(body: "mp4")
    @private_message.user = current_user
    @private_message.recipient = User.find(params[:recipient].to_i)
    @recipient = User.find(params[:recipient].to_i)
    @user = current_user
    metadata_size = "data:video/mp4;base64,".length
    audio = params[:data][metadata_size, params[:data].length]
    audio1 = Base64.decode64(audio)
    puts audio1
    if @private_message.mp4.present?
      @private_message.mp4.file.delete
    else
    end
    s3 = Fog::AWS::Storage.new(:aws_access_key_id => ENV['S3_ACCESS_KEY'], :aws_secret_access_key => ENV['S3_SECRET_KEY'], :region => "ca-central-1")
    directory = s3.directories.get("aliphotoappimages")

    extension = 'mp4'
    name = "private_messages/" + ('a'..'z').to_a.shuffle[0..7].join + ".#{extension}"
    puts name
    data = audio1
    file = directory.files.create(:key => name,:body => data,:public => true)
    file.save
    url = file.public_url
    puts url
    @private_message.mp4 = url
    if @private_message.save
      puts "finally here to action cable"
      ActionCable.server.broadcast "private:#{@recipient.to_gid_param}", mod_message: mp4_message_render(@private_message)
      ActionCable.server.broadcast "private:#{@current_user.to_gid_param}", mod_message: mp4_message_render(@private_message)
    else
      puts "Havoc in banf"
    end
  end

  private

  def private_msg_params
    params.require(:private_message).permit(:body)
  end

  def message_render(message)
    render_to_string(partial: 'private/message', locals: {msg: message})
  end
  def message_render_1(message)
    render_to_string(partial: 'private/message', locals: {msg: message})
  end

  def mp3_message_render(message)
    render_to_string(partial: 'messages/mp3message', locals: {msg: message})
  end

  def mp4_message_render(message)
    render_to_string(partial: 'messages/mp4message', locals: {msg: message})
  end

  def notify_online_controller_action
    if(logged_in?)
      action = params[:action]
      controller = params[:controller]
      only_relevant = []
      only_relevant.push({event: 'appear', user_id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, controller: controller, action: action})
      ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
    end
  end

end
