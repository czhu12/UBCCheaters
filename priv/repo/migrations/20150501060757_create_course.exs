defmodule Chatty.Repo.Migrations.CreateCourse do
  use Ecto.Migration

  def change do
    create table(:courses) do
      add :faccode, :string
      add :dept, :string

      timestamps
    end
  end
end
