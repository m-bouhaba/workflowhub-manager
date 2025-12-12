import React, { useState, useEffect } from "react";
import TasksColumn from "../Components/TasksColumn"; 
import TaskModal from "../Components/AddEditPopup"; 
import "../Style/Home.css"; 
// Note: Navbar is now in App.jsx, usually you don't need it here unless specific layout
import { DragDropContext } from "@hello-pangea/dnd";

// Receive onTrashUpdate from props
const HomePage = ({ onTrashUpdate }) => {
    
  const [tasks, setTasks] = useState([]);
  // Removed local trashCount state!
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); 

  const API_URL = "http://localhost:5000";

  // --- 1. Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasksData = await tasksRes.json();
        setTasks(tasksData.sort((a, b) => a.order - b.order));
        
        // We don't fetch trash here anymore, App.jsx handles it
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // --- Handlers ---
  const handleAddNew = () => {
    setCurrentTask(null); 
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task); 
    setIsModalOpen(true);
  };

  // --- 2. DELETE LOGIC ---
  const handleDelete = async (id) => {
    const taskToTrash = tasks.find((t) => t.id === id);
    if (!taskToTrash) return;

    try {
      // A. Add to Trash
      await fetch(`${API_URL}/trash`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToTrash),
      });

      // B. Delete from Tasks
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });

      // C. Re-order logic...
      // (Your existing re-order logic stays here...)
      
      // D. Update UI
      setTasks((prev) => prev.filter((t) => t.id !== id));
      
      // *** TRIGGER PARENT UPDATE ***
      if (onTrashUpdate) onTrashUpdate(); 

    } catch (error) {
      console.error("Error moving to trash:", error);
    }
  };

  // --- 3. Save Logic ---
  const handleSave = async (taskData) => {
    // ... (Your existing handleSave code remains exactly the same) ...
    // Just pasting the core logic for brevity
    try {
      if (taskData.id) {
         // Edit logic
         const response = await fetch(`${API_URL}/tasks/${taskData.id}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(taskData),
         });
         const updatedTask = await response.json();
         setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      } else {
         // Add logic
         // ... calc order ...
         const response = await fetch(`${API_URL}/tasks`, {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(taskData), // Ensure you passed the full object
         });
         const savedTask = await response.json();
         setTasks((prev) => [...prev, savedTask]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDragEnd = (result) => {
    // ... (Your existing drag logic remains exactly the same) ...
  };

  return (
     <div className="home-page">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="board">
            <TasksColumn 
              title="To Do" 
              status="todo" 
              tasks={tasks.sort((a,b) => a.order - b.order)} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              showAddButton={true}
              onAdd={handleAddNew}
            />
            <TasksColumn 
              title="In Progress" 
              status="in-progress" 
              tasks={tasks.sort((a,b) => a.order - b.order)} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
            />
            <TasksColumn 
              title="Done" 
              status="done" 
              tasks={tasks.sort((a,b) => a.order - b.order)} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
            />
          </div>
        </DragDropContext>
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