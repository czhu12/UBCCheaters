defmodule Chatty.PageController do
  use Chatty.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end

  def test(conn, _params) do
    render conn, "test.html"
  end
end
