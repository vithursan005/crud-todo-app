import { FaTrash } from "react-icons/fa";

const Todo = (props) => {
  const { todo, setTodos } = props;

  const updateTodo = async (todoId, todoStatus) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,
      {
        method: "PUT",
        body: JSON.stringify({ completed: !todoStatus }),
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    if (!res.ok) {
      console.error("Failed to update todo");
      return;
    }
    const updatedTodo = await res.json();

    setTodos((prev) =>
      prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
    );
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) return;

    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
  };

  return (
    <div className="todo">
      <p className="todo-title">{todo.title}</p>
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        className="todo-checkbox"
        onClick={() => updateTodo(todo._id, todo.completed)}
      />

      <button className="todo-delete" onClick={() => deleteTodo(todo._id)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default Todo;
