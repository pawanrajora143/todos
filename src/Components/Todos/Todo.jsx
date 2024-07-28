import React, { useEffect, useRef, useState } from "react";


const  getDataFromLs =()=>{
const data = localStorage.getItem("data")
if(data){
  return JSON.parse(data)  
}
else{
  return []
}
}

const Todo = () => {
  const [todos, updateTodo] = useState(getDataFromLs());

  const inputRef = useRef();

  const [addButtonDisable, updateButtonDisable] = useState(true);


  useEffect(()=>{
  localStorage.setItem("data" , JSON.stringify(todos))
  }, [todos])

  // useEffect(()=>{
  //   localStorage.setItem("data" , JSON.stringify(todos))
  //   }, [todos])

  function getValue() {
    const item = {
      id: "" + Date.now(),
      text: inputRef.current.value,
      status: "active",
      editing:false
    };

    const cloneItem = [...todos];
    cloneItem.push(item);
    updateTodo(cloneItem);
    inputRef.current.value = "";
    updateButtonDisable(true);
  }

  function chnageActiveClass(e) {
    const id = e.target.id.split("--")[1];
    // console.log(findId)

    const index = todos.findIndex((item) => item.id == id);
    console.log(index);
    const cloneStatusId = { ...todos[index], status: "done" };
    const cloneAllList = [...todos];
    cloneAllList[index] = cloneStatusId;
    updateTodo(cloneAllList);
  }


  function changeButtonName(e){

    const id = e.target.id.split("--")[1]
    // console.log(id)

    const index = todos.findIndex((item) => item.id === id)
    // console.log(index)

    const cloneIndex = {...todos [index] } 
    // cloneIndex.editing  cloneIndex.editing


    if(cloneIndex.editing){
      const inputId = document.getElementById("input-btn--"+ id)
      console.log(inputId.value)
      cloneIndex.text = inputId.value

      
    }


    if(cloneIndex.editing === true){
      cloneIndex.editing = false;

    }
    else{
      cloneIndex.editing = true;
    }
    console.log(cloneIndex.editing)
    const allClone = [...todos]
    allClone[index] = cloneIndex
    updateTodo(allClone)

 
    


  }




  function list() {
    return (
      <ul>
        {todos.map((item) => {
          const { id, text, status , editing } = item;
          return (
            <li key={id} className={status == "active" ? "active" : "done"}>
              
              { editing ?  <input type="text" className="input_design" defaultValue={text} id={"input-btn--" +id}/>  : <p>{text}</p>}
              
             
              <div className="btns">
                <button
                  id={"btn-status--" + id}
                  onClick={(e) => chnageActiveClass(e)}
                  disabled={status === "done" || editing === true}
                >
                  {status}
                </button>
                <button id={"edit-btn--" + id}
                onClick={(e) => changeButtonName(e)}
                 disabled={status === "done" }> {editing ? "Edit Done" : "Edit"}  </button>
                <button
                  id={"btn-delete--" + id}
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  



  function handleDelete(e) {
    const id = e.target.id.split("--")[1];
    const newList = todos.filter((item) => item.id !== id);
    updateTodo(newList);
  }

  function handleInputTextChange(event) {
    let inputText = event.target.value.trim().length;

    if (inputText > 0) updateButtonDisable(false);
    else {
      updateButtonDisable(true);
    }
  }


  // function handleDelete(e) {
  //   const id = e.target.id.split("--")[1];
  //   const newList = todos.filter((item) => item.id !== id);
  //   updateTodo(newList);
  // }

  // function handleInputTextChange(event) {
  //   let inputText = event.target.value.trim().length;

  //   if (inputText > 0) updateButtonDisable(false);
  //   else {
  //     updateButtonDisable(true);
  //   }
  // }

    // function handleDelete(e) {
  //   const id = e.target.id.split("--")[1];
  //   const newList = todos.filter((item) => item.id !== id);
  //   updateTodo(newList);
  // }

  // function handleInputTextChange(event) {
  //   let inputText = event.target.value.trim().length;

  //   if (inputText > 0) updateButtonDisable(false);
  //   else {
  //     updateButtonDisable(true);
  //   }
  // }




  return (
    <div className="addtodos">
      <h1>Todos Task</h1>
      <div className="input-design">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter Your Text"
          onChange={handleInputTextChange}
        />
        <button onClick={() => getValue()} disabled={addButtonDisable}>
          Add
        </button>
      </div>

      {list()}
    </div>
  );
};

export default Todo;
