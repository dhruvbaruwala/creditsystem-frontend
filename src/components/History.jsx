import { useState, useEffect } from "react";
import { api } from "../api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    api.getHistory().then(setHistory);
  }, []);

  const handleResetFilters = () => {
    setTypeFilter("ALL");
    setStartDate("");
    setEndDate("");
  };

  const filteredHistory = history.filter((h) => {
    if (typeFilter !== "ALL" && h.type !== typeFilter) {
      return false;
    }
    const transDate = new Date(h.createdAt);
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (transDate < start) return false;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (transDate > end) return false;
    }
    return true;
  });

  return (
    <div style={cardStyle}>
      {/* Title Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={iconBadge}>📋</div>
          <div>
            <h3 style={titleStyle}>Transaction History</h3>
            <p style={subtitleStyle}>Your recent credit activity</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          background: "#f8f9ff",
          border: "1.5px solid #e4e7f5",
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          animation: "fadeUp 0.3s ease both",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 700,
            color: "#6c63ff",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          <span>🔍</span> Filter Transactions
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          {/* Type Filter */}
          <div style={{ flex: "1 1 120px" }}>
            <label style={filterLabelStyle}>Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={filterSelectStyle}
            >
              <option value="ALL">All Transactions</option>
              <option value="ADD">Additions (+)</option>
              <option value="DEDUCT">Deductions (-)</option>
            </select>
          </div>

          {/* Date Picker Start */}
          <div style={{ flex: "1 1 130px" }}>
            <label style={filterLabelStyle}>From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={filterInputStyle}
            />
          </div>

          {/* Date Picker End */}
          <div style={{ flex: "1 1 130px" }}>
            <label style={filterLabelStyle}>To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={filterInputStyle}
            />
          </div>

          {/* Reset button */}
          {(typeFilter !== "ALL" || startDate || endDate) && (
            <button
              onClick={handleResetFilters}
              style={{
                height: 40,
                padding: "0 16px",
                background: "rgba(108, 99, 255, 0.08)",
                color: "#6c63ff",
                border: "1px dashed rgba(108, 99, 255, 0.3)",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(108, 99, 255, 0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(108, 99, 255, 0.08)")
              }
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {filteredHistory.length === 0 && (
        <div style={{ textAlign: "center", padding: "44px 0" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
          <p style={{ color: "#b0b5d0", fontSize: 14, fontWeight: 500 }}>
            No matching transactions found
          </p>
        </div>
      )}

      {filteredHistory.map((h, i) => (
        <div
          key={h.transactionId}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 18px",
            borderRadius: 14,
            background: i % 2 === 0 ? "#f8f9ff" : "#fff",
            marginBottom: 8,
            border: "1.5px solid #f0f2f8",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: `fadeUp 0.3s ${Math.min(i * 0.03, 0.3)}s ease both`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(2px)";
            e.currentTarget.style.borderColor = "#e4e7f5";
            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.borderColor = "#f0f2f8";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                background:
                  h.type === "DEDUCT"
                    ? "rgba(255,77,109,0.08)"
                    : "rgba(0,212,161,0.08)",
                border: `1.5px solid ${h.type === "DEDUCT" ? "rgba(255,77,109,0.18)" : "rgba(0,212,161,0.18)"}`,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              {h.type === "DEDUCT" ? "⬇️" : "⬆️"}
            </div>
            <div>
              <div
                style={{ fontSize: 13.5, color: "#1a1d35", fontWeight: 600 }}
              >
                {h.description}
              </div>
              <div style={{ fontSize: 11, color: "#8b90b0", marginTop: 3 }}>
                {new Date(h.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                padding: "5px 12px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                background:
                  h.type === "DEDUCT"
                    ? "rgba(255,77,109,0.08)"
                    : "rgba(0,212,161,0.08)",
                color: h.type === "DEDUCT" ? "#e0244a" : "#00a87e",
                border: `1px solid ${h.type === "DEDUCT" ? "rgba(255,77,109,0.15)" : "rgba(0,212,161,0.15)"}`,
              }}
            >
              {h.type === "DEDUCT" ? "−" : "+"}
              {h.credits}
            </span>
            <div style={{ fontSize: 11, color: "#8b90b0", marginTop: 6 }}>
              Bal:{" "}
              <strong style={{ color: "#5c6080", fontWeight: 700 }}>
                {h.balanceAfter}
              </strong>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: 24,
  padding: 28,
  boxShadow: "0 8px 32px rgba(108,99,255,0.05)",
  border: "1.5px solid #e4e7f5",
  animation: "fadeUp 0.4s ease both",
};

const iconBadge = {
  width: 44,
  height: 44,
  background: "rgba(108,99,255,0.08)",
  border: "1.5px solid rgba(108,99,255,0.18)",
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  flexShrink: 0,
};

const titleStyle = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 800,
  fontSize: 18,
  color: "#0f1123",
  letterSpacing: "-0.5px",
};

const subtitleStyle = {
  fontSize: 12,
  color: "#8b90b0",
  marginTop: 2,
  fontWeight: 500,
};

const filterLabelStyle = {
  display: "block",
  fontSize: 10,
  fontWeight: 700,
  color: "#8b90b0",
  marginBottom: 5,
  letterSpacing: 0.5,
  textTransform: "uppercase",
};

const filterSelectStyle = {
  width: "100%",
  padding: "9px 12px",
  border: "1.5px solid #e4e7f5",
  borderRadius: 10,
  fontSize: 12,
  fontFamily: "'DM Sans', sans-serif",
  background: "#fff",
  color: "#1a1d35",
  outline: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  height: 40,
};

const filterInputStyle = {
  width: "100%",
  padding: "9px 12px",
  border: "1.5px solid #e4e7f5",
  borderRadius: 10,
  fontSize: 12,
  fontFamily: "'DM Sans', sans-serif",
  background: "#fff",
  color: "#1a1d35",
  outline: "none",
  boxSizing: "border-box",
  height: 40,
};
