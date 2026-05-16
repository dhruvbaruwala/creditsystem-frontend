import { useState, useEffect } from "react";
import { adminFetch } from "./AdminDashboard";
export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/transactions").then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

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
        Transactions
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
          marginBottom: 24,
        }}
      >
        Last 100 credit transactions
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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {transactions.map((t) => (
            <div
              key={t.transactionId}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  flexShrink: 0,
                  background:
                    t.type === "DEDUCT"
                      ? "rgba(255,107,107,0.15)"
                      : "rgba(86,171,47,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {t.type === "DEDUCT" ? "↓" : "↑"}
              </div>

              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
                  {t.description}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  {t.userName} · {new Date(t.createdAt).toLocaleString()}
                </div>
              </div>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: t.type === "DEDUCT" ? "#ff6b6b" : "#56ab2f",
                }}
              >
                {t.type === "DEDUCT" ? "-" : "+"}
                {t.credits}
              </div>

              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                Bal: {t.balanceAfter}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
