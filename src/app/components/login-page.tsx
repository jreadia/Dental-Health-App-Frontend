import { useState } from "react";

interface LoginPageProps {
  onSignUpClick: () => void;
  onLoginSubmit: (username: string, password: string) => void;
}

const inputClass =
  "w-full rounded-xl px-4 py-3 outline-none text-sm bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/60 focus:bg-white/15 transition-all";

export function LoginPage({ onSignUpClick, onLoginSubmit }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login submitted:", { username, password });

    // IMPORTANT: pass username + password to App.tsx
    onLoginSubmit(username, password);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#d4d4e8" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #818cf8, transparent)" }}
        />
      </div>

      {/* LOGIN PAGE badge */}
      <div
        className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full shadow-lg z-20"
        style={{ fontSize: "13px", fontWeight: "700" }}
      >
        LOGIN PAGE
      </div>

      {/* Card */}
      <div className="w-full max-w-sm relative z-10 px-4">
        <div className="bg-[#00004d] rounded-3xl px-10 py-12 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white mb-1" style={{ fontSize: "26px", fontWeight: "700" }}>
              Welcome!
            </h1>
            <p className="text-white/60" style={{ fontSize: "14px" }}>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
                className={inputClass}
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={inputClass}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl px-6 py-3 transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "white",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-white/60 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSignUpClick}
                  className="text-white hover:underline font-semibold"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}