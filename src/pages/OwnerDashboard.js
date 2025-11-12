import React from "react";

function OwnerDashboard({ user, onLogout }) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f3e5f5",
        minHeight: "100vh",
      }}
    >
      <h2>Welcome, Salon Owner ({user.phoneNumber})</h2>
      <button
        onClick={onLogout}
        style={{ position: "absolute", right: 20, top: 20 }}
      >
        Logout
      </button>

      <h3>All Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table
          style={{
            margin: "auto",
            borderCollapse: "collapse",
            width: "80%",
            background: "#fff",
          }}
        >
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td>{b.name}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OwnerDashboard;
