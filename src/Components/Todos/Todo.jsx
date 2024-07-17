import React, { useRef, useState } from "react";

const Todo = () => {
  const [todos, updateTodo] = useState([
    { id: "" + Date.now(), text: "Default", status: "active" },
  ]);

  const inputRef = useRef();


  const [addButtonDisable , updateButtonDisable] = useState(true);

  function getValue() {

    const item = {
        id: "" + Date.now(),
        text:inputRef.current.value,
        status:"active"
    }

    const cloneItem = [...todos]
    cloneItem.push(item)
    updateTodo(cloneItem)
    inputRef.current.value = ""
    updateButtonDisable(true)

    
  }

  function list() {
    return (
      <ul>
        {todos.map((item) => {
          const { id, text, status } = item;
          return (
            <li key={id}>
              <p>{text}</p>
              <div className="btns">
                <button>{status}</button>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }



  function handleInputTextChange(event){
    
    let inputText = event.target.value.trim().length

    if(inputText > 0)
        updateButtonDisable(false)
    else{
        updateButtonDisable(true)
    
      }

  }

 

  return (
    <div className="addtodos">
      <h1>Todos Task</h1>
      <div className="input-design">
        <input type="text" ref={inputRef} placeholder="Enter Your Text" onChange={handleInputTextChange} />
        <button onClick={() => getValue()} disabled={addButtonDisable} >Add</button>
      </div>

      {list()}
    </div>
  );
};

export default Todo;
