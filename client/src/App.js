import { useEffect, useState } from "react";
import "./index.css";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
      );
      const todos = await response.json();
      setTodos(todos);
    };

    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault(); //prevent page refresh on submiting form

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/todos`, {
      method: "POST",
      body: JSON.stringify({ title: content }),
      headers: { "Content-type": "application/json" },
    });

    const newTodo = await res.json();

    setContent("");
    setTodos([...todos, newTodo]);
  };

  return (
    <main className="App">
      <div className="container">
        <h1 className="title">Task Manager</h1>

        <form className="todo-form" onSubmit={createNewTodo}>
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new todo..."
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="todo-button">
            Add Todo
          </button>
        </form>

        {todos.length > 0 &&
          todos.map((todo, idx) => (
            <Todo key={todo.id ?? idx} todo={todo} setTodos={setTodos} />
          ))}
        {todos.length === 0 && <p className="no-todos">No todos available</p>}
      </div>
    </main>
  );
}
