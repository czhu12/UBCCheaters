defmodule Chatty.UploadedFile do
  use Chatty.Web, :model

  schema "uploaded_files" do
    field :name, :string
    field :size, :integer
    field :content_type, :string
    belongs_to :course, Chatty.Course

    timestamps
  end

  @required_fields ~w(name size course_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If `params` are nil, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ nil) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
