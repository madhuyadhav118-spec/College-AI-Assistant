import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import collegeLogo from "../../assets/images/college-logo.png";
import { login } from "../../services/authService";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const response = await login(email, password);

      console.log("Login Response:", response);

            // Save JWT Token
      localStorage.setItem("token", response.token);

      // Save User Information
      localStorage.setItem("user", JSON.stringify(response.user));

      const role = response.user.role;

      if (role === "ADMIN") {
        navigate("/admin");
      }
      else if (role === "FACULTY") {
        navigate("/faculty");
      }
      else if (role === "STUDENT") {
        navigate("/student");
      }
      else {
        alert("Unknown User Role");
      }

    } catch (err: unknown) {

      console.error(err);

      setError("Invalid Email or Password");

    } finally {

      setLoading(false);

    }

  };

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

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-container">

            <div className="remember-me">

              <input
                type="checkbox"
                id="remember"
              />

              <label htmlFor="remember">
                Remember Me
              </label>

            </div>

            <a
              href="#"
              className="forgot-password"
            >
              Forgot Password?
            </a>

          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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