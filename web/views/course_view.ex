defmodule Chatty.CourseView do
  use Chatty.Web, :view

  def render("index.json", %{courses: courses}) do
    courses
  end

end
