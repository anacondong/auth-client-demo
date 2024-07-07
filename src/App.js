import React, { useState, useEffect } from "react";
import keycloak from "./keycloak";
import Login from "./Login";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("react-token");
    if (token) {
      keycloak.init({ token }).then((authenticated) => {
        setAuthenticated(authenticated);
      });
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    keycloak.logout();
  };

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This page is protected and requires authentication.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default App;
