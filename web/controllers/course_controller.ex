defmodule Chatty.CourseController do
  use Chatty.Web, :controller

  alias Chatty.Course

  plug :scrub_params, "course" when action in [:create, :update]
  plug :action

  def index(conn, _params) do
    courses = Repo.all(Course)
    render conn, courses: courses
  end

  def create(conn, %{"course" => course_params}) do
    changeset = Course.changeset(%Course{}, course_params)

    if changeset.valid? do
      Repo.insert(changeset)

      conn
      |> put_flash(:info, "Course created successfully.")
      |> redirect(to: course_path(conn, :index))
    else
      render conn, "new.html", changeset: changeset
    end
  end

  def show(conn, %{"id" => id}) do
    course = Repo.get(Course, id)
    render conn, "show.html", course: course
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
