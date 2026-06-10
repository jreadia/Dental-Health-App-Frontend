"use client";

import { useState } from "react";
import { addAdminAccount, getAdminAccounts } from "../adminAccounts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "banned";
  joined: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const USERS: User[] = [
  { id: 1, name: "Maria Santos",   email: "maria@example.com",  status: "active",   joined: "2026-01-12" },
  { id: 2, name: "Juan Dela Cruz", email: "juan@example.com",   status: "active",   joined: "2026-02-03" },
  { id: 3, name: "Ana Reyes",      email: "ana@example.com",    status: "inactive", joined: "2026-03-19" },
  { id: 4, name: "Carlo Mendoza",  email: "carlo@example.com",  status: "banned",   joined: "2026-04-07" },
  { id: 5, name: "Lea Torres",     email: "lea@example.com",    status: "active",   joined: "2026-05-22" },
];

// ─── Tooth SVG Mascot ─────────────────────────────────────────────────────────
function ToothMascot() {
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" style={{ width: 180, height: 220 }}>
      <defs>
        <radialGradient id="tg" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#daeeff" />
        </radialGradient>
      </defs>
      <path d="M90 20 C55 20 30 45 30 75 C30 100 35 125 42 155 C46 170 52 190 62 190 C70 190 74 178 80 165 C83 157 86 152 90 152 C94 152 97 157 100 165 C106 178 110 190 118 190 C128 190 134 170 138 155 C145 125 150 100 150 75 C150 45 125 20 90 20Z" fill="url(#tg)" stroke="#b8d8f0" strokeWidth="2" />
      <circle cx="58" cy="118" r="12" fill="#ffb3c6" opacity=".6" />
      <circle cx="122" cy="118" r="12" fill="#ffb3c6" opacity=".6" />
      <ellipse cx="74" cy="95" rx="14" ry="16" fill="#fff" stroke="#a0c4e0" strokeWidth="1" />
      <ellipse cx="106" cy="95" rx="14" ry="16" fill="#fff" stroke="#a0c4e0" strokeWidth="1" />
      <circle cx="76" cy="97" r="7" fill="#3b82f6" />
      <circle cx="108" cy="97" r="7" fill="#3b82f6" />
      <circle cx="78" cy="95" r="3" fill="#1e3a8a" />
      <circle cx="110" cy="95" r="3" fill="#1e3a8a" />
      <circle cx="80" cy="92" r="2" fill="#fff" />
      <circle cx="112" cy="92" r="2" fill="#fff" />
      <path d="M70 120 Q90 138 110 120" stroke="#1e3a8a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="90" y1="120" x2="90" y2="134" stroke="#b8d8f0" strokeWidth="1.5" />
      <path d="M38 100 Q18 110 22 130" stroke="#daeeff" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M142 100 Q162 108 160 128" stroke="#daeeff" strokeWidth="10" fill="none" strokeLinecap="round" />
      <line x1="158" y1="126" x2="172" y2="148" stroke="#888" strokeWidth="5" strokeLinecap="round" />
      <circle cx="150" cy="115" r="18" fill="rgba(200,230,255,.5)" stroke="#aaa" strokeWidth="4" />
      <circle cx="150" cy="115" r="14" fill="rgba(220,240,255,.3)" />
    </svg>
  );
}

// ─── Add Admin Modal ──────────────────────────────────────────────────────────
function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [form, setForm]   = useState({ username: "", password: "" });
  const [status, setStatus] = useState<"idle" | "success" | "duplicate">("idle");

  function handleSave() {
    if (!form.username.trim() || !form.password.trim()) return;
    const success = addAdminAccount(form.username.trim(), form.password.trim());
    setStatus(success ? "success" : "duplicate");
  }

  return (
    <div style={modal.overlay}>
      <div style={modal.card}>
        <h2 style={modal.title}>Add Admin Account</h2>

        {status === "success" ? (
          <div style={{ color: "#166534", background: "#dcfce7", padding: "12px 16px", borderRadius: 8, fontSize: 14 }}>
            ✓ Admin <strong>{form.username}</strong> created! They can now log in with the admin interface.
          </div>
        ) : (
          <>
            {status === "duplicate" && (
              <p style={{ color: "#991b1b", background: "#fee2e2", padding: "8px 12px", borderRadius: 6, fontSize: 13 }}>
                ⚠ Username already exists. Choose a different one.
              </p>
            )}
            <div style={modal.field}>
              <label style={modal.label}>USERNAME</label>
              <input
                style={modal.input}
                value={form.username}
                onChange={e => { setForm({ ...form, username: e.target.value }); setStatus("idle"); }}
                placeholder="New admin username"
              />
            </div>
            <div style={modal.field}>
              <label style={modal.label}>PASSWORD</label>
              <input
                style={modal.input}
                type="password"
                value={form.password}
                onChange={e => { setForm({ ...form, password: e.target.value }); setStatus("idle"); }}
                placeholder="Set password"
              />
            </div>
            <button onClick={handleSave} style={modal.saveBtn}>Save Account</button>
          </>
        )}

        <button onClick={onClose} style={modal.closeBtn}>Close</button>
      </div>
    </div>
  );
}

// ─── Admin Accounts List ──────────────────────────────────────────────────────
function AdminAccountsList() {
  const accounts = getAdminAccounts();
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ fontSize: 14, color: "#0a2378", marginBottom: 10, fontWeight: 700, letterSpacing: 1 }}>
        EXISTING ADMIN ACCOUNTS
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {accounts.map((a, i) => (
          <div key={i} style={{
            background: "#eff6ff", border: "1px solid #bfdbfe",
            borderRadius: 8, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontWeight: 700, color: "#0a2378", fontSize: 14 }}>{a.username}</span>
            {a.username === "Josep" && (
              <span style={{ fontSize: 11, background: "#0a2378", color: "#fff", padding: "2px 10px", borderRadius: 20 }}>
                SUPER ADMIN
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Homepage ───────────────────────────────────────────────────────────
function AdminHomepage({
  onAccessData,
  onAddAdmin,
  onLogout,
  loggedInAs,
}: {
  onAccessData: () => void;
  onAddAdmin: () => void;
  onLogout: () => void;
  loggedInAs: string;
}) {
  return (
    <div style={hp.page}>
      <div style={hp.circle1} />
      <div style={hp.circle2} />

      <nav style={hp.nav}>
        <span style={hp.badge}>Homepage</span>
        <span style={hp.adminTag}>ADMIN</span>
        <button onClick={onLogout} style={hp.logoutSmall}>← Logout</button>
      </nav>

      <div style={hp.hero}>
        <div style={hp.heroLeft}>
          <h1 style={hp.h1}>Web Title</h1>
          <p style={hp.desc}>Description<br />of the app</p>
          <div style={hp.btnRow}>
            <button onClick={onAddAdmin} style={{ ...hp.btn, ...hp.btnOutline }}>
              <PlusIcon /> Add admin account
            </button>
            <button onClick={onAccessData} style={{ ...hp.btn, ...hp.btnSolid }}>
              <DbIcon /> Access Data
            </button>
          </div>
        </div>

        <div style={hp.mascotWrap}>
          <ToothMascot />
        </div>
      </div>

      <div style={hp.bottomPanel}>
        <div style={hp.panelIcon}><UserIcon /></div>
        <div>
          <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>Logged in as</p>
          <strong style={{ fontSize: 16 }}>{loggedInAs} — Admin</strong>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={hp.dot} />
          <span style={{ fontSize: 12, opacity: 0.6 }}>Online</span>
        </div>
      </div>
    </div>
  );
}

// ─── Data Dashboard ───────────────────────────────────────────────────────────
function DataDashboard({ onBack, loggedInAs }: { onBack: () => void; loggedInAs: string }) {
  const [users, setUsers] = useState<User[]>(USERS);
  const [search, setSearch] = useState("");

  function toggleStatus(id: number) {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );
  }

  const filtered = users.filter(
    u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={dash.page}>
      <header style={dash.header}>
        <button onClick={onBack} style={dash.backBtn}>← Back</button>
        <h2 style={dash.title}>Data Dashboard</h2>
        <span style={dash.adminBadge}>ADMIN — {loggedInAs.toUpperCase()}</span>
      </header>

      <div style={dash.statsGrid}>
        {[
          { label: "Total Users", value: users.length,                                    color: "#3b82f6" },
          { label: "Active",      value: users.filter(u => u.status === "active").length,   color: "#22c55e" },
          { label: "Inactive",    value: users.filter(u => u.status === "inactive").length, color: "#f59e0b" },
          { label: "Banned",      value: users.filter(u => u.status === "banned").length,   color: "#ef4444" },
        ].map(s => (
          <div key={s.label} style={{ ...dash.statCard, borderTopColor: s.color }}>
            <p style={{ ...dash.statVal, color: s.color }}>{s.value}</p>
            <p style={dash.statLbl}>{s.label}</p>
          </div>
        ))}
      </div>

      <input
        style={dash.search}
        placeholder="🔍 Search users…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div style={dash.tableWrap}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["ID", "Name", "Email", "Status", "Joined", "Action"].map(h => (
                <th key={h} style={dash.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td style={dash.td}>{u.id}</td>
                <td style={dash.td}>{u.name}</td>
                <td style={dash.td}>{u.email}</td>
                <td style={dash.td}>
                  <span style={{ ...dash.statusPill, ...statusColor(u.status) }}>{u.status}</span>
                </td>
                <td style={dash.td}>{u.joined}</td>
                <td style={dash.td}>
                  <button
                    onClick={() => toggleStatus(u.id)}
                    disabled={u.status === "banned"}
                    style={dash.actionBtn}
                  >
                    {u.status === "active" ? "Deactivate" : u.status === "inactive" ? "Activate" : "Banned"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin accounts list */}
      <div style={{ padding: "0 32px 32px" }}>
        <AdminAccountsList />
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
type View = "home" | "data";

export default function AdminPage({
  onLogout,
  loggedInAs = "Josep",
}: {
  onLogout: () => void;
  loggedInAs?: string;
}) {
  const [view, setView]      = useState<View>("home");
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function statusColor(s: User["status"]) {
  return {
    active:   { background: "#dcfce7", color: "#166534" },
    inactive: { background: "#fef9c3", color: "#854d0e" },
    banned:   { background: "#fee2e2", color: "#991b1b" },
  }[s];
}
function PlusIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
}
function DbIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
}
function UserIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const hp: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#dde3f8 0%,#edeffe 50%,#d8e8fa 100%)", fontFamily: "'Nunito',sans-serif", padding: "28px 40px 0 40px", position: "relative", overflow: "hidden" },
  circle1: { position: "absolute", width: 420, height: 420, borderRadius: "50%", border: "2px solid rgba(10,35,120,.08)", top: -90, left: -70, pointerEvents: "none" },
  circle2: { position: "absolute", width: 270, height: 270, borderRadius: "50%", border: "2px solid rgba(10,35,120,.05)", top: 5, left: 25, pointerEvents: "none" },
  nav: { display: "flex", alignItems: "center", gap: 12, marginBottom: 36, position: "relative" },
  badge: { background: "#0a2378", color: "#fff", fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 8 },
  adminTag: { background: "rgba(10,35,120,.1)", color: "#0a2378", fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(10,35,120,.2)" },
  logoutSmall: { marginLeft: "auto", background: "transparent", border: "1px solid rgba(10,35,120,.3)", borderRadius: 8, padding: "6px 14px", color: "#0a2378", fontSize: 12, cursor: "pointer" },
  hero: { display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "flex-end", position: "relative" },
  heroLeft: { paddingBottom: 24 },
  h1: { fontSize: 54, fontWeight: 900, color: "#0a1e6e", lineHeight: 1.1, marginBottom: 12 },
  desc: { fontSize: 32, fontWeight: 700, color: "#1a3a9e", lineHeight: 1.3, marginBottom: 28 },
  btnRow: { display: "flex", gap: 14, flexWrap: "wrap" as const },
  btn: { display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 24, fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none" },
  btnOutline: { background: "rgba(255,255,255,.75)", color: "#0a2378", border: "2px solid #0a2378" },
  btnSolid: { background: "#0a2378", color: "#fff" },
  mascotWrap: { width: 260, background: "#b8dcf5", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, minHeight: 240, flexShrink: 0 },
  bottomPanel: { background: "#0a2378", borderRadius: "12px 12px 0 0", padding: "22px 28px", marginTop: 8, display: "flex", alignItems: "center", gap: 16, color: "#fff" },
  panelIcon: { width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#4ade80" },
};

const dash: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f8faff", fontFamily: "'Nunito',sans-serif" },
  header: { background: "#0a2378", color: "#fff", display: "flex", alignItems: "center", gap: 16, padding: "20px 32px" },
  backBtn: { background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 8, padding: "8px 16px", color: "#fff", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: 13 },
  title: { fontSize: 20, fontWeight: 700, flex: 1 },
  adminBadge: { fontSize: 12, opacity: 0.7, letterSpacing: 1 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, padding: "24px 32px" },
  statCard: { background: "#fff", borderRadius: 12, padding: "20px 16px", boxShadow: "0 1px 4px rgba(0,0,0,.06)", borderTop: "3px solid" },
  statVal: { fontSize: 28, fontWeight: 900, margin: "0 0 4px" },
  statLbl: { fontSize: 12, color: "#64748b", margin: 0, letterSpacing: 1 },
  search: { display: "block", width: "calc(100% - 64px)", margin: "0 32px 16px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 16px", fontSize: 14, outline: "none", fontFamily: "'Nunito',sans-serif" },
  tableWrap: { margin: "0 32px 24px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "auto" },
  th: { padding: "12px 16px", textAlign: "left" as const, fontSize: 11, letterSpacing: 2, color: "#0a2378", borderBottom: "1px solid #e2e8f0", background: "#f8faff", fontWeight: 700 },
  td: { padding: "12px 16px", fontSize: 13, color: "#334155", borderBottom: "1px solid #f1f5f9" },
  statusPill: { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const },
  actionBtn: { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 6, padding: "5px 12px", color: "#1d4ed8", fontSize: 12, cursor: "pointer", fontFamily: "'Nunito',sans-serif" },
};

const modal: Record<string, React.CSSProperties> = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 },
  card: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 },
  title: { fontSize: 20, fontWeight: 700, color: "#0a2378", margin: 0 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b" },
  input: { background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" as const },
  saveBtn: { background: "#0a2378", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  closeBtn: { background: "transparent", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px", color: "#64748b", fontSize: 14, cursor: "pointer" },
};
