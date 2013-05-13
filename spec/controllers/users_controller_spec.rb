require 'spec_helper'

describe UsersController do
  let!( :user ) { create( :user ) }
  subject { user }

  describe "GET #index" do
    it "populates an array of Users" do
      get :index, format: :json
      expect( assigns( :users ) ).to match_array( [user] )
    end

    it "renders the index.json.rabl" do
      get :index, format: :json
      expect( response ).to render_template :index
    end

    it "responds with a 200 OK status code" do
      get :index, format: :json
      expect( response.response_code ).to eq 200
    end
  end

end