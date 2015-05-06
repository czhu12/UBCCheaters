defmodule Chatty.Channels.Rooms do
  use Phoenix.Channel

  def join("rooms:lobby", message, socket) do
    IO.puts "Someone has joined"

    {:ok, socket}
  end

  def join("rooms:" <> _private_subtopic, _message, _socket) do
    :ignore
  end

  def handle_in("new:msg", msg, socket) do
    broadcast socket, "new:msg", %{user: msg["user"], body: msg["body"]}
    {:noreply, socket}
  end

  def handle_in("new:uploadedfile", msg, socket) do
    broadcast! socket, "new:uploadedfile", %{filename: msg["filename"], link: msg["link"]}
    {:noreply, socket}
  end
end
