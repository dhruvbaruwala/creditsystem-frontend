import { useState } from "react";
import { api } from "../api";

export default function UrlShortener({ onUse }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shorten = async () => {
    if (!url) return setError("Enter a URL");
    setLoading(true);
    setError("");
    const data = await api.shortenUrl(url);
    if (data.shortUrl) {
      setResult(data);
      onUse();
    } else {
      setError(data.message || "Failed");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div style={iconBadge}>🔗</div>
        <div>
          <h3 style={titleStyle}>URL Shortener</h3>
          <p style={subtitleStyle}>
            Compact links, instant results · 2 credits each
          </p>
        </div>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <input
        placeholder="Paste your long URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && shorten()}
        style={{ ...inputStyle, marginTop: 16 }}
      />

      <button
        onClick={shorten}
        disabled={loading}
        style={{
          ...btnStyle,
          background: loading
            ? "linear-gradient(135deg, #aaa, #999)"
            : "linear-gradient(135deg, #ff6584, #cc3f5a)",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 14px rgba(255,101,132,0.3)",
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
            <span style={spinnerStyle} /> Shortening...
          </span>
        ) : (
          "🔗 Shorten URL — 2 Credits"
        )}
      </button>

      {result && (
        <div
          style={{
            marginTop: 16,
            background: "linear-gradient(135deg, #f8f9ff, #f0f2fc)",
            border: "1.5px solid #e4e7f5",
            borderRadius: 14,
            padding: 16,
            animation: "fadeUp 0.4s ease both",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#8b90b0",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Your short URL
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#0f1123",
                flex: 1,
                wordBreak: "break-all",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {result.shortUrl}
            </span>
            <button
              onClick={copy}
              style={{
                padding: "8px 14px",
                background: copied
                  ? "linear-gradient(135deg, #00d4a1, #00a87e)"
                  : "linear-gradient(135deg, #6c63ff, #4c46cc)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                boxShadow: copied
                  ? "0 3px 10px rgba(0,212,161,0.3)"
                  : "0 3px 10px rgba(108,99,255,0.3)",
              }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span style={creditBadge}>
              ⚡ {result.creditsUsed} used · {result.remainingBalance} left
            </span>
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
  background: "rgba(255,101,132,0.1)",
  border: "1.5px solid rgba(255,101,132,0.25)",
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
  background: "#f0f2fc",
  padding: "4px 10px",
  borderRadius: 20,
  border: "1px solid #e4e7f5",
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
