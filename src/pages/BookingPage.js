import React, { useState } from "react";

function BookingPage({ user, onLogout }) {
  const [service, setService] = useState("Haircut");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = () => {
    if (!date || !time) {
      alert("Please select date and time!");
      return;
    }
    const booking = { name: user.phoneNumber, service, date, time };
    const oldBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...oldBookings, booking]));
    alert("Booking confirmed!");
  };

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        background: "#fff0f6",
        minHeight: "100vh",
      }}
    >
      <h2>Welcome, {user.phoneNumber}</h2>
      <button
        onClick={onLogout}
        style={{ position: "absolute", right: 20, top: 20 }}
      >
        Logout
      </button>

      <h3>Book Your Appointment</h3>
      <div style={{ margin: "1rem" }}>
        <label>Service: </label>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option>Haircut</option>
          <option>Facial</option>
          <option>Manicure</option>
          <option>Pedicure</option>
        </select>
      </div>

      <div style={{ margin: "1rem" }}>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div style={{ margin: "1rem" }}>
        <label>Time Slot: </label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Select...</option>
          <option>10:00 AM</option>
          <option>12:00 PM</option>
          <option>2:00 PM</option>
          <option>4:00 PM</option>
          <option>6:00 PM</option>
        </select>
      </div>

      <button
        onClick={handleBooking}
        style={{
          background: "#e91e63",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingPage;
