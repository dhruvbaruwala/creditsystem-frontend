import { useState, useEffect } from "react";
import { api } from "../api";

const planColors = [
  {
    bg: "rgba(108,99,255,0.08)",
    border: "rgba(108,99,255,0.2)",
    accent: "#6c63ff",
    badge: "🚀",
  },
  {
    bg: "rgba(255,101,132,0.08)",
    border: "rgba(255,101,132,0.2)",
    accent: "#ff6584",
    badge: "⚡",
  },
  {
    bg: "rgba(0,212,161,0.08)",
    border: "rgba(0,212,161,0.2)",
    accent: "#00d4a1",
    badge: "💎",
  },
];

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);

  useEffect(() => {
    api.getPlans().then((data) => setPlans(data.filter((p) => p.price > 0)));
  }, []);

  const buy = async (planId) => {
    setLoading(true);
    setLoadingPlan(planId);
    const data = await api.createCheckout(planId);
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Stripe not configured yet");
    }
    setLoading(false);
    setLoadingPlan(null);
  };

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
        <div style={iconBadge}>💳</div>
        <div>
          <h3 style={titleStyle}>Buy Credits</h3>
          <p style={subtitleStyle}>Top up your balance and keep creating</p>
        </div>
      </div>

      {plans.map((p, i) => {
        const color = planColors[i % planColors.length];
        return (
          <div
            key={p.planId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: color.bg,
              border: `1.5px solid ${color.border}`,
              borderRadius: 14,
              padding: "16px 18px",
              marginBottom: 10,
              animation: `fadeUp 0.3s ${i * 0.08}s ease both`,
              transition: "transform 0.15s, box-shadow 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>{color.badge}</span>
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#0f1123",
                  }}
                >
                  {p.planName}
                </div>
                <div style={{ fontSize: 12, color: "#8b90b0", marginTop: 2 }}>
                  {p.credits} credits included
                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: color.accent,
                  lineHeight: 1,
                }}
              >
                ${p.price}
              </div>
              <button
                onClick={() => buy(p.planId)}
                disabled={loading}
                style={{
                  marginTop: 8,
                  padding: "8px 18px",
                  background:
                    loadingPlan === p.planId
                      ? "#aaa"
                      : `linear-gradient(135deg, ${color.accent}, ${color.accent}cc)`,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: `0 3px 12px ${color.accent}40`,
                  transition: "transform 0.15s, box-shadow 0.2s",
                }}
              >
                {loadingPlan === p.planId ? "..." : "Buy Now"}
              </button>
            </div>
          </div>
        );
      })}

      <p
        style={{
          fontSize: 11,
          color: "#b0b5d0",
          textAlign: "center",
          marginTop: 12,
        }}
      >
        🔒 Secure payments powered by Stripe
      </p>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
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
