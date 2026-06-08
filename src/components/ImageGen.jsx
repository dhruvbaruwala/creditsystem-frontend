import { useState } from "react";
import { api } from "../api";

export default function ImageGen({ onUse }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const generate = async () => {
    if (!prompt) return setError("Enter a prompt");
    setLoading(true);
    setError("");
    setResult(null);
    setImgLoading(false);
    try {
      const data = await api.generateImage(prompt);
      if (data.imageUrl) {
        setResult(data);
        setImgLoading(true);
        onUse();
      } else if (data.message === "Insufficient credits") {
        setError(
          "Not enough credits. You need 5 credits. Go to Buy Credits tab.",
        );
      } else if (data.message === "Daily limit reached.") {
        setError("Daily request limit reached. Upgrade your plan.");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Cannot connect to API. Is your API running?");
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(result.imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-image.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Download failed. Try right-clicking the image and saving.");
    }
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 6,
        }}
      >
        <div style={iconBadge("#6c63ff")}>🎨</div>
        <div>
          <h3 style={titleStyle}>AI Image Generation</h3>
          <p style={subtitleStyle}>
            Powered by Pollinations AI · 5 credits per image
          </p>
        </div>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <div style={{ position: "relative", marginTop: 16 }}>
        <input
          placeholder="Describe your image... e.g. a cat on the moon, realistic"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          style={inputStyle}
        />
      </div>

      <button
        onClick={generate}
        disabled={loading}
        style={{
          ...btnStyle,
          background: loading
            ? "linear-gradient(135deg, #aaa, #999)"
            : "linear-gradient(135deg, #6c63ff, #4c46cc)",
          cursor: loading ? "not-allowed" : "pointer",
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
          "✨ Generate Image — 5 Credits"
        )}
      </button>

      {/* Skeleton loader while image loads */}
      {result && imgLoading && (
        <div style={skeletonStyle}>
          <div style={shimmerBarStyle} />
          <p style={{ fontSize: 13, color: "#8b90b0", marginTop: 10 }}>
            Generating your image... (5–15 seconds)
          </p>
        </div>
      )}

      {/* Image result */}
      {result && (
        <div style={{ marginTop: 16, animation: "fadeUp 0.4s ease both" }}>
          <img
            src={result.imageUrl}
            alt={prompt}
            crossOrigin="anonymous"
            onLoad={() => setImgLoading(false)}
            onError={() => {
              setImgLoading(false);
              setError(
                "Image service is currently busy. Please wait 30–60 seconds and try again.",
              );
            }}
            style={{
              width: "100%",
              borderRadius: 14,
              border: "1.5px solid #e4e7f5",
              opacity: imgLoading ? 0 : 1,
              height: imgLoading ? 0 : "auto",
              transition: "opacity 0.4s ease",
              boxShadow: "0 4px 20px rgba(108,99,255,0.12)",
              display: "block",
            }}
          />

          {!imgLoading && (
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span style={creditBadge}>
                ⚡ {result.creditsUsed} used · {result.remainingBalance} left
              </span>
              <button onClick={handleDownload} style={downloadBtn}>
                ↓ Download
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { from { background-position: -200% center; } to { background-position: 200% center; } }
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

const iconBadge = (color) => ({
  width: 42,
  height: 42,
  background: `${color}15`,
  border: `1.5px solid ${color}30`,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  flexShrink: 0,
});

const titleStyle = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 700,
  fontSize: 16,
  color: "#0f1123",
};

const subtitleStyle = {
  fontSize: 12,
  color: "#8b90b0",
  marginTop: 1,
};

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
  boxSizing: "border-box",
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
  boxShadow: "0 4px 14px rgba(108,99,255,0.3)",
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

const skeletonStyle = {
  marginTop: 16,
  textAlign: "center",
  padding: "28px 20px",
  background: "#f8f9ff",
  borderRadius: 14,
  border: "1.5px dashed #d0d4ee",
};

const shimmerBarStyle = {
  height: 8,
  borderRadius: 4,
  background: "linear-gradient(90deg, #e4e7f5 25%, #d0d4f0 50%, #e4e7f5 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.4s infinite",
  width: "60%",
  margin: "0 auto",
};

const creditBadge = {
  fontSize: 12,
  color: "#8b90b0",
  background: "#f8f9ff",
  padding: "4px 10px",
  borderRadius: 20,
  border: "1px solid #e4e7f5",
};

const downloadBtn = {
  fontSize: 13,
  color: "#6c63ff",
  fontWeight: 600,
  padding: "5px 14px",
  background: "rgba(108,99,255,0.08)",
  borderRadius: 20,
  border: "1px solid rgba(108,99,255,0.2)",
  cursor: "pointer",
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
