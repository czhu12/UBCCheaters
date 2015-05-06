defmodule Chatty.UploadedFileController do
  use Chatty.Web, :controller

  alias Chatty.UploadedFile

  plug :scrub_params, "file" when action in [:create, :update]
  plug :action

  def index(conn, %{"id" => course_id}) do
    uploaded_file_query = from u in UploadedFile,
    where: u.course_id == ^course_id

    files = Repo.all(uploaded_file_query)
    render conn, files: files
  end

  #def create(conn, %{"file" => file_params}) do
  def create(conn, params) do
    file_params = params["file"]
    changeset = Ecto.Changeset.change(%UploadedFile{}, %{})
    changeset = SaveFilePlug.set_data(file_params, changeset)

    changeset = Ecto.Changeset.change(changeset, %{course_id: String.to_integer(params["id"])})

    if changeset.valid? do
      file = Repo.insert(changeset)
      SaveFilePlug.save_file(file, file_params.path)

      link = SaveFilePlug.original_file_path(file)
      broadcast(file, link)
    end

    render conn, changeset: changeset
  end

  defp broadcast(file, link) do
      Chatty.Endpoint.broadcast(
        "rooms:lobby", 
        "new:uploadedfile", 
        %{name: file.name, link: link, course_id: file.course_id}
      )
  end

end
