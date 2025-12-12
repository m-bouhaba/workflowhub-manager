import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for Return button
import "../Style/Trash.css";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// Fixed import name to match file path logic
import ConfirmPopup from "../Components/ConfirmPopup"; 

export default function Trash({ onTrashUpdate }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Modal State ---
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState({ type: null, taskId: null });

  const API_URL = "http://localhost:5000"; 

  useEffect(() => {
    axios
      .get(`${API_URL}/trash`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.order - b.order);
        setData(sorted);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const initiateRestore = (id) => {
    setConfirmAction({ type: 'restore', taskId: id });
    setIsConfirmOpen(true);
  };

  const initiatePermanentDelete = (id) => {
    setConfirmAction({ type: 'delete', taskId: id });
    setIsConfirmOpen(true);
  };

  const executeRestore = async () => {
    const id = confirmAction.taskId;
    try {
      const task = data.find((t) => t.id === id);
      if (!task) return;

      await axios.post(`${API_URL}/tasks`, task);
      await axios.delete(`${API_URL}/trash/${id}`);

      setData(data.filter((t) => t.id !== id));
      
      if (onTrashUpdate) onTrashUpdate();

    } catch (error) {
      console.log("Erreur restore :", error);
    }
  };

  const executePermanentDelete = async () => {
    const id = confirmAction.taskId;
    try {
      await axios.delete(`${API_URL}/trash/${id}`);
      setData(data.filter((t) => t.id !== id));
      
      if (onTrashUpdate) onTrashUpdate();

    } catch (error) {
      console.log("Erreur delete :", error);
    }
  };

  const handleConfirm = () => {
    if (confirmAction.type === 'restore') {
      executeRestore();
    } else if (confirmAction.type === 'delete') {
      executePermanentDelete();
    }
  };

  const filtered = data.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setData(items);

    for (let i = 0; i < items.length; i++) {
      await axios.patch(`${API_URL}/trash/${items[i].id}`, {
        order: i,
      });
    }
  };

  return (
    <div className="TrashPage">
      <div className="TrashContent">
        
        {/* --- RETURN BUTTON --- */}
        <div className="trash-header">
          <Link to="/home" className="return-btn">
            <i className="fa-solid fa-arrow-left"></i> Return
          </Link>
        </div>

        {loading ? (
          <div className="ImageLoader">
            <img src="/loading1.gif" alt="Loading..." className="LoaderGif" />
          </div>
        ) : (
          <>
            <div className="TaskList">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="SearchInput"
              />

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="trashList">
                  {(provided) => (
                    <div
                      className="TaskList"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {filtered.length === 0 ? (
                        <p>No tasks found.</p>
                      ) : (
                        filtered.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={String(task.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="TaskCard"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="ContentCard">
                                  <h3>{task.title}</h3>
                                  <p>Description: {task.description}</p>
                                </div>

                                <div className="TaskActions">
                                  <img
                                    src="/restore.png"
                                    alt="Restore"
                                    className="ActionIcon"
                                    onClick={() => initiateRestore(task.id)}
                                  />
                                  <img
                                    src="/delete.png"
                                    alt="Delete permanently"
                                    className="ActionIcon"
                                    onClick={() => initiatePermanentDelete(task.id)}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </>
        )}
      </div>

      <ConfirmPopup
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        actionType={confirmAction.type}
      />
    </div>
  );
}