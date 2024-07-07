import React from "react";

const Home = ({ username, roles, logout }) => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This page is protected and requires authentication.</p>
      <p>Username: {username}</p>
      <p>Roles: {roles.join(", ")}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
