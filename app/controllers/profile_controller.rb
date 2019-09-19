class ProfileController < ApplicationController

  helper_method :is_file_exist

  def new
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to profile_path(@user)
    else
      render "new"
    end
  end

  def uploadprofilepicture
    @user = current_user
    if @user.profile_picture
      @user.profile_picture.file.delete
    else
    end
    if @user.update(user_params)
      redirect_to profile_path(@user)
    else
      render "new"
    end
  end

  def is_file_exist(file)
    connection = Fog::Storage.new({
      :provider                 => 'AWS',
      :aws_access_key_id        => ENV['S3_ACCESS_KEY'],
      :aws_secret_access_key    => ENV['S3_SECRET_KEY'],
      :region                   => ENV['AWS_REGION']
    })
    directory = connection.directories.get(ENV['S3_BUCKET'])
    unless !directory.files.head(file).nil?
         #do something, like creating the file
         return true
    end
    return false
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :user_name, :email, :password, :profile_picture)
  end

end
