import React from "react";
import TaskTicket from "./TaskTicket";
import "../Style/TasksColumn.css";

const TasksColumn = ({ title, status, tasks, onEdit, onDelete, showAddButton, onAdd }) => {
  const filtered = tasks.filter((task) => task.status === status);

  return (
    <div className="column">
      <div className="column-header">{title}</div>
      {showAddButton && (
        <div className="add-task-btn" onClick={onAdd}>
          <span>Add Task</span>
          <img src="/icons8-add-50.png"  className="addIcon"/>
        </div>
      )}
      <div className="column-body">
        {filtered.map((task) => (
          <TaskTicket
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
        
        {showAddButton && (
          <div className="add-task-btn" onClick={onAdd}>
            <span>Add Task</span>
            <div className="plus-box">
                <p>+</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksColumn;