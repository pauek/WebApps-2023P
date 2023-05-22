import { useState, useRef } from "react";

import "./TodoList.css";

export default function TodoList() {
  const ref = useRef();
  const [todos, setTodos] = useState([]);

  const addTodo = (ev) => {
    ev.preventDefault();
    const what = ref.current.value;
    setTodos((list) => [...list, { what, done: false }]);
    ref.current.value = "";
  };

  const toggleTodo = (index) => () =>
    setTodos((todos) =>
      todos.map((todo, i) => ({
        ...todo,
        done: i === index ? !todo.done : todo.done,
      }))
    );

  const removeChecked = () => setTodos((todos) => todos.filter((t) => !t.done));
  const removeAll = () => setTodos([]);

  return (
    <div className="todo-list">
      <form onSubmit={addTodo}>
        <input ref={ref} type="text" placeholder="What needs to be done?"/>
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={`${index}-${todo.what}`}
            onClick={toggleTodo(index)}
            className={todo.done ? "item checked" : "item"}
          >
            <input type="checkbox" checked={todo.done} readOnly />
            <span className="what">{todo.what}</span>
          </li>
        ))}
      </ul>
      <button onClick={removeChecked}>Remove Checked</button>
      <button onClick={removeAll}>Remove All</button>
    </div>
  );
}
