
import { useState } from 'react';
import TaskModal from './Components/AddEditPopup';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); 

  const handleAddNew = () => {
    setCurrentTask(null); 
    setIsModalOpen(true);
  };

  const handleEditTicket = (task) => {
    setCurrentTask(task); // Fill form with task data
    setIsModalOpen(true);
  };

  const saveTask = (taskData) => {
    if (taskData.id) {
      console.log("Updating task:", taskData);
    } else {
      console.log("Creating new task:", taskData);
    }
    
    setIsModalOpen(false); 
  };

  return (
    <div className="App">
      <button onClick={handleAddNew} style={{padding: '20px', margin: '50px'}}>
        + Add New Ticket
      </button>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={saveTask}
        taskToEdit={currentTask}
      />
    </div>
  );
}

export default App;