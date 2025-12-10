const TaskTicket = ({ task, onEdit, onDelete }) => {
  const getColorClass = () => {
    if (task.priority === "Urgent") return "pastel-pink";
    if (task.priority === "Medium") return "pastel-cream";
    return "pastel-green";
  };

  return (
    <div className={`task-card ${getColorClass()}`}>
      <div className="task-head">
        <h4 className="task-title">{task.title}</h4>
        <div>
          <button className="icon-btn" onClick={onEdit}>✏️</button>
          <button className="icon-btn" onClick={onDelete}>🗑️</button>
        </div>
      </div>

      <p className="task-desc">{task.description}</p>
      <p style={{ fontSize: "12px", marginTop: "6px", color: "#2e5f6f" }}>
        Priority: <b>{task.priority}</b>
      </p>
    </div>
  );
};

export default TaskTicket;
