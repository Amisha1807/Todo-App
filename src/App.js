import './App.css';
import React,{useEffect, useState} from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs';

function App() {
  const[iscompletescreen,setIscompletescreen]=useState(false)
  const [alltodos,setAlltodos]=useState([]);
  const [newTitle,setNewTitle]=useState('');
  const [newD,setNewD]=useState('');
  const [completedTodos, setCompletedTodos] = useState ([]);

const handlealltodo=()=>{
  let newtodo={
    title:newTitle,
    desription:newD
  }
  let updatedtodoarr=[...alltodos];
  updatedtodoarr.push(newtodo);
  setAlltodos(updatedtodoarr);
  localStorage.setItem('todolist',JSON.stringify(updatedtodoarr))
}
useEffect(()=>{
   let savedtodo=JSON.parse(localStorage.getItem('todolist'))
   if(savedtodo){
    setAlltodos(savedtodo);
   }
},[])

const handleToDoDelete = index => {
  let reducedTodos = [...alltodos];
  reducedTodos.splice (index,1);
  localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
  setAlltodos (reducedTodos);
};

const handleCompletedTodoDelete = index => {
  let reducedCompletedTodos = [...completedTodos];
  reducedCompletedTodos.splice (index);
  localStorage.setItem (
    'completedTodos',
    JSON.stringify (reducedCompletedTodos)
  );
  setCompletedTodos (reducedCompletedTodos);
};

const handleComplete = index => {
  const date = new Date ();
  var dd = date.getDate ();
  var mm = date.getMonth () + 1;
  var yyyy = date.getFullYear ();
  var hh = date.getHours ();
  var minutes = date.getMinutes ();
  var ss = date.getSeconds ();
  var finalDate =
    dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

  let filteredTodo = {
    ...alltodos[index],
    completedOn: finalDate,
  };

  let updatedCompletedList = [...completedTodos, filteredTodo];
  console.log (updatedCompletedList);
  setCompletedTodos (updatedCompletedList);
  localStorage.setItem (
    'completedTodos',
    JSON.stringify (updatedCompletedList)
  );
  handleToDoDelete (index);
};

  return (
    <div className="App">
      <h1>Welcome to the ToDo App</h1>
      <h1>My ToDo's</h1>
      <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
               <label>Title</label>
               <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?"/>
            </div>
            <div className="todo-input-item">
               <label>Descrition</label>
               <input type="text" value={newD} onChange={(e)=>setNewD(e.target.value)} placeholder="What's the task description?"/>
            </div>
            <div className="todo-input-item">
               <button type="button"  onClick={handlealltodo}className="primaryBtn">Add</button>
            </div>
          </div>
          <div className="btn-area">
            <button className={`secondarybtn ${iscompletescreen===false && 'active'}`} onClick={()=>setIscompletescreen(false)}>Todo</button>
            <button className={`secondarybtn ${iscompletescreen===true && 'active'}`} onClick={()=>setIscompletescreen(true)}>Completed</button>
          </div>
          <div className="todo-list">
          {iscompletescreen === false &&
            alltodos.map((item,index)=>(
              
                <div className="todo-list-item" key={index}>
              <div>
                 <h3>{item.title}</h3>
                 <p>{item.desription}</p>
              </div>
              <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete (index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete (index)}
                  />
                </div>
            </div>

            ))}

{iscompletescreen === true &&
            completedTodos.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed at: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete (index)}
                  />
                </div>
              </div>
            ))}
            
          </div>
      </div>
    </div>
  );
}

export default App;
