class ChatroomController < ApplicationController
  before_action :require_logged_in_user

  def new
    @message = Message.new
    @messaging = Message.all
    @user = current_user
    @users = User.all
    action = params[:action]
    controller = params[:controller]
    only_relevant = []
    only_relevant.push({event: 'appear', user_id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, controller: controller, action: action})
    ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

  def create
    @message = Message.new(msg_params)
    @message.user = current_user
    @user = current_user
    @users = User.all
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: message_render(@message)
    else
    end
  end

  def mp3audio
    @message = Message.new(body: "msg")
    @message.user = current_user
    @user = current_user
    metadata_size = "data:audio/mp3;base64,".length
    audio = params[:data][metadata_size, params[:data].length]
    audio1 = Base64.decode64(audio)
    if @message.mp3.present?
      @message.mp3.file.delete
    else
    end
    s3 = Fog::AWS::Storage.new(:aws_access_key_id => ENV['S3_ACCESS_KEY'], :aws_secret_access_key => ENV['S3_SECRET_KEY'], :region => "ca-central-1")
    directory = s3.directories.get("aliphotoappimages")

    extension = 'mpeg'
    name = ('a'..'z').to_a.shuffle[0..7].join + ".#{extension}"
    data = audio1
    file = directory.files.create(:key => name,:body => data,:public => true)
    file.save
    url = file.public_url
    puts url
    @message.mp3 = url
    user_agent =  request.env['HTTP_USER_AGENT'].downcase
    @users_browser ||= begin
  if user_agent.index('msie') && !user_agent.index('opera') && !user_agent.index('webtv')
                'ie'+user_agent[user_agent.index('msie')+5].chr
    elsif user_agent.index('gecko/')
        'gecko'
    elsif user_agent.index('opera')
        'opera'
    elsif user_agent.index('konqueror')
        'konqueror'
    elsif user_agent.index('ipod')
        'ipod'
    elsif user_agent.index('ipad')
        'ipad'
    elsif user_agent.index('iphone')
        'iphone'
    elsif user_agent.index('chrome/')
        'chrome'
    elsif user_agent.index('applewebkit/')
        'safari'
    elsif user_agent.index('googlebot/')
        'googlebot'
    elsif user_agent.index('msnbot')
        'msnbot'
    elsif user_agent.index('yahoo! slurp')
        'yahoobot'
    #Everything thinks it's mozilla, so this goes last
    elsif user_agent.index('mozilla/')
        'gecko'
    else
        'unknown'
    end
  end
  puts @users_browser
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: mp3_message_render(@message, @users_browser)
    else
    end
  end

  #mp4 streaming
  def mp4video
    @message = Message.new(body: "mp4")
    @message.user = current_user
    @user = current_user
    metadata_size = "data:video/mp4;base64,".length
    audio = params[:data][metadata_size, params[:data].length]
    audio1 = Base64.decode64(audio)
    if @message.mp4.present?
      @message.mp4.file.delete
    else
    end
    s3 = Fog::AWS::Storage.new(:aws_access_key_id => ENV['S3_ACCESS_KEY'], :aws_secret_access_key => ENV['S3_SECRET_KEY'], :region => "ca-central-1")
    directory = s3.directories.get("aliphotoappimages")

    extension = 'mp4'
    name = ('a'..'z').to_a.shuffle[0..7].join + ".#{extension}"
    data = audio1
    file = directory.files.create(:key => name,:body => data,:public => true)
    file.save
    url = file.public_url
    puts url
    @message.mp4 = url
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: mp4_message_render(@message)
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

  def mp3_message_render(message, browser)
    render(partial: 'messages/mp3message', locals: {msg: message, browser: browser})
  end

  def mp4_message_render(message)
    render(partial: 'messages/mp4message', locals: {msg: message})
  end

end
