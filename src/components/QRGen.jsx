import { useState } from "react";
import { api } from "../api";

export default function QRGen({ onUse }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text) return setError("Enter text or URL");
    setLoading(true);
    setError("");
    const data = await api.generateQR(text);
    if (data.qrCodeBase64) {
      setResult(data);
      onUse();
    } else {
      setError(data.message || "Failed");
    }
    setLoading(false);
  };

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 6,
        }}
      >
        <div style={iconBadge}>⬛</div>
        <div>
          <h3 style={titleStyle}>QR Code Generator</h3>
          <p style={subtitleStyle}>
            Scan-ready codes in seconds · 3 credits each
          </p>
        </div>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <input
        placeholder="Enter text or URL to encode..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && generate()}
        style={{ ...inputStyle, marginTop: 16 }}
      />

      <button
        onClick={generate}
        disabled={loading}
        style={{
          ...btnStyle,
          background: loading
            ? "linear-gradient(135deg, #aaa, #999)"
            : "linear-gradient(135deg, #00d4a1, #00a87e)",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 14px rgba(0,212,161,0.3)",
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
            <span style={spinnerStyle} /> Generating...
          </span>
        ) : (
          "⬛ Generate QR Code — 3 Credits"
        )}
      </button>

      {result && (
        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            animation: "fadeUp 0.4s ease both",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: 14,
              background: "#fff",
              borderRadius: 16,
              border: "1.5px solid #e4e7f5",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <img
              src={result.qrCodeBase64}
              alt="QR Code"
              style={{
                width: 180,
                height: 180,
                display: "block",
                borderRadius: 8,
              }}
            />
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span style={creditBadge}>
              ⚡ {result.creditsUsed} used · {result.remainingBalance} left
            </span>
            <a
              href={result.qrCodeBase64}
              download="qrcode.png"
              style={downloadLink}
            >
              ↓ Download PNG
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
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
  animation: "fadeUp 0.4s ease both",
};

const iconBadge = {
  width: 42,
  height: 42,
  background: "rgba(0,212,161,0.1)",
  border: "1.5px solid rgba(0,212,161,0.25)",
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

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1.5px solid #e4e7f5",
  borderRadius: 12,
  fontSize: 14,
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  background: "#f8f9ff",
  color: "#1a1d35",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const btnStyle = {
  width: "100%",
  padding: "13px",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 600,
  fontFamily: "'DM Sans', sans-serif",
  marginTop: 10,
  transition: "transform 0.15s, box-shadow 0.2s",
};

const errorStyle = {
  background: "#fff0f3",
  color: "#c9214b",
  padding: "10px 14px",
  borderRadius: 10,
  fontSize: 13,
  marginTop: 12,
  border: "1px solid #ffc2ce",
};

const creditBadge = {
  fontSize: 12,
  color: "#8b90b0",
  background: "#f8f9ff",
  padding: "4px 10px",
  borderRadius: 20,
  border: "1px solid #e4e7f5",
};

const downloadLink = {
  fontSize: 13,
  color: "#00a87e",
  textDecoration: "none",
  fontWeight: 600,
  padding: "5px 14px",
  background: "rgba(0,212,161,0.08)",
  borderRadius: 20,
  border: "1px solid rgba(0,212,161,0.25)",
};

const spinnerStyle = {
  width: 16,
  height: 16,
  border: "2px solid rgba(255,255,255,0.35)",
  borderTop: "2px solid #fff",
  borderRadius: "50%",
  display: "inline-block",
  animation: "spin 0.7s linear infinite",
};
