import React from "react";
import "../Style/TaskTicket.css";

const TaskTicket = ({ task, onEdit, onDelete }) => {
  
  const getColorClass = () => {
    const priority = task.priority ? task.priority.toLowerCase() : 'low';
    if (priority === "high") return "card-pink";
    if (priority === "medium") return "card-cream";
    return "card-green"; 
  };

  return (
    <div 
      className={`task-card ${getColorClass()}`} 
      onClick={onEdit} 
    >
      <div className="card-header">
        <h4 className="task-title">{task.title}</h4>
        <button 
          className="delete-btn" 
          onClick={(e) => {
             e.stopPropagation(); 
             onDelete(); 
          }}
        >
          🗑️
        </button>
      </div>

      <p className="task-desc">{task.description}</p>
    </div>
  );
};

export default TaskTicket;