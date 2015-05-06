defmodule Chatty.Message do
  use Chatty.Web, :model
  import Ecto.Query
  schema "messages" do
    field :body, :string
    field :user, :string
    belongs_to :course, Chatty.Course

    timestamps
  end

  @required_fields ~w(body user course_id)
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
