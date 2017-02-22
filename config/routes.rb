Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/users', skip: [:omniauth_callbacks]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'me', to: 'users#me'
      resources :contacts
      resources :custom_fields
    end
  end

  match '*path', to: redirect('/'), via: [:get]
end
