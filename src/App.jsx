import React, { useEffect, useState } from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css'; // Importando o css
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/tasks"; //Improtando as Tasks
import TaskDetails from "./components/TaskDetails";

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Jogar CS',
      completed: false,
    },
    {
      id: '2',
      title: 'Jogar valorant',
      completed: false,
    }
  ])

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) return {
        ...task, completed: !task.completed
      }

      return task;
    });

    setTasks(newTasks);
  };

  //ADD TASK
  const handleTaskAddition = (taskTitle) => {
    const newTask = [ ...tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }]

    setTasks(newTask);
  }


  //REMOVE TASK
  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(tasks => tasks.id !== taskId)
    setTasks(newTasks)
  }

  return (
    <Router>
      <div className="container">
        <Header/>
        <Route 
          path="/" 
          exact 
          render={() => (
            <>
              <AddTask handleTaskAddition={handleTaskAddition} />
              <Tasks 
                tasks={tasks} 
                handleTaskClick={handleTaskClick} 
                handleTaskDeletion={handleTaskDeletion}
              />  
            </>
          )}
        />

        <Route path="/:taskTitle" exact component={TaskDetails}/>
      </div>
    </Router>      
  );
};

export default App;