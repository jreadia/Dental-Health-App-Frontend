import { useState } from "react";

interface LoginPageProps {
  onSignUpClick: () => void;
  onLoginSubmit: (username: string, password: string) => void;
}

export function LoginPage({ onSignUpClick, onLoginSubmit }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSubmit(username, password);
  };

  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#d4d4e8' }}>
      {/* Decorative curved lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-64 h-64 -translate-x-20 -translate-y-20" viewBox="0 0 200 200">
          <path d="M 0,100 Q 50,50 100,100 T 200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-96 h-96 -translate-x-32 translate-y-32" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </svg>
      </div>

      {/* LOGIN PAGE label */}
      <div className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full" style={{ fontSize: '13px', fontWeight: '700' }}>
        LOGIN PAGE
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm px-6 relative z-10">
        <div className="bg-[#00004d] rounded-2xl px-8 py-12 shadow-2xl">
          <h1 className="text-white text-center mb-8" style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '0.5px' }}>
            LOGIN
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <label htmlFor="username" className="text-white text-sm min-w-[100px]" style={{ fontWeight: '600' }}>
                USERNAME:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 rounded px-3 py-1 outline-none text-sm bg-white"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="password" className="text-white text-sm min-w-[100px]" style={{ fontWeight: '600' }}>
                PASSWORD:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 rounded px-3 py-1 outline-none text-sm bg-white"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={onSignUpClick}
                className="text-white text-sm hover:underline"
                style={{ fontWeight: '400' }}
              >
                Or Sign Up
              </button>

              <button
                type="submit"
                className="bg-white text-[#00004d] rounded px-6 py-1.5 hover:bg-gray-100 transition-colors text-sm"
                style={{ fontWeight: '700' }}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
