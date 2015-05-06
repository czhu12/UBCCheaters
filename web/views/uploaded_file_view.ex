defmodule Chatty.UploadedFileView do
  use Chatty.Web, :view

  def render("index.json", %{files: files}) do
    Enum.map(files, fn file -> %{
      id: file.id, 
      name: file.name, 
      link: SaveFilePlug.original_file_path(file), 
      course_id: file.course_id} end
    )
  end

  def render("create.json", %{changeset: changeset}) do
    changeset
  end
end
