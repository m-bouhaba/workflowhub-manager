import { useEffect, useState } from "react";
import TasksColumn from "../Components/TasksColumn";
import axios from "axios";

import "../Style/Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };
  // Fetch tasks at component mount
  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="home">
      <div className="columns">

        <TasksColumn 
          title="To Do" 
          status="todo" 
          tasks={tasks}
        />

        <TasksColumn 
          title="In Progress" 
          status="in-progress" 
          tasks={tasks}
        />

        <TasksColumn 
          title="Done" 
          status="done" 
          tasks={tasks}
        />

      </div>
    </div>
  );
};

export default Home;
