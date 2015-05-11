defmodule Chatty.Repo.Migrations.ChangeTypeOfCourseToString do
  use Ecto.Migration

  def change do
    alter table(:courses) do 
      remove :course
      add :course, :string
    end
  end
end
