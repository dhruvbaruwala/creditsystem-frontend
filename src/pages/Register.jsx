import { useState } from "react";
import { api } from "../api";
import styles from "../styles/Auth.module.css";

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password)
      return setError("Please fill all fields");
    setLoading(true);
    try {
      const data = await api.register(form);
      if (data.message === "Registration successful") {
        setMsg("Registered! You got 10 free credits. Redirecting to login...");
        setTimeout(onLogin, 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Cannot connect to API");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #ff6584, #cc3f5a)",
              borderRadius: 14,
              marginBottom: 14,
              boxShadow: "0 4px 14px rgba(255,101,132,0.35)",
            }}
          >
            <span style={{ fontSize: 22 }}>🎉</span>
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif" }}>Create Account</h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "linear-gradient(135deg, #edfff9, #d4f8ef)",
              border: "1px solid #a3f0db",
              borderRadius: 20,
              padding: "4px 12px",
              marginTop: 8,
            }}
          >
            <span style={{ fontSize: 13 }}>✨</span>
            <span style={{ fontSize: 12, color: "#0a7c5c", fontWeight: 600 }}>
              Get 10 free credits on signup
            </span>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {msg && <div className={styles.success}>{msg}</div>}

        <label style={labelStyle}>Full Name</label>
        <input
          placeholder="John Doe"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <label style={labelStyle}>Email</label>
        <input
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label style={labelStyle}>Password</label>
        <input
          placeholder="Create a strong password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            marginTop: 8,
            background: "linear-gradient(135deg, #6c63ff, #4c46cc)",
          }}
        >
          {loading ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span style={spinnerStyle} /> Creating account...
            </span>
          ) : (
            "Register — Get 10 Free Credits 🎁"
          )}
        </button>

        <p onClick={onLogin}>
          Already have an account? <strong>Sign in</strong>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#6b7280",
  marginBottom: 5,
  letterSpacing: 0.3,
  textTransform: "uppercase",
};

const spinnerStyle = {
  width: 16,
  height: 16,
  border: "2px solid rgba(255,255,255,0.3)",
  borderTop: "2px solid #fff",
  borderRadius: "50%",
  display: "inline-block",
  animation: "spin 0.7s linear infinite",
};
