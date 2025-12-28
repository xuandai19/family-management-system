import { useState } from "react";

export default function Login({ switchToRegister }) {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>

      <form className="login-form">
        <input
          type="text"
          placeholder="Email or Username"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button
          type="button"
          className="auth-button"
          onClick={() => alert("Login (chưa API)")}
        >
          Login
        </button>
      </form>

      <p className="switch-text">
        Don't have an account?{" "}
        <span onClick={switchToRegister}>Register</span>
      </p>
    </div>
  );
}
