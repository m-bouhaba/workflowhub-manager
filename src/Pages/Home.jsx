import React, { useState, useEffect } from "react";
import TasksColumn from "../Components/TasksColumn";
import TaskModal from "../Components/AddEditPopup"; // Ensure this path matches your file structure
import "../Style/Home.css";
import { DragDropContext } from "@hello-pangea/dnd";

const HomePage = ({ onTrashUpdate }) => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const API_URL = "http://localhost:5000";

  // --- 1. Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasksData = await tasksRes.json();
        // Sort initially
        setTasks(tasksData.sort((a, b) => a.order - b.order));
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

  // --- DELETE LOGIC ---
  const handleDelete = async (id) => {
    const taskToTrash = tasks.find((t) => t.id === id);
    if (!taskToTrash) return;

    try {
      // 1. Add to Trash
      await fetch(`${API_URL}/trash`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToTrash),
      });

      // 2. Delete from Tasks
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });

      // 3. Reorder remaining tasks in that column
      const tasksToUpdate = tasks.filter(
        (t) => t.status === taskToTrash.status && t.order > taskToTrash.order
      );

      // Update backend order
      await Promise.all(
        tasksToUpdate.map((t) =>
          fetch(`${API_URL}/tasks/${t.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: t.order - 1 }),
          })
        )
      );

      // 4. Update Local State
      setTasks((prev) =>
        prev
          .filter((t) => t.id !== id)
          .map((t) => {
            if (t.status === taskToTrash.status && t.order > taskToTrash.order) {
              return { ...t, order: t.order - 1 };
            }
            return t;
          })
      );

      // 5. Notify App.jsx to update the Trash Counter in Navbar
      if (onTrashUpdate) onTrashUpdate();

    } catch (error) {
      console.error("Error moving to trash:", error);
    }
  };

  // --- ADD & EDIT LOGIC ---
  const handleSave = async (taskData) => {
    try {
      if (taskData.id) {
        // EDIT
        const response = await fetch(`${API_URL}/tasks/${taskData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        const updatedTask = await response.json();
        setTasks((prev) =>
          prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      } else {
        // ADD
        const tasksInSameColumn = tasks.filter(
          (t) => t.status === taskData.status
        );
        const maxOrder =
          tasksInSameColumn.length > 0
            ? Math.max(...tasksInSameColumn.map((t) => t.order || 0))
            : 0;

        const newTaskPayload = {
          ...taskData,
          order: maxOrder + 1,
        };

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

  // --- DRAG & DROP LOGIC ---
  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Create a copy of tasks to manipulate
    let newTasks = Array.from(tasks);
    
    // Filter out tasks by column to calculate indices accurately
    const sourceColumnTasks = newTasks
      .filter(t => t.status === source.droppableId)
      .sort((a, b) => a.order - b.order);

    const destColumnTasks = (source.droppableId === destination.droppableId)
      ? sourceColumnTasks
      : newTasks
          .filter(t => t.status === destination.droppableId)
          .sort((a, b) => a.order - b.order);

    // Identify the moved task
    const movedTask = sourceColumnTasks[source.index];

    // Remove from source array locally
    // (We use IDs to find and manipulate the big list)
    
    // Simple approach: Update properties locally then sync
    if (source.droppableId === destination.droppableId) {
      // Reordering in same column
      sourceColumnTasks.splice(source.index, 1);
      sourceColumnTasks.splice(destination.index, 0, movedTask);
      
      // Update orders based on new array index
      const updates = sourceColumnTasks.map((t, index) => ({
        ...t,
        order: index + 1
      }));

      // Merge updates back into main state
      newTasks = newTasks.map(t => {
        const updated = updates.find(u => u.id === t.id);
        return updated || t;
      });

    } else {
      // Moving between columns
      const sourceTasksList = newTasks.filter(t => t.status === source.droppableId).sort((a,b)=>a.order-b.order);
      const destTasksList = newTasks.filter(t => t.status === destination.droppableId).sort((a,b)=>a.order-b.order);

      // Remove from source
      sourceTasksList.splice(source.index, 1);
      // Add to dest
      movedTask.status = destination.droppableId;
      destTasksList.splice(destination.index, 0, movedTask);

      // Recalculate orders for BOTH columns
      const sourceUpdates = sourceTasksList.map((t, index) => ({...t, order: index + 1}));
      const destUpdates = destTasksList.map((t, index) => ({...t, order: index + 1}));

      // Merge back
      newTasks = newTasks.map(t => {
        const sUp = sourceUpdates.find(u => u.id === t.id);
        if(sUp) return sUp;
        const dUp = destUpdates.find(u => u.id === t.id);
        if(dUp) return dUp;
        return t;
      });
    }

    setTasks(newTasks);

    // Persist changes to server (Naive approach: update changed tasks)
    // For simplicity in this project, we can loop through the changed columns
    newTasks.forEach(t => {
        // Optimization: Only patch if necessary could be done here, 
        // but for safety we patch the tasks in the affected columns.
        if(t.status === source.droppableId || t.status === destination.droppableId) {
             fetch(`${API_URL}/tasks/${t.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: t.order, status: t.status }),
             });
        }
    });
  };

  return (
    <div className="home-page">
      <DragDropContext onDragEnd={handleDragEnd}>
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