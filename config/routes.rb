Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'chat#index'
  get 'login', to: 'login#new'
  get 'signup', to: 'signup#new'
  post 'signup', to: 'signup#create'
  post 'login', to: 'login#create'
  delete 'logout', to: 'login#destroy'
  get 'chatroom', to: 'chatroom#new'
  post 'chatroom', to: 'chatroom#create'
  post 'uploadMP3', to: 'chatroom#mp3audio'
  post 'uploadMP4', to: 'chatroom#mp4video'
  get 'profile', to: 'profile#new'
  patch 'profile', to: 'profile#update'
  get 'purge', to: 'purge#deleting'
  post 'profile', to: 'profile#uploadprofilepicture'
  get 'live', to: 'live#new'
  post 'video', to: 'video#create'
  get 'video', to: 'video#new'

  mount ActionCable.server, at: '/cable'
end
