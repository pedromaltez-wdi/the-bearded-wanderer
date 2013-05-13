TheBeardedWanderer::Application.routes.draw do
  resources :users, :except => [ :new, :edit ], defaults: {format: :json}
  
  get 'home' => 'site#home'
  root :to => 'site#index'
  
end
