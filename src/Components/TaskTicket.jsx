import React from "react";
import "../Style/TaskTicket.css"; // Ensure you have your styles linke

const TaskTicket = ({ task, onEdit, onDelete }) => {
  
  const getColorClass = () => {
    const priority = task.priority ? task.priority.toLowerCase() : 'low';
    if (priority === "high") return "pastel-pink"; // Red/Urgent equivalent
    if (priority === "medium") return "pastel-cream"; // Yellow/Medium
    return "pastel-green"; // Low
  };

  return (
    // Added onClick={onEdit} to the main card so clicking anywhere opens edit
    <div className={`task-card ${getColorClass()}`} onClick={onEdit}>
      <div className="task-head">
        <h4 className="task-title">{task.title}</h4>
        <div className="actions" onClick={(e) => e.stopPropagation()}>
           {/* stopPropagation prevents clicking delete from opening the edit modal */}
          <button className="icon-btn" onClick={onDelete}>🗑️</button>
        </div>
      </div>

      <p className="task-desc">{task.description}</p>
      
      <div className="task-footer">
        <span className="priority-tag">
           Priority: <b>{task.priority}</b>
        </span>
      </div>
    </div>
  );
};

export default TaskTicket;