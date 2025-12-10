import React from "react";
import TaskTicket from "./TaskTicket";
import "../Style/TasksColumn.css";

const TasksColumn = ({ title, status, tasks }) => {
  // Filtrage selon le statut (todo / in-progress / done)
  const filtered = tasks.filter(task => task.status === status);

  return (
    <div className="column">
      <div className="column-header">{title}</div>

      <div className="column-body">
        {filtered.length === 0 && <p className="empty">No tasks</p>}

        {filtered.map(task => (
          <TaskTicket key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksColumn;
