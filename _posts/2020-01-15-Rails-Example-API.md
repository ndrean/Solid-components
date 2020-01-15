---
layout: post
title: Rails API, example of controller's code
---

Example at: https://github.com/aomran/api-presentation
Detail at: https://www.aomran.com/designing-building-restful-json-apis/

```ruby
Rails.application.routes.draw do
  namespace :api, :defaults => {:format => :json} do
    namespace :v1 do
      get     "/contacts",     to: "contacts#index"
      post    "/contacts",     to: "contacts#create"
      get     "/contacts/:id", to: "contacts#show"
      put     "/contacts/:id", to: "contacts#update"
      delete  "/contacts/:id", to: "contacts#destroy"
    end
  end
end
```

```ruby
class Contact < ActiveRecord::Base
  scope :relationship, -> (relationship) { where relationship: relationship }
  scope :search, -> (search_term) { where('name LIKE ?', "%#{search_term}%") }
end
```

```ruby
  class API::V1::ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :update, :destroy]

  # GET /contacts
  # GET /contacts.json
  def index
    @contacts = Contact.all

    # Search
    @contacts = @contacts.search(params[:q]) if params[:q]
    # allow query contacts?q=James

    # Filter for relationship
    @contacts = @contacts.relationship(params[:relationship]) if params[:relationship]
    # allow query: api/v1/contacts?relationship=friend

    # Order by
    @contacts = @contacts.order(params[:order].gsub(':', ' ')) if params[:order]
    # allow query: /contacts?order=created_at:desc
    
    # Pagination
    if (params[:offset] && params[:limit])
      @contacts = @contacts.page(1).per(params[:limit]).padding(params[:offset])
    else
      @contacts = @contacts.page(1).per(25)
    end


    render json: @contacts if stale?(etag: @contacts.all, last_modified: @contacts.maximum(:updated_at))
  end

  # GET /contacts/1
  # GET /contacts/1.json
  def show
    render json: @contact if stale?(@contact)
    # stale? checks the options provided (those args) to determine whether the object has been modified
    # and therefore needs to be regenerated. If it's not stale, does the client get cached data from the browser
    # or some proxy server's cache.
  end

  # POST /contacts
  # POST /contacts.json
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      render json: @contact, status: :created
    else
      render json: @contact.errors, status: :unprocessable_entity
      # tells client what went wrong
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update
    if @contact.update(contact_params)
      head :no_content
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy
    @contact.destroy

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      params.require(:contact).permit(:name, :email, :twitter)
    end
end
```
