import "./Login.css";
import collegeLogo from "../../assets/images/college-logo.png";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">

        <img
          src={collegeLogo}
          alt="College Logo"
          className="college-logo"
        />

        <h1>Kommuri Pratap Reddy Institute of Technology</h1>

        <h2>AI-Powered College ERP System</h2>

        <p className="subtitle">
          Please login to continue
        </p>

        <form>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <div className="remember-container">

            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>

          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="footer">
          © 2026 KPRIT | AI-Powered College ERP System
        </p>

      </div>
    </div>
  );
}

export default Login;