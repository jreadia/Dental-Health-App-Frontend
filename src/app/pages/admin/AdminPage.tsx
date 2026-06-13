"use client";

import React, { useState } from "react";
import { AdminHomepage } from "./components/AdminHomepage";
import { DataDashboard } from "./components/DataDashboard";
import { AddAdminModal } from "./components/AddAdminModal";

type View = "home" | "data";

interface AdminPageProps {
  onLogout: () => void;
  loggedInAs?: string;
}

export default function AdminPage({
  onLogout,
  loggedInAs = "Josep",
}: AdminPageProps) {
  const [view, setView] = useState<View>("home");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      {view === "home" && (
        <>
          <AdminHomepage
            onAccessData={() => setView("data")}
            onAddAdmin={() => setShowAdd(true)}
            onLogout={onLogout}
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
