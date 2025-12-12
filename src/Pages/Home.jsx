import React, { useState, useEffect } from "react";
import TasksColumn from "../Components/TasksColumn"; 
import TaskModal from "../Components/AddEditPopup"; 
import "../Style/Home.css"; 
import Navbar from "../Components/Navbar";
import { DragDropContext } from "@hello-pangea/dnd";

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

        // setTasks(tasksData);

        // const trashRes = await fetch(`${API_URL}/trash`);
        // const trashData = await trashRes.json();
        // setTrashCount(trashData.length);
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
      await fetch(`${API_URL}/trash`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToTrash),
      });

      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });

      const tasksToUpdate = tasks.filter(
        (t) => t.status === taskToTrash.status && t.order > taskToTrash.order
      );

      await Promise.all(
        tasksToUpdate.map((t) =>
          fetch(`${API_URL}/tasks/${t.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: t.order - 1 }),
          })
        )
      );

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

      setTrashCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error moving to trash:", error);
    }
  };

  // --- ADD & EDIT LOGIC ---
  const handleSave = async (taskData) => {
    try {
      if (taskData.id) {
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

  const sourceTasks = tasks
    .filter((t) => t.status === source.droppableId)
    .sort((a, b) => a.order - b.order);
  const destTasks = tasks
    .filter((t) => t.status === destination.droppableId)
    .sort((a, b) => a.order - b.order);

  // Déplacer dans la même colonne
  if (source.droppableId === destination.droppableId) {
    const [movedTask] = sourceTasks.splice(source.index, 1);
    sourceTasks.splice(destination.index, 0, movedTask);

    // Mettre à jour les order
    const updatedTasks = tasks.map((t) => {
      if (t.status === source.droppableId) {
        const index = sourceTasks.findIndex((st) => st.id === t.id);
        if (index !== -1) {
          const newOrder = index + 1;
          if (t.order !== newOrder) {
            // Update sur serveur
            fetch(`${API_URL}/tasks/${t.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ order: newOrder }),
            });
          }
          return { ...t, order: newOrder };
        }
      }
      return t;
    });

    setTasks(updatedTasks);
    return;
  }

  // Déplacer entre colonnes
  const [movedTask] = sourceTasks.splice(source.index, 1);
  movedTask.status = destination.droppableId;
  destTasks.splice(destination.index, 0, movedTask);

  const updatedTasks = tasks.map((t) => {
    // Update order et status si nécessaire
    if (t.id === movedTask.id) return movedTask;

    if (t.status === source.droppableId) {
      const index = sourceTasks.findIndex((st) => st.id === t.id);
      if (index !== -1) return { ...t, order: index + 1 };
    }

    if (t.status === destination.droppableId) {
      const index = destTasks.findIndex((dt) => dt.id === t.id);
      if (index !== -1) return { ...t, order: index + 1 };
    }

    return t;
  });

  // Persist les order et status sur serveur
  updatedTasks.forEach((t) => {
    fetch(`${API_URL}/tasks/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: t.order, status: t.status }),
    });
  });

  setTasks(updatedTasks);
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
