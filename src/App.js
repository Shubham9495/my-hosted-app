import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  // Firebase persists Google login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ role: "customer", email: firebaseUser.email });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = (role, data) => {
    setUser({ role, ...data });
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
