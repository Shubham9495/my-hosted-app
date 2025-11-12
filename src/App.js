import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import BookingPage from "./pages/BookingPage";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (role, phoneNumber) => {
    setUser({ role, phoneNumber });
  };

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "owner" ? (
                <OwnerDashboard user={user} onLogout={handleLogout} />
              ) : (
                <BookingPage user={user} onLogout={handleLogout} />
              )
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
