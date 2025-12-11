import React, { useState, useEffect } from "react";
import TasksColumn from "../Components/TasksColumn";
import TaskModal from "../Components/AddEditPopup";
import "../Style/Home.css";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [trashCount, setTrashCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasksData = await tasksRes.json();
        setTasks(tasksData);
        console.log(tasksData);

        const trashRes = await fetch(`${API_URL}/trash`);
        const trashData = await trashRes.json();
        setTrashCount(trashData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddNew = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    
    const taskToTrash = tasks.find((t) => t.id === id);

    if (taskToTrash) {
      try {
        // 1. Add to Trash
        await fetch(`${API_URL}/trash`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskToTrash),
        });

        // 2. Delete from Tasks
        await fetch(`${API_URL}/tasks/${id}`, {
          method: "DELETE",
        });

        // 3. Update UI instantly
        setTasks(tasks.filter((t) => t.id !== id));
        setTrashCount(prev => prev + 1); 

      } catch (error) {
        console.error("Error moving to trash:", error);
      }
    }
  };


  const handleSave = async (taskData) => {
    try {
      if (taskData.id) {
        const response = await fetch(`${API_URL}/tasks/${taskData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });

        const updatedTask = await response.json(); // Get the confirmed update from server

        setTasks((prev) =>
          prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );

      } else {
        const { id, ...newTaskData } = taskData;

        const response = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskData),
        });

        const savedTask = await response.json(); // Use the object returned by Server (with the real ID)

        setTasks((prev) => [...prev, savedTask]);
      }

      setIsModalOpen(false);

    } catch (error) {
      console.error("Error saving task:", error);
    }
  };


  return (
    <div className="home-page">
      <div className="board">
        <TasksColumn
          title="To Do"
          status="todo"
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showAddButton={true}
          onAdd={handleAddNew}
        />
        <TasksColumn
          title="In Progress"
          status="in-progress"
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <TasksColumn
          title="Done"
          status="done"
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        taskToEdit={currentTask}
      />
    </div>
  );
};

export default HomePage;