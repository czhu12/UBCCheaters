defmodule Chatty.CourseController do
  use Chatty.Web, :controller

  alias Chatty.Course

  plug :scrub_params, "course" when action in [:create, :update]
  plug :action

  def index(conn, params) do
    dept = String.upcase(params["dept"])
    query = from c in Course, where: c.dept == ^dept
    courses = Repo.all(query)
    render conn, courses: courses
  end

  def meta(conn, params) do
    query = from c in Course, group_by: c.dept, select: c.dept
    results = Repo.all(query)
    render conn, results: results
  end

  def create(conn, course_params) do
    changeset = Course.changeset(%Course{}, course_params)

    if changeset.valid? do
      Repo.insert(changeset)
    end

    render conn, changeset: changeset
  end

  def show(conn, %{"id" => id}) do
    course = Repo.get(Course, id)
    render conn, course: course
  end

  def edit(conn, %{"id" => id}) do
    course = Repo.get(Course, id)
    changeset = Course.changeset(course)
    render conn, "edit.html", course: course, changeset: changeset
  end

  def update(conn, %{"id" => id, "course" => course_params}) do
    course = Repo.get(Course, id)
    changeset = Course.changeset(course, course_params)

    if changeset.valid? do
      Repo.update(changeset)

      conn
      |> put_flash(:info, "Course updated successfully.")
      |> redirect(to: course_path(conn, :index))
    else
      render conn, "edit.html", course: course, changeset: changeset
    end
  end

  def delete(conn, %{"id" => id}) do
    course = Repo.get(Course, id)
    Repo.delete(course)

    conn
    |> put_flash(:info, "Course deleted successfully.")
    |> redirect(to: course_path(conn, :index))
  end
end
