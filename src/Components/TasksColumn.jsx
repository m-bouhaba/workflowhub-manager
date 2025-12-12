import React from "react";
import TaskTicket from "./TaskTicket";
import "../Style/TasksColumn.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const TasksColumn = ({ title, status, tasks, onEdit, onDelete, showAddButton, onAdd }) => {
  const filtered = tasks
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="column">
      <div className="column-header">{title}</div>
      {/* Add Button at the bottom of the list if enabled */}
      {showAddButton && (
        <div className="add-task-btn" onClick={onAdd}>
          <span>Add Task</span>
          <div className="plus-box">+</div>
        </div>
      )}
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="column-body"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filtered.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style, marginBottom: "10px" }}
                  >
                    <TaskTicket
                      task={task}
                      onEdit={() => onEdit(task)}
                      onDelete={() => onDelete(task.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}


          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TasksColumn;