import React, { useState, useEffect } from 'react';
import '../Style/AddEditPopup.css';

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      // EDIT 
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setDescription(taskToEdit.description);
    } else {
      // ADD 
      setTitle('');
      setPriority('medium');
      setStatus('todo');
      setDescription('');
    }
  }, [taskToEdit, isOpen]);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the task object
    const taskData = {
      id: taskToEdit ? taskToEdit.id : null, 
      title,
      priority,
      status, 
      description,
      order: taskToEdit ? taskToEdit.order : 1 //By Default 
    };

    onSave(taskData); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{taskToEdit ? 'Edit Ticket' : 'Add Ticket'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Title Input */}
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

          {/* Priority Dropdown */}
          <div className="form-group">
            <label>Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className={`priority-select ${priority}`} // Adds class for color logic
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              {/* Value matches JSON 'in-progress', Label is 'Doing' as requested */}
              <option value="in-progress">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Description Text Area */}
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="submit" className="add-btn">
              {taskToEdit ? 'SAVE CHANGES' : 'ADD'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskModal;