import { Link } from "react-router-dom";
import Loader from "../Components2/Loader";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {

  const [loader, setLoader] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const apiUrl:string = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();


  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event:Event|undefined, reason:string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  
  const createUser = async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if(email == '' || password == ''){
       handleClick()
       setMessage("Input fields must not be empty!")
       return;
    }

    setLoader(true)

     try {

        const response = await axios.post(apiUrl+'/Auth/register', {
          username: email,
          password: password,
        });

        setLoader(false)

        handleClick()

        setMessage("User has been created!")

        console.log('User created:', response.data);

        navigate('/login')

      } catch (error) {

        setLoader(false)

        handleClick()

        setMessage("An error occured while trying to create an account. Make sure Input fields are not empty");

        console.error('Error creating user:', error);

      }
  }


  return (
    <div className="signup-container">
      <div className="signup-box">
          <form className="signup-form" onSubmit={createUser}>
            <h2>Create Account</h2>

            <label htmlFor="email">Username</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

            <button type="submit">Sign Up</button>

            <p className="login-link">
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
        </form>
        {loader && <Loader/>}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
        />
      </div>
    </div>
  );
};

export default SignUpForm;