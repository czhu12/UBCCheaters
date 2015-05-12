defmodule Chatty.Repo.Migrations.ChangeBodyToText do
  use Ecto.Migration

  def change do
    alter table(:messages) do 
      remove :body
      add :body, :text
    end
  end
end
