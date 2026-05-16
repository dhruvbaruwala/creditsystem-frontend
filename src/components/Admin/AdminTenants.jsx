import { useState, useEffect } from "react";
import { adminFetch } from "./AdminDashboard";
export default function AdminTenants() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ businessName: "", websiteUrl: "" });
  const [adding, setAdding] = useState(false);
  const [newTenant, setNewTenant] = useState(null);

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = () => {
    adminFetch("/api/admin/tenants").then((data) => {
      setTenants(data);
      setLoading(false);
    });
  };

  const addTenant = async () => {
    if (!form.businessName) return;
    setAdding(true);
    const data = await adminFetch("/api/admin/tenants", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setNewTenant(data);
    setForm({ businessName: "", websiteUrl: "" });
    loadTenants();
    setAdding(false);
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
        Tenants
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
          marginBottom: 24,
        }}
      >
        Website owners using your system
      </p>

      {/* Add tenant form */}
      <div
        style={{
          background: "rgba(102,126,234,0.08)",
          border: "1px solid rgba(102,126,234,0.2)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div style={{ color: "#fff", fontWeight: 600, marginBottom: 14 }}>
          Add New Tenant
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            placeholder="Business name"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            style={{
              flex: 1,
              minWidth: 160,
              padding: "10px 14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "#fff",
              fontSize: 13,
              outline: "none",
            }}
          />
          <input
            placeholder="Website URL"
            value={form.websiteUrl}
            onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
            style={{
              flex: 1,
              minWidth: 160,
              padding: "10px 14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "#fff",
              fontSize: 13,
              outline: "none",
            }}
          />
          <button
            onClick={addTenant}
            disabled={adding}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {adding ? "Adding..." : "Add Tenant"}
          </button>
        </div>

        {newTenant && (
          <div
            style={{
              marginTop: 14,
              padding: "12px 14px",
              background: "rgba(86,171,47,0.1)",
              border: "1px solid rgba(86,171,47,0.3)",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                color: "#56ab2f",
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 4,
              }}
            >
              ✅ Tenant created!
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              API Key:{" "}
              <span style={{ color: "#fff", fontFamily: "monospace" }}>
                {newTenant.apiKey}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tenants list */}
      {loading ? (
        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            textAlign: "center",
            padding: 40,
          }}
        >
          Loading...
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tenants.map((t) => (
            <div
              key={t.tenantId}
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
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #11998e, #38ef7d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                🏢
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                  {t.businessName}
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                  {t.websiteUrl}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#667eea", fontWeight: 700 }}>
                  {t.userCount}
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                  users
                </div>
              </div>

              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  background: t.isActive
                    ? "rgba(86,171,47,0.15)"
                    : "rgba(255,80,80,0.15)",
                  color: t.isActive ? "#56ab2f" : "#ff8080",
                  border: `1px solid ${t.isActive ? "rgba(86,171,47,0.3)" : "rgba(255,80,80,0.3)"}`,
                }}
              >
                {t.isActive ? "Active" : "Inactive"}
              </div>

              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "4px 8px",
                  borderRadius: 6,
                }}
              >
                {t.apiKey}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
