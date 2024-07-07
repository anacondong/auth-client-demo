import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./App.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(undefined);
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8180/realms/quickstart/protocol/openid-connect/token",
        new URLSearchParams({
          client_id: "authz-servlet",
          client_secret: "secret",
          username: username,
          password: password,
          grant_type: "password",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token } = response.data;
      localStorage.setItem("react-token", access_token);
      localStorage.setItem("react-refresh-token", refresh_token);
      onLogin();
      setErrorMsg("OK !!");
      history.push("/home");
    } catch (error) {
      setErrorMsg("Login failed");
      console.error("Login failed", error);
    }
  };

  return (
    <div className="center-div">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
