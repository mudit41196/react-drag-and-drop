import React, {useState} from "react";
import './App.css';

const tasks = [
  {
    name:"Learn Angular",
    category:"wip",
    bgcolor: "yellow"
  },
  {
    name:"React",
    category:"wip",
    bgcolor:"pink"
  },
  {
    name:"Vue",
    category:"complete",
    bgcolor:"skyblue"
  }
]

function App() {
  const [taskList, setTaskList] = useState(tasks);
  const tasksByCategory = {wip: [], complete: []};
  const onDragStart = (e, name) => {
    e.dataTransfer.setData("name", name);
  }
  taskList.forEach(t => {
    tasksByCategory[t.category].push(
      <div
        key={t.name}
        onDragStart={(e)=> onDragStart(e, t.name)}
        draggable={true} 
        style={{backgroundColor: t.bgcolor}}
        className="draggable"
      >
        {t.name}
      </div>
    );
  });
  const onDragOver =(e) => {
    e.preventDefault();
  }
  const onDrop = (e, category) => {
    debugger;
    const name = e.dataTransfer.getData("name");
    let newTasks = taskList.map(t => {
      if(t.name === name) {
        return {...t, category}
      }
      return t;
    });
    setTaskList(newTasks);
  }
  return (
    <div className="App">
      DRAG & DROP DEMO
      <div className="tasksContainer">
        <div className="wip" onDragOver={e => onDragOver(e)} onDrop={e => onDrop(e, "wip")}>
          <span>WIP</span>
          {tasksByCategory.wip}
        </div>
        <div className="extra"/>
        <div className="complete" onDragOver={e => onDragOver(e)} onDrop={e => onDrop(e, "complete")}>
          <span>Complete</span>
          {tasksByCategory.complete}
        </div>
      </div>
    </div>
  );
}

export default App;
