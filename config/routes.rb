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
  get 'profile', to: 'profile#new'
  patch 'profile', to: 'profile#update'

  mount ActionCable.server, at: '/cable'
end
