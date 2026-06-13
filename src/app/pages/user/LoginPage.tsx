import React, { useState } from "react";
import { PageLayout } from "../../components/ui/PageLayout";
import { Button } from "../../components/ui/Button";

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
    onLoginSubmit(username, password);
  };

  return (
    <PageLayout variant="blobs" className="flex items-center justify-center">
      {/* LOGIN PAGE badge */}
      <div
        className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full shadow-lg z-20"
        style={{ fontSize: "13px", fontWeight: "700" }}
      >
        LOGIN PAGE
      </div>

      {/* Card */}
      <div className="w-full max-w-sm relative z-10 px-4 mt-20">
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

            <Button type="submit" variant="gradient" className="w-full rounded-xl py-3 h-auto">
              Login
            </Button>

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
    </PageLayout>
  );
}