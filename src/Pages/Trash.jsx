import React, { useState, useEffect } from "react";
import "../Style/Trash.css";
import axios from "axios";

export default function Trash() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/trash")
      .then((res) => setData(res.data))
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

  return (
    <div className="TrashPage">
      <div className="TrashContent">
        {loading ? (
          <div className="ImageLoader">
          <img
            src="/loading1.gif"
            alt="Loading..."
            className="LoaderGif"
          />
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

              {filtered.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                filtered.map((task) => (
                  <div key={task.id} className="TaskCard">
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
                      onClick={() => handlePermanentDelete(task.id)}
                    />
                  </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
