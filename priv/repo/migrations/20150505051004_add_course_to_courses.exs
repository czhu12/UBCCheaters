defmodule Chatty.Repo.Migrations.AddCourseToCourses do
  use Ecto.Migration

  def change do
    alter table(:courses) do 
      add :course, :integer
    end
  end
end
