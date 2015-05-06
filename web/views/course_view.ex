defmodule Chatty.CourseView do
  use Chatty.Web, :view

  def render("index.json", %{courses: courses}) do
    courses
  end

  def render("create.json", %{changeset: changeset}) do
    changeset
  end

  def render("meta.json", %{results: results}) do
    results
  end
end
