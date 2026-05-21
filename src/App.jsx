import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
useEffect(() => {
  const path = window.location.pathname;
  if (page === "landing")
    return (
      <LandingPage
        onLogin={() => setPage("login")}
        onRegister={() => setPage("register")}
      />
    );
  if (path === "/payment-success") {
    setPage("payment-success");
    return;
  }
  if (path === "/admin") {
    setPage("admin-login");
    return;
  }

  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) {
    setPage("admin-dashboard");
    return;
  }

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");
  if (token && name) {
    setUser({ name });
    setPage("dashboard");
    return;
  }

  setPage("landing");
}, []);

  const handleLogin = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userName", userData.fullName);
    setUser({ name: userData.fullName });
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
    setPage("login");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    setPage("admin-login");
  };

  if (page === "payment-success") return <PaymentSuccess />;
  if (page === "admin-login")
    return <AdminLogin onLogin={() => setPage("admin-dashboard")} />;
  if (page === "admin-dashboard")
    return <AdminDashboard onLogout={handleAdminLogout} />;
  if (page === "login")
    return (
      <Login onLogin={handleLogin} onRegister={() => setPage("register")} />
    );
  if (page === "register") return <Register onLogin={() => setPage("login")} />;
  if (page === "dashboard")
    return <Dashboard user={user} onLogout={handleLogout} />;
}
