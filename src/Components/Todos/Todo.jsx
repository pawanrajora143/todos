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
                <button id={'btn-delete--'+id} onClick={((e)=>handleDelete(e))}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }


  function handleDelete(e){

    const id = e.target.id.split("--")[1];
     const newList = todos.filter((item)=>item.id !== id)
     updateTodo(newList)


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
