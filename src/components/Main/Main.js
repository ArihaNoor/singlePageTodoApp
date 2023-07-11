import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Main.css";

const Main = () => {
  const initialTodoData = [
    {
      id: 123456,
      text: "Task 1",
    },
    {
      id: 654321,
      text: "Task 2",
    },
    {
      id: 345678,
      text: "Task 3",
    },
  ];

  const [todos, setTodos] = useState(initialTodoData);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    const newID = Math.floor(100000 + Math.random() * 900000);
    const newTodo = {
      id: newID,
      text: inputValue,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (delId) => {
    setTodos(todos.filter((todo) => todo.id !== delId));
  };

  const updateTodo = (updateId) => {
    let txt;
    const obj = todos.map((todo) => {
      if (todo.id === updateId) {
        txt = todo.text;
      }
      return todo;
    });

    let input = document.getElementById("input");
    input.value = txt;
    return txt;
  };

  const updateData = (updateId) => {
    let inputValue = document.getElementById("input").value;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updateId) {
        return {
          ...todo,
          text: inputValue,
        };
      }
      return todo;
    });
  
    setTodos(updatedTodos);
    setInputValue("");
  };

  return (
    <div id="main">
      <input
        type="text"
        placeholder="Add Todo"
        id="input"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button id="btn-add" onClick={addTodo}>
        Add
      </button>
      <div id="table">
        <table>
          <thead>
            <tr>
              <th>Todo Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td onDoubleClick={() => updateTodo(todo.id)}>{todo.text}</td>
                  <td>
                    <button id="btn-edit" onClick={() => updateData(todo.id)}>
                      <i className="fa fa-regular fa-pen-to-square"></i>
                    </button>
                    <button id="btn-delete">
                      <i
                        className="fa-solid fa-eraser"
                        onClick={() => deleteTodo(todo.id)}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Todos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
