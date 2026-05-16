import { useState } from "react";
import { api } from "../api";
import styles from "../styles/Auth.module.css";

export default function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return setError("Please fill all fields");
    setLoading(true);
    try {
      const data = await api.login({ email, password });
      if (data.token) {
        onLogin(data);
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Cannot connect to API. Is your API running?");
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
              background: "linear-gradient(135deg, #6c63ff, #4c46cc)",
              borderRadius: 14,
              marginBottom: 14,
              boxShadow: "0 4px 14px rgba(108,99,255,0.35)",
            }}
          >
            <span style={{ fontSize: 22 }}>⚡</span>
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif" }}>Welcome back</h2>
          <p
            style={{
              color: "#8b90b0",
              fontSize: 13,
              marginTop: 4,
              cursor: "default",
              textDecoration: "none",
            }}
          >
            Sign in to your account
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <label style={labelStyle}>Email</label>
        <input
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <label style={labelStyle}>Password</label>
        <input
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ marginTop: 8 }}
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
              <span style={spinnerStyle} /> Signing in...
            </span>
          ) : (
            "Sign In →"
          )}
        </button>

        <p onClick={onRegister}>
          Don't have an account? <strong>Register free</strong>
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
