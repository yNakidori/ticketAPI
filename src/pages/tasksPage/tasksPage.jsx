import React from "react";
import EquipmentRequestsList from "../../components/tasksPage_Components/EquipmentRequestsList";
import FileUpload from "../../components/tasksPage_Components/FileUploader";
import FileList from "../../components/tasksPage_Components/FileList";

const TasksPage = () => {
  return (
    <>
      <div className="mt-4">
        <EquipmentRequestsList />
        <FileUpload />
        <FileList />
      </div>
    </>
  );
};

export default TasksPage;
