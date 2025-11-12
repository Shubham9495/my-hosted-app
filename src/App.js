import React from "react";

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #a2c2e2, #f2e6ff)"
    }}>
      <h1 style={{ fontSize: "3rem", color: "#333" }}>🚀 Welcome to My React App! Twinkle and Jiya---- save the date !!!</h1>
      <p style={{ fontSize: "1.25rem", color: "#555" }}>
        Built and hosted for free — in minutes.
      </p>
      <a
        href="https://react.dev"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          background: "#0078ff",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
