import React, { useState } from "react";
import TasksColumn from "../Components/TasksColumn"
import TaskModal from "../Components/AddEditPopup"; 

const initialData = [
  { id: 1, title: "Design login page", description: "Create UI", priority: "high", status: "todo" },
  { id: 2, title: "API integration", description: "Connect to DB", priority: "medium", status: "in-progress" },
  { id: 3, title: "Fix navbar", description: "Responsive bug", priority: "low", status: "done" }
];

const Home = () => {
  const [tasks, setTasks] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); 

  // --- Handlers ---
  const handleAddNew = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this ticket?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleSave = (taskData) => {
    if (taskData.id) {
      setTasks((prev) => prev.map((t) => (t.id === taskData.id ? taskData : t)));
    } else {
      const newTask = { ...taskData, id: Date.now() };
      setTasks((prev) => [...prev, newTask]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <header className="app-header">
        <h1>WorkflowHub</h1>
        <div className="user-welcome">Welcome, User!</div>
      </header>

      <div className="board-layout" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
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

export default Home;