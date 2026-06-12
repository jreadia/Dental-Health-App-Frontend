import { useState } from "react";
import UploadPage from "./components/upload-page";
import ResultPage from "./components/result-page";
import { LoginPage } from "./components/login-page";
import { SignupPage } from "./components/signup-page";
import { SuccessPage } from "./components/success-page";
import { LoadingPage } from "./components/loading-page";
import { Homepage } from "./components/homepage";
import AdminPage from "./components/admin-page";
import { isAdminAccount, isSecretTrigger } from "./adminAccounts";

type Page =
  | "login" | "signup" | "success" | "loading" | "homepage" | "upload" | "results" | "admin-login" | "admin";

export interface HistoryItem {
  id: string;
  date: string;
  plaques: number;
  status: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<HistoryItem | null>(null);
  const [scanHistory, setScanHistory] = useState<HistoryItem[]>([]);
  const [loggedInAs, setLoggedInAs] = useState("");

  const handleShowResult = (imageUrl: string) => {
    const plaques = Math.floor(Math.random() * 13);

    // Oral Health Status: healthy = 0, mild = 1-5, unhealthy = 6+
    let status = "Healthy";
    if (plaques >= 6) status = "Unhealthy";
    else if (plaques >= 1) status = "Mild";

    const newResult: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      plaques,
      status,
    };

    setScannedImage(imageUrl);
    setCurrentResult(newResult);
    setScanHistory((prev) => [newResult, ...prev]);
    setCurrentPage("results");
  };

  function handleLogin(username: string, password: string) {
    if (isSecretTrigger(username, password)) {
      setCurrentPage("admin-login");
    } else {
      setCurrentPage("loading");
    }
  }

  function handleAdminLogin(username: string, password: string): boolean {
    if (isAdminAccount(username, password)) {
      setLoggedInAs(username);
      setCurrentPage("admin");
      return true;
    }
    return false;
  }

  return (
    <>
      {currentPage === "login" && (
        <LoginPage
          onSignUpClick={() => setCurrentPage("signup")}
          onLoginSubmit={handleLogin}
        />
      )}

      {currentPage === "signup" && (
        <SignupPage
          onBackToLogin={() => setCurrentPage("login")}
          onAccountCreated={() => setCurrentPage("success")}
        />
      )}

      {currentPage === "success" && (
        <SuccessPage onRedirectToLogin={() => setCurrentPage("login")} />
      )}

      {currentPage === "loading" && (
        <LoadingPage onLoadingComplete={() => setCurrentPage("homepage")} />
      )}

      {currentPage === "homepage" && (
        <Homepage
          history={scanHistory}
          onUploadClick={() => setCurrentPage("upload")}
          onHomeClick={() => setCurrentPage("homepage")}
          onLogout={() => {
            setScannedImage(null);
            setCurrentResult(null);
            setScanHistory([]);
            setCurrentPage("login");
          }}
        />
      )}

      {currentPage === "upload" && (
        <UploadPage
          onShowResult={handleShowResult}
          onCancel={() => setCurrentPage("homepage")}
        />
      )}

      {currentPage === "results" && (
        <ResultPage
          uploadedImage={scannedImage}
          resultData={currentResult}
          onGoHome={() => {
            setScannedImage(null);
            setCurrentResult(null);
            setCurrentPage("homepage");
          }}
        />
      )}

      {currentPage === "admin-login" && (
        <AdminLoginScreen
          onLogin={handleAdminLogin}
          onBack={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "admin" && (
        <AdminPage
          onLogout={() => {
            setLoggedInAs("");
            setCurrentPage("login");
          }}
          loggedInAs={loggedInAs}
        />
      )}
    </>
  );
}
// ─── Secret Admin Login Screen ────────────────────────────────────────────────
function AdminLoginScreen({
  onLogin,
  onBack,
}: {
  onLogin: (username: string, password: string) => boolean;
  onBack: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const success = onLogin(username, password);
    if (!success) setError("Invalid admin credentials. Access denied.");
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
            <label style={als.label}>ADMIN USERNAME</label>
            <input
              style={als.input}
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(""); }}
              placeholder="Enter admin username"
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

          <button type="submit" style={als.btn}>ENTER ADMIN →</button>

          <button type="button" onClick={onBack} style={als.backBtn}>
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