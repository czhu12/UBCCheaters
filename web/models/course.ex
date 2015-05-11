defmodule Chatty.Course do
  use Chatty.Web, :model

  schema "courses" do
    field :dept, :string
    field :faccode, :string
    field :title, :string
    field :course, :string
    has_many :messages, Chatty.Message
    has_many :uploaded_files, Chatty.UploadedFile

    timestamps
  end

  @required_fields ~w(dept title faccode course)
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
