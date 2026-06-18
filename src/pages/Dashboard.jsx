import { useState, useEffect } from "react";
import { api } from "../api";
import ImageGen from "../components/ImageGen";
import QRGen from "../components/QRGen";
import UrlShortener from "../components/UrlShortener";
import History from "../components/History";
import Plans from "../components/Plans";

const tabIcons = {
  image: "🎨",
  qr: "⬛",
  url: "🔗",
  plans: "💳",
  history: "📋",
};

export default function Dashboard({ user, onLogout }) {
  const [tab, setTab] = useState("image");
  const [balance, setBalance] = useState(0);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const b = await api.getBalance();
    setBalance(b.creditBalance);
    const u = await api.getUsage();
    setUsage(u);
  };

  const tabs = [
    { id: "image", label: "Image Gen" },
    { id: "qr", label: "QR Code" },
    { id: "url", label: "URL Shortener" },
    { id: "plans", label: "Buy Credits" },
    { id: "history", label: "History" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2fc" }}>
      {/* Navbar */}
      <nav
        style={{
          background: "linear-gradient(135deg, #0f1123 0%, #1a1d35 100%)",
          padding: "0 24px",
          height: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <span
          style={{
            color: "#fff",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "-0.5px",
          }}
        >
          Quotix<span style={{ color: "#6c63ff" }}>IO</span>
        </span>

        <span style={{ color: "#8b90b0", fontSize: 13 }}>
          Hey,{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>{user.name}</span> 👋
        </span>

        <button
          onClick={onLogout}
          style={{
            background: "rgba(255,77,109,0.15)",
            color: "#ff4d6d",
            border: "1px solid rgba(255,77,109,0.3)",
            padding: "7px 16px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = "rgba(255,77,109,0.28)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background = "rgba(255,77,109,0.15)")
          }
        >
          Logout
        </button>
      </nav>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "28px 16px" }}>
        {/* Balance Card */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #1a1d35 0%, #252847 60%, #2f2e6b 100%)",
            borderRadius: 20,
            padding: "28px 24px",
            color: "#fff",
            textAlign: "center",
            marginBottom: 22,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(108,99,255,0.22)",
            animation: "fadeUp 0.5s ease both",
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              background: "rgba(108,99,255,0.15)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 140,
              height: 140,
              background: "rgba(255,101,132,0.1)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              color: "#8b90b0",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Credit Balance
          </div>
          <div
            style={{
              fontSize: 58,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              lineHeight: 1,
              background: "linear-gradient(135deg, #fff 40%, #a5a0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 10,
            }}
          >
            {balance}
          </div>
          <div style={{ color: "#8b90b0", fontSize: 12 }}>
            {usage &&
              `${usage.dailyRequestsUsed} / ${usage.dailyLimit} requests used today`}
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 20,
            flexWrap: "wrap",
            animation: "fadeUp 0.5s 0.1s ease both",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "10px 6px",
                background:
                  tab === t.id
                    ? "linear-gradient(135deg, #6c63ff, #4c46cc)"
                    : "#fff",
                color: tab === t.id ? "#fff" : "#8b90b0",
                border: tab === t.id ? "none" : "1.5px solid #e4e7f5",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                minWidth: 90,
                transition: "all 0.2s",
                boxShadow:
                  tab === t.id ? "0 4px 14px rgba(108,99,255,0.3)" : "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ marginRight: 4 }}>{tabIcons[t.id]}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div key={tab} style={{ animation: "fadeUp 0.35s ease both" }}>
          {tab === "image" && <ImageGen onUse={loadStats} />}
          {tab === "qr" && <QRGen onUse={loadStats} />}
          {tab === "url" && <UrlShortener onUse={loadStats} />}
          {tab === "plans" && <Plans />}
          {tab === "history" && <History />}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
