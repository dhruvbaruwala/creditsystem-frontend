import { useState, useEffect } from "react";
import { api } from "../api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.getHistory().then(setHistory);
  }, []);

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={iconBadge}>📋</div>
        <div>
          <h3 style={titleStyle}>Transaction History</h3>
          <p style={subtitleStyle}>Your recent credit activity</p>
        </div>
      </div>

      {history.length === 0 && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
          <p style={{ color: "#b0b5d0", fontSize: 14 }}>No transactions yet</p>
        </div>
      )}

      {history.map((h, i) => (
        <div
          key={h.transactionId}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "13px 14px",
            borderRadius: 12,
            background: i % 2 === 0 ? "#f8f9ff" : "#fff",
            marginBottom: 6,
            border: "1px solid #f0f2f8",
            transition: "transform 0.15s",
            animation: `fadeUp 0.3s ${i * 0.04}s ease both`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background:
                  h.type === "DEDUCT"
                    ? "rgba(255,77,109,0.1)"
                    : "rgba(0,212,161,0.1)",
                border: `1.5px solid ${h.type === "DEDUCT" ? "rgba(255,77,109,0.2)" : "rgba(0,212,161,0.2)"}`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              {h.type === "DEDUCT" ? "⬇️" : "⬆️"}
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#1a1d35", fontWeight: 500 }}>
                {h.description}
              </div>
              <div style={{ fontSize: 11, color: "#b0b5d0", marginTop: 2 }}>
                {new Date(h.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                background:
                  h.type === "DEDUCT"
                    ? "rgba(255,77,109,0.1)"
                    : "rgba(0,212,161,0.1)",
                color: h.type === "DEDUCT" ? "#e0244a" : "#00a87e",
              }}
            >
              {h.type === "DEDUCT" ? "−" : "+"}
              {h.credits}
            </span>
            <div style={{ fontSize: 11, color: "#b0b5d0", marginTop: 4 }}>
              Bal:{" "}
              <strong style={{ color: "#8b90b0" }}>{h.balanceAfter}</strong>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: 20,
  padding: 24,
  boxShadow: "0 4px 24px rgba(108,99,255,0.08)",
  border: "1.5px solid #e4e7f5",
};

const iconBadge = {
  width: 42,
  height: 42,
  background: "rgba(108,99,255,0.1)",
  border: "1.5px solid rgba(108,99,255,0.2)",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  flexShrink: 0,
};

const titleStyle = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 700,
  fontSize: 16,
  color: "#0f1123",
};

const subtitleStyle = { fontSize: 12, color: "#8b90b0", marginTop: 1 };
