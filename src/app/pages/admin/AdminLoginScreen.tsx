import React, { useState } from "react";
import { loginAdmin } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

export function AdminLoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginAdmin({ email: username, password });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('loggedInAs', username);
      
      if (response?.admin?.isSuperAdmin) {
        localStorage.setItem('isSuperAdmin', 'true');
      } else {
        localStorage.removeItem('isSuperAdmin');
      }

      navigate('/admin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Invalid admin credentials. Access denied.");
      } else {
        setError("Invalid admin credentials. Access denied.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={als.bg}>
      <div style={als.grid} />

      <div style={als.card}>
        <div style={als.badge}>🔒 ADMIN ACCESS</div>

        <h1 style={als.title}>
          <span style={{ color: "#3b82f6" }}>⬡</span> Admin Portal
        </h1>
        <p style={als.sub}>This area is restricted. Enter your admin credentials.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={als.label}>ADMIN EMAIL</label>
            <input
              style={als.input}
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(""); }}
              placeholder="Enter admin email"
              autoComplete="off"
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={als.label}>ADMIN PASSWORD</label>
            <input
              style={als.input}
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <p style={als.error}>⚠ {error}</p>
          )}

          <button type="submit" style={als.btn} disabled={loading}>{loading ? "VERIFYING..." : "ENTER ADMIN →"}</button>

          <button type="button" onClick={() => navigate('/login')} style={als.backBtn}>
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

const als: Record<string, React.CSSProperties> = {
  bg: {
    minHeight: "100vh",
    background: "#080c14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', monospace",
    position: "relative",
    overflow: "hidden",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(59,130,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.04) 1px,transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  card: {
    background: "#0d1424",
    border: "1px solid #1e3a5f",
    borderRadius: 16,
    padding: "48px 40px",
    width: "100%",
    maxWidth: 440,
    position: "relative",
    zIndex: 1,
    boxShadow: "0 0 60px rgba(59,130,246,.08)",
  },
  badge: {
    display: "inline-block",
    background: "rgba(59,130,246,.1)",
    color: "#60a5fa",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    padding: "4px 12px",
    borderRadius: 4,
    marginBottom: 20,
    border: "1px solid rgba(59,130,246,.2)",
  },
  title: {
    color: "#f1f5f9",
    fontSize: 28,
    fontWeight: 700,
    margin: "0 0 8px",
  },
  sub: {
    color: "#475569",
    fontSize: 13,
    margin: "0 0 32px",
  },
  label: {
    color: "#60a5fa",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
  },
  input: {
    background: "#111827",
    border: "1px solid #1e3a5f",
    borderRadius: 8,
    padding: "12px 16px",
    color: "#f1f5f9",
    fontSize: 14,
    outline: "none",
    fontFamily: "'Courier New', monospace",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  error: {
    color: "#fca5a5",
    fontSize: 13,
    margin: 0,
    background: "rgba(127,29,29,.3)",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid rgba(252,165,165,.2)",
  },
  btn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "14px 24px",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 2,
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    width: "100%",
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #1e3a5f",
    borderRadius: 8,
    padding: "10px",
    color: "#475569",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    width: "100%",
  },
};
