import { useState } from "react";


interface SignupPageProps {
  onBackToLogin: () => void;
  onAccountCreated: () => void;
}

export function SignupPage({ onBackToLogin, onAccountCreated }: SignupPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Sign up submitted:", { firstName, lastName, username, password, confirmPassword });
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
      <div className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full shadow-lg" style={{ fontSize: '13px', fontWeight: '700' }}>
        SIGN UP
      </div>

      {/* Sign Up Card */}
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-[#00004d] rounded-3xl px-10 py-10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-white mb-2" style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px' }}>
              Create Account
            </h1>
            <p className="text-white opacity-80" style={{ fontSize: '14px', fontWeight: '400' }}>
              Sign up to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm text-center" style={{ fontWeight: '600' }}>
                {error}
              </div>
            )}

            <div>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full rounded-lg px-4 py-2.5 outline-none text-sm bg-white shadow-sm border-2 border-transparent focus:border-blue-400 transition-colors"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full rounded-lg px-4 py-2.5 outline-none text-sm bg-white shadow-sm border-2 border-transparent focus:border-blue-400 transition-colors"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email/Username"
                className="w-full rounded-lg px-4 py-2.5 outline-none text-sm bg-white shadow-sm border-2 border-transparent focus:border-blue-400 transition-colors"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg px-4 py-2.5 outline-none text-sm bg-white shadow-sm border-2 border-transparent focus:border-blue-400 transition-colors"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full rounded-lg px-4 py-2.5 outline-none text-sm bg-white shadow-sm border-2 border-transparent focus:border-blue-400 transition-colors"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-[#00004d] rounded-lg px-6 py-2.5 hover:bg-gray-100 transition-all shadow-md mt-6"
              style={{ fontWeight: '700', fontSize: '14px' }}
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-white text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="hover:underline"
                  style={{ fontWeight: '600' }}
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
