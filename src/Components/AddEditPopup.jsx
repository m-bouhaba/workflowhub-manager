import React, { useState, useEffect } from 'react';
import '../Style/AddEditPopup.css';

const AddEditPopup = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      // Edit Mode
      setTitle(taskToEdit.title || '');
      setPriority(taskToEdit.priority || 'medium');
      setStatus(taskToEdit.status || 'todo');
      setDescription(taskToEdit.description || '');
    } else {
      // Add Mode
      setTitle('');
      setPriority('medium');
      setStatus('todo');
      setDescription('');
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      id: taskToEdit ? taskToEdit.id : null,
      title: title,
      priority: priority,
      status: status,
      description: description,
      order: taskToEdit ? taskToEdit.order : 0
    };
    onSave(taskData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Close Button added here */}
        <button className="close-icon-btn" onClick={onClose}>&times;</button>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-group half-width">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="submit" className="add-btn">
              {taskToEdit ? 'EDIT' : 'ADD'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddEditPopup;