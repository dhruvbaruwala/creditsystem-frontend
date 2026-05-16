import { useEffect, useState } from "react";
import { api } from "../api";

export default function PaymentSuccess() {
  const [msg, setMsg] = useState("Verifying your payment...");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (sessionId) {
      verifyAndAddCredits(sessionId);
    }
  }, []);

  const verifyAndAddCredits = async (sessionId) => {
    try {
const res = await fetch(
  `https://creditsystem-api-dfhadyeze5cee0hu.centralindia-01.azurewebsites.net/api/payments/confirm/${sessionId}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
);
      const data = await res.json();
      if (res.ok) {
        setMsg(`${data.creditsAdded} credits added to your account.`);
        setDone(true);
      } else {
        setMsg(data.message || "Payment verification failed");
      }
    } catch {
      setMsg("Cannot connect to API");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f1123 0%, #1a1d35 50%, #252847 100%)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "44px 36px",
          textAlign: "center",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          maxWidth: 400,
          width: "90%",
          animation: "fadeUp 0.5s ease both",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            background: done
              ? "linear-gradient(135deg, #00d4a1, #00a87e)"
              : "linear-gradient(135deg, #6c63ff, #4c46cc)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: 30,
            boxShadow: done
              ? "0 8px 24px rgba(0,212,161,0.35)"
              : "0 8px 24px rgba(108,99,255,0.35)",
            transition: "all 0.4s",
          }}
        >
          {done ? "✓" : <span style={spinnerStyle} />}
        </div>

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#0f1123",
            marginBottom: 10,
            letterSpacing: "-0.5px",
          }}
        >
          {done ? "Payment Successful!" : "Processing..."}
        </h2>

        <p
          style={{
            color: "#8b90b0",
            fontSize: 14,
            marginBottom: 28,
            lineHeight: 1.6,
          }}
        >
          {msg}
        </p>

        {done && (
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #6c63ff, #4c46cc)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 16px rgba(108,99,255,0.35)",
              transition: "transform 0.15s",
            }}
          >
            Go to Dashboard →
          </button>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const spinnerStyle = {
  width: 28,
  height: 28,
  border: "3px solid rgba(255,255,255,0.3)",
  borderTop: "3px solid #fff",
  borderRadius: "50%",
  display: "inline-block",
  animation: "spin 0.8s linear infinite",
};
