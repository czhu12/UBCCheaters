defmodule Chatty.Repo.Migrations.AddCourseToUploadedFile do
  use Ecto.Migration

  def change do
    alter table(:uploaded_files) do 
      add :course_id, :integer
    end
  end
end
