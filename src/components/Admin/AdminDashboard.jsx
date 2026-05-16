import { useState, useEffect } from "react";
import AdminStats from "./AdminStats";
import AdminUsers from "./AdminUsers";
import AdminTenants from "./AdminTenants";
import AdminTransactions from "./AdminTransactions";
import AdminQuota from "./AdminQuota";
const BASE_URL =
  "https://creditsystem-api-dfhadyeze5cee0hu.centralindia-01.azurewebsites.net";

export const adminFetch = (path, options = {}) => {
  const token = localStorage.getItem("adminToken");
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  }).then((r) => r.json());
};

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState("stats");

  const tabs = [
    { id: "stats", label: "Overview", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "tenants", label: "Tenants", icon: "🏢" },
    { id: "transactions", label: "Transactions", icon: "💳" },
    { id: "quota", label: "Quota Monitor", icon: "⚡" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "0 20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              ⚡
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                CreditSystem
              </div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                Admin Portal
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: "16px 12px" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                width: "100%",
                padding: "10px 12px",
                background:
                  tab === t.id
                    ? "linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))"
                    : "transparent",
                border:
                  tab === t.id
                    ? "1px solid rgba(102,126,234,0.3)"
                    : "1px solid transparent",
                borderRadius: 10,
                color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: tab === t.id ? 600 : 400,
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
                transition: "all 0.2s",
                textAlign: "left",
              }}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(255,80,80,0.1)",
              border: "1px solid rgba(255,80,80,0.2)",
              borderRadius: 10,
              color: "#ff8080",
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: 220, flex: 1, padding: 28, overflowY: "auto" }}>
        <div style={{ maxWidth: 1100 }}>
          {tab === "stats" && <AdminStats />}
          {tab === "users" && <AdminUsers />}
          {tab === "tenants" && <AdminTenants />}
          {tab === "transactions" && <AdminTransactions />}
          {tab === "quota" && <AdminQuota />}
        </div>
      </div>
    </div>
  );
}
