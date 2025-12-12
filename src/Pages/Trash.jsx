import React, { useState, useEffect } from "react";
import "../Style/Trash.css";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Trash() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/trash")
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.order - b.order);
        setData(sorted);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleRestore = async (id) => {
    try {
      const task = data.find((t) => t.id === id);
      if (!task) return;

      await axios.post("http://localhost:5000/tasks", task);
      await axios.delete(`http://localhost:5000/trash/${id}`);

      setData(data.filter((t) => t.id !== id));
    } catch (error) {
      console.log("Erreur restore :", error);
    }
  };

  // DELETE DEFINITIF
  const handlePermanentDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/trash/${id}`);
      setData(data.filter((t) => t.id !== id));
    } catch (error) {
      console.log("Erreur delete :", error);
    }
  };

  // Filtrage des tâches
  const filtered = data.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setData(items);

    // Save new order to JSON-server
    for (let i = 0; i < items.length; i++) {
      await axios.patch(`http://localhost:5000/trash/${items[i].id}`, {
        order: i,
      });
    }
  };

  return (
    <div className="TrashPage">

      <div className="TrashContent">
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
                            draggableId={task.id.toString()}
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
                                    onClick={() => handleRestore(task.id)}
                                  />
                                  <img
                                    src="/delete.png"
                                    alt="Delete permanently"
                                    className="ActionIcon"
                                    onClick={() =>
                                      handlePermanentDelete(task.id)
                                    }
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
    </div>
  );
}
