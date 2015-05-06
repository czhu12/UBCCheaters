defmodule Chatty.Repo.Migrations.AddMetaDataToFile do
  use Ecto.Migration

  def change do
    alter table(:uploaded_files) do 
      add :content_type, :string
    end
  end
end
