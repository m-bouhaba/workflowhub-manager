import React from "react";
import "../Style/TaskTicket.css";

const TaskTicket = ({ task, onEdit, onDelete }) => {
  
  // Helper to get the class for the badge (not the card anymore)
  const getBadgeClass = () => {
    const priority = task.priority ? task.priority.toLowerCase() : 'low';
    if (priority === "high") return "badge-high";
    if (priority === "medium") return "badge-medium";
    return "badge-low"; 
  };

  // Helper to format priority text (e.g., "high" -> "Urgent") if needed
  // Or just capitalize the first letter.
  const getPriorityLabel = () => {
    const p = task.priority ? task.priority.toLowerCase() : 'low';
    if (p === 'high') return 'Urgent';
    return p.charAt(0).toUpperCase() + p.slice(1);
  };

  return (
    <div 
      className="task-card" 
      onClick={onEdit}
    >
      <div className="card-header">
        <h4 className="task-title">{task.title}</h4>
        
        <div className="header-actions">
          {/* The Priority Badge */}
          <span className={`priority-badge ${getBadgeClass()}`}>
            {getPriorityLabel()}
          </span>

          {/* The Delete Icon */}
          <button 
            className="delete-btn" 
            onClick={(e) => {
               e.stopPropagation(); 
               onDelete(); 
            }}
          >
            {/* Using an SVG or simple icon to match the outline look */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      <p className="task-desc">{task.description}</p>
    </div>
  );
};

export default TaskTicket;