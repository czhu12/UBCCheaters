defmodule Chatty.MessageController do
  use Chatty.Web, :controller

  alias Chatty.Message

  plug :action

  def index(conn, %{"id" => course_id}) do
    message_query = from m in Message,
    where: m.course_id == ^course_id

    messages = Repo.all(message_query)
    render conn, messages: messages
  end

  def create(conn, params) do
    message_params = params["message"]

    message_params = Dict.put(message_params, "course_id", String.to_integer(params["id"]))
    changeset = Message.changeset(%Message{}, message_params)

    if changeset.valid? do
      model = Repo.insert(changeset)
      message_params = Dict.put(message_params, "id", model.id)
      
      Chatty.Endpoint.broadcast("rooms:lobby", "new:msg", message_params)
    end

    render conn, changeset: changeset
  end
end
