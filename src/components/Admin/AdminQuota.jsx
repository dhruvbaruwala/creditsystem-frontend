import { useState, useEffect } from "react";
import { adminFetch } from "./AdminDashboard";
export default function AdminQuota() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/quota-monitor").then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status) => {
    if (status === "No Credits") return "#ff6b6b";
    if (status === "Limit Reached") return "#ff6b6b";
    if (status === "Near Limit") return "#f5a623";
    return "#56ab2f";
  };

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
        Quota Monitor
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
          marginBottom: 24,
        }}
      >
        Real-time usage and throttle status per user
      </p>

      {loading ? (
        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            textAlign: "center",
            padding: 60,
          }}
        >
          Loading...
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {users.map((u) => (
            <div
              key={u.userId}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${u.status !== "OK" ? getStatusColor(u.status) + "30" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 14,
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 10,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                    {u.fullName}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                    {u.email}
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#56ab2f", fontWeight: 700 }}>
                    {u.creditBalance}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                    credits
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#667eea", fontWeight: 700 }}>
                    {u.dailyRequestCount} / {u.dailyLimit}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                    requests today
                  </div>
                </div>

                <div
                  style={{
                    padding: "4px 12px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    background: `${getStatusColor(u.status)}15`,
                    border: `1px solid ${getStatusColor(u.status)}30`,
                    color: getStatusColor(u.status),
                  }}
                >
                  {u.status}
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 4,
                  height: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(u.usagePercent, 100)}%`,
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${getStatusColor(u.status)}, ${getStatusColor(u.status)}80)`,
                    transition: "width 0.5s",
                  }}
                />
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                {u.usagePercent}% of daily quota used
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
