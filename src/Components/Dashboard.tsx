import { useState, useEffect } from "react";
import TodoItem from "../Components2/Todo-Items";
import axios from "axios";
import Loader from "../Components2/Loader";
import Snackbar from '@mui/material/Snackbar';



const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build a Todo App", completed: true },
  { id: 3, text: "Deploy to Netlify", completed: false },
];

const Dashboard = () => {

  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [message, setMessage] = useState<string>('');
  const apiUrl:string = import.meta.env.VITE_API_URL;




  const handleClick = () => {
    setOpen(true);
  };



  const handleClose = (event:Event|undefined, reason:string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const handleDelete = async (id: number) => {

     setLoader(true)

     try {
        const response = await axios.delete(apiUrl+`/Todos/${id}`);

        setMessage("");

        setLoader(false);

        handleClick()

        console.log('Item deleted successfully:', response.data);

      } catch (error) {

        if (axios.isAxiosError(error)) {

          console.error('Axios error:', error.response?.data || error.message);

          setMessage("");

          setLoader(false);

          handleClick()

        } else {

          console.error('Unexpected error:', error);

          setMessage("");

          setLoader(false);

          handleClick()

        }
      }

    // setTodos(todos.filter((todo) => todo.id !== id));
  };




  const handleComplete = async (id: number) => {

    let text:string|null = null;
    
    todos.forEach((todo)=>{
      if(todo.id == id){
        text = todo.text;
      }
    })

    setLoader(true)

       try {

        const response = await axios.patch(apiUrl+`/Todos/${id}`, {
          title: text,
          completed: true,
        });


        setMessage("");

        setLoader(false);

        handleClick()

        console.log('Item updated successfully:', response.data);

      } catch (error) {

        if (axios.isAxiosError(error)) {

          console.error('Axios error:', error.response?.data || error.message);

          
          setMessage("");

          setLoader(false);

          handleClick()


        } else {

          console.error('Unexpected error:', error);

          
          setMessage("");

          setLoader(false);

          handleClick()

        }

      }




    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, completed: true } : todo
    //   )
    // );
  };



  const handleEdit = async (id: number, newText: string) => {

      setLoader(true)

       try {

        const response = await axios.patch(apiUrl+`/Todos/${id}`, {
          title: newText,
          completed: false,
        });


        setMessage("");

        setLoader(false);

        handleClick()

        console.log('Item updated successfully:', response.data);

      } catch (error) {

        if (axios.isAxiosError(error)) {

          console.error('Axios error:', error.response?.data || error.message);

          
          setMessage("");

          setLoader(false);

          handleClick()


        } else {

          console.error('Unexpected error:', error);

          
          setMessage("");

          setLoader(false);

          handleClick()

        }

      }


    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, text: newText } : todo
    //   )
    // );
  };



  const handleAddTodo = async () => {

    if (newTodoText.trim() === "") return;

      setLoader(true)

       try {
        const response = await axios.post(apiUrl+'/Todos', {
          title: newTodoText,
        });

        setMessage("");

        setLoader(false);

        handleClick()

        console.log('Item created successfully:', response.data);

      } catch (error) {

        if (axios.isAxiosError(error)) {

          console.error('Axios error:', error.response?.data || error.message);

          setMessage("");

          setLoader(false);

          handleClick()

        } else {

          console.error('Unexpected error:', error);

          setMessage("");

          setLoader(false);

          handleClick()


        }

      }


    // const newTodo = {
    //   id: Date.now(),
    //   text: newTodoText.trim(),
    //   completed: false,
    // };
    // setTodos([newTodo, ...todos]);
    // setNewTodoText("");
    // setShowCreateForm(false);
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


  
  const fetchData = async () => {

    setLoader(true)

    try {

      const response = await axios.get(apiUrl+`/Todos`);

      console.log('Fetched data:', response.data);

      setMessage("");

      setLoader(false);

      handleClick()

    } catch (error) {

      if (axios.isAxiosError(error)) {

        console.error('Axios error:', error.response?.data || error.message);

        setMessage("");

        setLoader(false);

        handleClick()


      } else {

        console.error('Unexpected error:', error);

        setMessage("");

        setLoader(false);

        handleClick()

      }

    }


  };


  useEffect(()=>{

    fetchData();

  },[])




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
      {loader && <Loader/>}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
        />
    </div>
  );
};

export default Dashboard;
