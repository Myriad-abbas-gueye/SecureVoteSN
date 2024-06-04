import './App.css';
import React from 'react';
import Navbar from "./component/Navbar/Navbar";
import Intro from "./component/Intro/Intro";

function App() {
  return (
    <div
      className="App"
      style={{
        color:  "white",
      }}
    >
      <Navbar />
      <Intro/>
    </div>
  );
}

export default App;
