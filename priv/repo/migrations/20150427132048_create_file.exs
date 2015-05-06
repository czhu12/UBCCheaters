defmodule Chatty.Repo.Migrations.CreateFile do
  use Ecto.Migration

  def change do
    create table(:uploaded_files) do
      add :name, :string
      add :size, :integer

      timestamps
    end
  end
end
