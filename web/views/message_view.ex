defmodule Chatty.MessageView do
  use Chatty.Web, :view

  def render("index.json", %{messages: messages}) do
    messages
  end

  def render("create.json", %{changeset: changeset}) do
    changeset
  end

end
