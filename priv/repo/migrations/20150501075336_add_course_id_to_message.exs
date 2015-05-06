defmodule Chatty.Repo.Migrations.AddCourseIdToMessage do
  use Ecto.Migration

  def change do
    alter table(:messages) do 
      add :course_id, :integer
    end
  end
end
