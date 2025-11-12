import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    onLogin(role, phone);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
        textAlign: "center",
      }}
    >
      <h1>💇‍♀️ Beauty Salon Booking</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "220px",
            marginBottom: "1rem",
          }}
        />
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="radio"
              value="customer"
              checked={role === "customer"}
              onChange={() => setRole("customer")}
            />
            Customer
          </label>{" "}
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="owner"
              checked={role === "owner"}
              onChange={() => setRole("owner")}
            />
            Owner
          </label>
        </div>
        <button
          type="submit"
          style={{
            background: "#e91e63",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
