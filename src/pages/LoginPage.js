import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";

function LoginPage({ onLogin }) {
  const [role, setRole] = useState("customer");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // For owner login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
        }
      );
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert("Enter valid phone number");
      return;
    }

    const fullPhone = phone.startsWith("+") ? phone : "+91" + phone; // change +91 to your country code
    setupRecaptcha();
    setLoading(true);

    try {
      const result = await signInWithPhoneNumber(
        auth,
        fullPhone,
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      alert("✅ Phone verified successfully!");
      onLogin("customer", phone);
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOwnerLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      alert("✅ Owner logged in!");
      onLogin("owner", "admin");
    } else {
      alert("❌ Invalid username or password");
    }
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

      {/* Role Selector */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="radio"
            value="customer"
            checked={role === "customer"}
            onChange={() => {
              setRole("customer");
              setConfirmationResult(null);
            }}
          />
          Customer
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="owner"
            checked={role === "owner"}
            onChange={() => {
              setRole("owner");
              setConfirmationResult(null);
            }}
          />
          Owner
        </label>
      </div>

      {/* Customer Login (OTP Flow) */}
      {role === "customer" && (
        <>
          {!confirmationResult ? (
            <form onSubmit={sendOtp} style={{ marginTop: "1rem" }}>
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
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} style={{ marginTop: "1rem" }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "220px",
                  marginBottom: "1rem",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#4caf50",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </>
      )}

      {/* Owner Login (Username + Password) */}
      {role === "owner" && (
        <form onSubmit={handleOwnerLogin} style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "220px",
              marginBottom: "1rem",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "220px",
              marginBottom: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#2196f3",
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
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}

export default LoginPage;
