import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.username || !form.password) return setError("Fill all fields");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://creditsystem-api-dfhadyeze5cee0hu.centralindia-01.azurewebsites.net/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        onLogin();
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Cannot connect to API");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "48px 40px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: 28,
            }}
          >
            ⚡
          </div>
          <h1
            style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}
          >
            Admin Portal
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            Credit System Control Center
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(255,100,100,0.15)",
              border: "1px solid rgba(255,100,100,0.3)",
              color: "#ff8080",
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 12,
              display: "block",
              marginBottom: 6,
            }}
          >
            USERNAME
          </label>
          <input
            placeholder="admin"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "#fff",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 12,
              display: "block",
              marginBottom: 6,
            }}
          >
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "#fff",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={login}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading
              ? "rgba(102,126,234,0.4)"
              : "linear-gradient(135deg, #667eea, #764ba2)",
            border: "none",
            borderRadius: 10,
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            letterSpacing: 0.5,
          }}
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>
      </div>
    </div>
  );
}
