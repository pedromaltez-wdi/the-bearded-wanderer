TheBeardedWanderer::Application.routes.draw do
  resources :users, :except => [ :new, :edit ], defaults: {format: :json}
  
  root :to => 'site#index'
  
end
