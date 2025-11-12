import React, { useState } from "react";
import {
  auth,
  googleProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  db,
} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function LoginPage({ onLogin }) {
  const [loginType, setLoginType] = useState("phone");

  // Phone login fields
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Email login extra info
  const [extraInfoNeeded, setExtraInfoNeeded] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [custPhone, setCustPhone] = useState("");

  // Owner login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* --------------------------- PHONE LOGIN --------------------------- */

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!phone) {
      alert("Enter valid phone number");
      return;
    }

    const fullPhone = phone.startsWith("+") ? phone : "+91" + phone;

    setupRecaptcha();
    setLoading(true);

    try {
      const result = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert("OTP Sent!");
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) return alert("Enter OTP");

    try {
      await confirmationResult.confirm(otp);
      alert("Login Success!");
      onLogin("customer", {
        phone,
        name: "Customer",   // or ask name after OTP
      });
    } catch (e) {
      alert("Invalid OTP");
    }
  };

  /* --------------------------- GOOGLE EMAIL LOGIN --------------------------- */

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      let result = await signInWithPopup(auth, googleProvider);
      let user = result.user;

      // Check if user already exists
      const ref = doc(db, "customers", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        // returning user → login directly
        onLogin("customer", {
            email: user.email,
            name: snap.data().name,
            phone: snap.data().phone,
          });
      } else {
        // First-time → ask for name + phone
        setGoogleUser(user);
        setExtraInfoNeeded(true);
      }
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveGoogleExtraInfo = async () => {
    if (!fullName || !custPhone) {
      alert("Enter all fields");
      return;
    }

    try {
      await setDoc(doc(db, "customers", googleUser.uid), {
        name: fullName,
        phone: custPhone,
        email: googleUser.email,
        createdAt: new Date(),
      });

      alert("Profile Saved!");
      onLogin("customer", {
        email: googleUser.email,
        name: fullName,
        phone: custPhone,
      });
    } catch (e) {
      alert("Failed to save details");
    }
  };

  /* --------------------------- OWNER LOGIN --------------------------- */

  const handleOwnerLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      alert("Owner Login Success");
      onLogin("owner", {
        name: "Admin",
        email: "admin@example.com",
      });
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>💇‍♀️ Salon Booking Login</h1>

      {/* -------------------- LOGIN TYPE SELECTOR -------------------- */}
      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="radio"
            checked={loginType === "phone"}
            onChange={() => setLoginType("phone")}
          />
          Phone Login
        </label>

        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            checked={loginType === "email"}
            onChange={() => setLoginType("email")}
          />
          Email Login
        </label>

        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            checked={loginType === "owner"}
            onChange={() => setLoginType("owner")}
          />
          Owner Login
        </label>
      </div>

      {/* -------------------- PHONE LOGIN UI -------------------- */}
      {loginType === "phone" && (
        <>
          {!confirmationResult ? (
            <form onSubmit={sendOtp} style={{ marginTop: "20px" }}>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: "10px" }}
              />
              <br />
              <button style={{ marginTop: "20px" }}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} style={{ marginTop: "20px" }}>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ padding: "10px" }}
              />
              <br />
              <button style={{ marginTop: "20px" }}>Verify OTP</button>
            </form>
          )}
        </>
      )}

      {/* -------------------- EMAIL LOGIN WITH GOOGLE -------------------- */}
      {loginType === "email" && !extraInfoNeeded && (
        <button
          onClick={handleGoogleLogin}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {loading ? "Loading..." : "Login with Google"}
        </button>
      )}

      {/* FIRST-TIME EMAIL USER EXTRA INFO */}
      {loginType === "email" && extraInfoNeeded && (
        <div style={{ marginTop: "20px" }}>
          <h3>Complete Your Profile</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <br />

          <input
            type="tel"
            placeholder="Phone Number"
            value={custPhone}
            onChange={(e) => setCustPhone(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <br />

          <button onClick={saveGoogleExtraInfo}>Save & Continue</button>
        </div>
      )}

      {/* -------------------- OWNER LOGIN UI -------------------- */}
      {loginType === "owner" && (
        <form onSubmit={handleOwnerLogin} style={{ marginTop: "20px" }}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px" }}
          />
          <br />

          <button style={{ marginTop: "20px" }}>Login</button>
        </form>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}

export default LoginPage;
