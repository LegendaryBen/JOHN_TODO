import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Create Account</h2>

        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Create a password" required />

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;