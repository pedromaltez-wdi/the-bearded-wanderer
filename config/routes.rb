TheBeardedWanderer::Application.routes.draw do
  resources :users, :except => [ :new, :edit ], defaults: {format: :json}
  
  get 'home' => 'site#home'
  post '/login' => 'site#login'
  get '/logout' => 'site#logout'
  root :to => 'site#index'
  
end
