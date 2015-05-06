defmodule Chatty.Router do
  use Phoenix.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    #plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Chatty do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/test", PageController, :test
  end
  
  scope "/api", Chatty do
    pipe_through :api

    get "courses/meta", CourseController, :meta
    post "courses", CourseController, :create

    get "courses/:id/messages", MessageController, :index
    post "courses/:id/messages", MessageController, :create

    get "courses/:id/files", UploadedFileController, :index
    post "courses/:id/files", UploadedFileController, :create
    #resources "/files", UploadedFileController
    resources "/courses", CourseController
  end

  socket "/ws", Chatty do
    channel "rooms:*", Channels.Rooms
  end
  # Other scopes may use custom stacks.
  # scope "/api", Chatty do
  #   pipe_through :api
  # end
end
