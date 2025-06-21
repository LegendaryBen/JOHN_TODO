import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <form className="signup-form">
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />

          <button type="submit">Log In</button>

          <p className="login-link">
            Don't have an account? <Link to='/'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;