import { useState } from "react";
import TodoItem from "../Components2/Todo-Items";

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build a Todo App", completed: true },
  { id: 3, text: "Deploy to Netlify", completed: false },
];

const Dashboard = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const handleEdit = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setNewTodoText("");
    setShowCreateForm(false);
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "pending"
      ? !todo.completed
      : todo.completed
  );

  return (
    <div className="form-container dashboard">
      <div className="dashboard-header">
        <h2>User Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="top-bar">
        <button
          className="new-todo-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          + New Todo
        </button>
      </div>

      {showCreateForm && (
        <div className="create-todo-form">
          <input
            type="text"
            placeholder="Enter new todo..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      )}

      <div className="filter">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {filteredTodos.length ? (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
};

export default Dashboard;
