import { useState, useEffect } from "react";
import { adminFetch } from "./AdminDashboard";
export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/stats").then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const cards = stats
    ? [
        {
          label: "Total Tenants",
          value: stats.totalTenants,
          icon: "🏢",
          color: "#667eea",
        },
        {
          label: "Total Users",
          value: stats.totalUsers,
          icon: "👥",
          color: "#11998e",
        },
        {
          label: "Total Transactions",
          value: stats.totalTransactions,
          icon: "💳",
          color: "#f093fb",
        },
        {
          label: "Total Revenue",
          value: `$${stats.totalRevenue?.toFixed(2)}`,
          icon: "💰",
          color: "#f5a623",
        },
        {
          label: "Credits Used Today",
          value: stats.creditsConsumedToday,
          icon: "⚡",
          color: "#ff6b6b",
        },
        {
          label: "Paid Payments",
          value: stats.totalPayments,
          icon: "✅",
          color: "#56ab2f",
        },
      ]
    : [];

  return (
    <div>
      <h2
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        Overview
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
          marginBottom: 28,
        }}
      >
        System-wide statistics
      </p>

      {loading ? (
        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            textAlign: "center",
            padding: 60,
          }}
        >
          Loading stats...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "24px 20px",
                transition: "all 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.border = `1px solid ${card.color}40`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.06)")
              }
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
              <div
                style={{
                  color: card.color,
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {card.value}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
