import { useState, useEffect } from "react";
import { adminFetch } from "./AdminDashboard";
export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingCredits, setAddingCredits] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    adminFetch("/api/admin/users").then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };

  const addCredits = async (userId, amount) => {
    setAddingCredits((prev) => ({ ...prev, [userId]: true }));
    await adminFetch(`/api/admin/users/${userId}/add-credits`, {
      method: "POST",
      body: JSON.stringify({ credits: parseInt(amount) }),
    });
    loadUsers();
    setAddingCredits((prev) => ({ ...prev, [userId]: false }));
  };

  const resetRequests = async (userId) => {
    await adminFetch(`/api/admin/users/${userId}/reset-requests`, {
      method: "POST",
    });
    loadUsers();
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
        Users
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
          marginBottom: 24,
        }}
      >
        {users.length} total users
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
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                {u.fullName?.[0]?.toUpperCase()}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 150 }}>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                  {u.fullName}
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                  {u.email}
                </div>
              </div>

              {/* Credits */}
              <div style={{ textAlign: "center", minWidth: 80 }}>
                <div
                  style={{ color: "#56ab2f", fontWeight: 700, fontSize: 18 }}
                >
                  {u.creditBalance}
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                  credits
                </div>
              </div>

              {/* Plan */}
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: "rgba(102,126,234,0.15)",
                  border: "1px solid rgba(102,126,234,0.3)",
                  color: "#667eea",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {u.planName}
              </div>

              {/* Daily requests */}
              <div style={{ textAlign: "center", minWidth: 80 }}>
                <div
                  style={{ color: "#f5a623", fontWeight: 600, fontSize: 14 }}
                >
                  {u.dailyRequestCount}
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                  req today
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  id={`credits-${u.userId}`}
                  type="number"
                  placeholder="100"
                  defaultValue={100}
                  style={{
                    width: 70,
                    padding: "6px 8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                    outline: "none",
                  }}
                />
                <button
                  onClick={() =>
                    addCredits(
                      u.userId,
                      document.getElementById(`credits-${u.userId}`).value,
                    )
                  }
                  disabled={addingCredits[u.userId]}
                  style={{
                    padding: "6px 12px",
                    background: "rgba(86,171,47,0.2)",
                    border: "1px solid rgba(86,171,47,0.3)",
                    borderRadius: 8,
                    color: "#56ab2f",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  +Add
                </button>
                <button
                  onClick={() => resetRequests(u.userId)}
                  style={{
                    padding: "6px 12px",
                    background: "rgba(245,166,35,0.15)",
                    border: "1px solid rgba(245,166,35,0.3)",
                    borderRadius: 8,
                    color: "#f5a623",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
