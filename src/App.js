import React from "react";
import logo from "./logo.png"; // 👈 Place your image in the src/ folder (e.g., src/logo.png)

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #a2c2e2, #f2e6ff)",
        textAlign: "center",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "150px",
          height: "150px",
          marginBottom: "1.5rem",
          borderRadius: "50%",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      />
      <h1 style={{ fontSize: "3rem", color: "#333" }}>🚀 Welcome to My React App!</h1>
      <p style={{ fontSize: "1.25rem", color: "#555", maxWidth: "500px" }}>
        Built and hosted for free — now with an image!
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
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
