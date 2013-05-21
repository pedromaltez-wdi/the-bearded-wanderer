class EventsController < ApplicationController

  def index
    @event  = Event.new
    @events = Event.all

    @meetups = meetups

  end

  def show
    begin
      @event = Event.find( params[ :id ] )
    rescue
      head :not_found
    end
  end

  def meetup_api
    @meetups = meetups
  end

  protected

  def meetups
    # RMeetup::Client.api_key = "145368d59141781a514078586d19"
    # return RMeetup::Client.fetch(:events,{:zip => "EC1R 5DF"})
    response = RestClient.get 'https://api.meetup.com/2/open_events?', {
      :params => {
        'sign' => 'true',
        'city' => 'London',
        'category' => 34,
        'zip' => 'EC1R 5DF',
        'page' => 4,
        'key' => '4a10285e45445e77313a62f737c275d',
        'text_format' => 'plain'
      }, :content_type => "application/json; charset=utf-8", :accept => :json
    }

    response = response.encode('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
    response = JSON.parse(response)['results']
    response = response.to_json
    response
  end



end
