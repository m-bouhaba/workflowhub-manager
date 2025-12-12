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

  // --- 1. Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasksData = await tasksRes.json();
        // Sort tasks by order initially so they appear correct
        setTasks(tasksData.sort((a, b) => a.order - b.order));

        const trashRes = await fetch(`${API_URL}/trash`);
        const trashData = await trashRes.json();
        setTrashCount(trashData.length);
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

  // --- 2. DELETE & RE-ORDER LOGIC ---
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

      // C. RE-ORDER LOGIC:
      // Find tasks in the SAME status that have a higher order than the deleted one
      const tasksToUpdate = tasks.filter(
        (t) => t.status === taskToTrash.status && t.order > taskToTrash.order && t.id !== id
      );

      // Create a list of promises to update server data (Shift order down by 1)
      const updatePromises = tasksToUpdate.map((t) => {
        return fetch(`${API_URL}/tasks/${t.id}`, {
          method: "PATCH", // Use PATCH to update only the order
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: t.order - 1 }),
        });
      });

      await Promise.all(updatePromises);

      // D. Update UI
      // Remove deleted task AND update the order of remaining tasks in local state
      setTasks((prev) => 
        prev
          .filter((t) => t.id !== id)
          .map((t) => {
             // If this task was below the deleted one, decrement its local order
             if (t.status === taskToTrash.status && t.order > taskToTrash.order) {
               return { ...t, order: t.order - 1 };
             }
             return t;
          })
      );
      
      setTrashCount(prev => prev + 1); 

    } catch (error) {
      console.error("Error moving to trash:", error);
    }
  };

  // --- 3. ADD (AUTO-INCREMENT) & EDIT LOGIC ---
  const handleSave = async (taskData) => {
    try {
      if (taskData.id) {
        // --- EDIT MODE ---
        // Just update the task, no need to change order usually
        const response = await fetch(`${API_URL}/tasks/${taskData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        const updatedTask = await response.json();

        setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      
      } else {
        // --- ADD MODE (AUTO INCREMENT) ---
        
        // 1. Calculate new Order
        const tasksInSameColumn = tasks.filter(t => t.status === taskData.status);
        const maxOrder = tasksInSameColumn.length > 0 
          ? Math.max(...tasksInSameColumn.map(t => t.order || 0)) 
          : 0;
        
        const newOrder = maxOrder + 1;

        // 2. Prepare new task object
        const { id, ...dataWithoutId } = taskData; // Remove any temp ID
        const newTaskPayload = { ...dataWithoutId, order: newOrder };

        // 3. Save to server
        const response = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskPayload),
        });
        const savedTask = await response.json();

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
        {/* Pass sorted tasks to columns */}
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
