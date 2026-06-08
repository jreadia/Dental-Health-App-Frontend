import { useState } from "react";

interface SignupPageProps {
  onBackToLogin: () => void;
  onAccountCreated: () => void;
}

export function SignupPage({ onBackToLogin, onAccountCreated }: SignupPageProps) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up submitted:", { username, password, confirmPassword, firstname, lastname });
    onAccountCreated();
  };

  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#d4d4e8' }}>
      {/* Decorative curved lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 right-0 w-64 h-64 translate-x-20 -translate-y-20" viewBox="0 0 200 200">
          <path d="M 0,100 Q 50,50 100,100 T 200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-96 h-96 -translate-x-32 translate-y-32" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </svg>
      </div>

      {/* SIGN UP label */}
      <div className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full" style={{ fontSize: '13px', fontWeight: '700' }}>
        SIGN UP
      </div>

      {/* Sign Up Card */}
      <div className="w-full max-w-sm px-6 relative z-10">
        <div className="bg-[#00004d] rounded-2xl px-8 py-12 shadow-2xl">
          <h1 className="text-white text-center mb-8" style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '0.5px' }}>
            SIGN UP
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-0">
              <label htmlFor="username" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                USERNAME:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="firstname" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                FIRSTNAME:
              </label>
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="lastname" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                LASTNAME:
              </label>
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="password" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                PASSWORD:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="confirmPassword" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                CONFIRM PASSWORD:
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="pt-6 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-white text-sm hover:underline"
                style={{ fontWeight: '400' }}
              >
                Or Log In
              </button>

              <button
                type="submit"
                className="bg-white text-[#00004d] rounded px-4 py-1.5 hover:bg-gray-100 transition-colors text-xs"
                style={{ fontWeight: '700' }}
              >
                CREATE ACCOUNT
              </button>
              
            </div>

            <div className="text-center text-white text-xs pt-2" style={{ fontWeight: '400' }}>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
