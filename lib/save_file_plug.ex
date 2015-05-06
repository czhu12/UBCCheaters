defmodule SaveFilePlug do

  def save_file(model, path) do
    post_process_file(model, path)
  end

  def set_data(file_params, changeset) do
    assign_file_information(file_params, changeset)
  end

  def assign_file_information(upload_plug, model) do
    content_type = content_type(upload_plug)
    name = file_name(upload_plug)
    size = size(upload_plug)
    changes = Ecto.Changeset.change(model, %{content_type: content_type, name: name, size: size})
    changes
  end

  def post_process_file(model, path) do
    if model.id do
      attachment_directory_path = attachment_container_absolute_path(model, :file)
      File.rm_rf(attachment_directory_path)
      File.mkdir_p(attachment_directory_path)
      store_original_file(model, path, attachment_directory_path)
    end

  end

  def attachment_container_absolute_path(model, attribute_name) do
    Enum.join([Mix.Project.app_path, "/priv/static",
        attachment_container_relative_path(model, attribute_name)], "/")
  end

  def id_partition(id) do
    if id != nil do
      formatted_id = :io_lib.format("~9..0B", [id])  |> List.flatten |> to_string
      Regex.scan(~r/\d{3}/, formatted_id) |> List.flatten |> Enum.join("/")
    else
      ""
    end
  end

  def attachment_container_relative_path(model, attribute_name) do
    Enum.join(["system", \
        Mix.Utils.underscore(model.__struct__), \
        attribute_name, \
        id_partition(model.id)], "/")
  end

  def original_file_path(model) do
    relative_path = attachment_container_relative_path(model, :file)
    Enum.join([relative_path, 'original'], "/")
  end

  def store_original_file(model, path, attachment_directory_path) do
    original_file_destination = Enum.join( \
        [attachment_directory_path, "original"], "/")
    File.mkdir_p(original_file_destination)
    IO.puts(Enum.join([original_file_destination, model.name], "/"))
    File.copy(path, Enum.join([original_file_destination, model.name], "/"), :infinity)
  end

  def size(plug) do
    File.stat!(plug.path).size
  end

  def content_type(plug) do
    plug.content_type
  end

  def file_name(plug) do
    Regex.replace(~r/[&$+,\/:;=?@<>\[\]\{\}\|\\\^~%# ]/, plug.filename, "_")
  end

end
