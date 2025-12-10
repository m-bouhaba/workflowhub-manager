import React from "react";
import TaskTicket from "./TaskTicket";
import "../Style/TasksColumn.css";

const TasksColumn = ({ title, status, tasks, onEdit, onDelete, showAddButton, onAdd }) => {
  // Filter tasks by status
  const filtered = tasks.filter((task) => task.status === status);

  return (
    <div className="column">
      {/* Header with color matching your design usually goes here */}
      <div className={`column-header header-${status}`}>{title}</div>

      <div className="column-body">
        {filtered.length === 0 && <p className="empty-msg">No tasks</p>}

        {filtered.map((task) => (
          <TaskTicket 
            key={task.id} 
            task={task} 
            onEdit={() => onEdit(task)}    // Pass the specific task to parent
            onDelete={() => onDelete(task.id)} // Pass ID to parent
          />
        ))}
        
        {/* Render "Add Button" only if requested (usually for To Do column) */}
        {showAddButton && (
          <div className="add-task-trigger" onClick={onAdd}>
            <span>Add Task</span>
            <span className="plus-icon">+</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksColumn;