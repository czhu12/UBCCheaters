defmodule Chatty.Repo.Migrations.AddTitleToCourses do
  use Ecto.Migration

  def change do
    alter table(:courses) do
      add :title, :string
    end
  end
end
