import React, { useState, useEffect } from 'react';
import '../Style/AddEditPopup.css';

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setPriority(taskToEdit.priority || 'medium');
      setStatus(taskToEdit.status || 'todo');
      setDescription(taskToEdit.description || '');
    } else {
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
        <div className="modal-header">
          <h2>{taskToEdit ? 'Edit Ticket' : 'Add Ticket'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Enter task title..."
            />
          </div>

          {/* Priority */}
          <div className="form-group">
            <label>Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Enter details..."
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="submit" className="add-btn">
              {taskToEdit ? 'SAVE CHANGES' : 'ADD TASK'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskModal;