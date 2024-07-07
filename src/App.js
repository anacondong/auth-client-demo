import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./Login";
import Home from "./Home";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("react-token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.preferred_username);
      setRoles(decodedToken.realm_access.roles);
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("react-token");
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.preferred_username);
    setRoles(decodedToken.realm_access.roles);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("react-token");
    setAuthenticated(false);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {authenticated ? (
            <Redirect to="/home" />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/home">
          {authenticated ? (
            <Home username={username} roles={roles} logout={logout} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
