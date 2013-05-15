class EventsController < ApplicationController

  def index
    @event  = Event.new
    @events = Event.all
  end

  def show
    begin
      @event = Event.find( params[ :id ] )
    rescue
      head :not_found
    end
  end

end
