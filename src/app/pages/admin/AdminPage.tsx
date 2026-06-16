"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHomepage } from "./components/AdminHomepage";
import { DataDashboard } from "./components/DataDashboard";
import { AddAdminModal } from "./components/AddAdminModal";
import { logoutAdmin } from "../../../api/auth";

type View = "home" | "data";

export default function AdminPage() {
  const navigate = useNavigate();
  const loggedInAs = localStorage.getItem("loggedInAs") || "Admin";
  const [view, setView] = useState<View>("home");
  const [showAdd, setShowAdd] = useState(false);

  const handleLogout = async () => {
    try { await logoutAdmin(); } catch(e) { console.error("Logout error", e); }
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('loggedInAs');
    navigate('/login');
  };

  return (
    <>
      {view === "home" && (
        <>
          <AdminHomepage
            onAccessData={() => setView("data")}
            onAddAdmin={() => setShowAdd(true)}
            onLogout={handleLogout}
            loggedInAs={loggedInAs}
          />
          {showAdd && <AddAdminModal onClose={() => setShowAdd(false)} />}
        </>
      )}
      {view === "data" && (
        <DataDashboard onBack={() => setView("home")} loggedInAs={loggedInAs} />
      )}
    </>
  );
}
