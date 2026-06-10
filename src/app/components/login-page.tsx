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

<<<<<<< HEAD
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
=======
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
>>>>>>> admin-page
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
<<<<<<< HEAD
                placeholder="Username"
                className={inputClass}
                required
              />
=======
                className="flex-1 rounded px-3 py-1 outline-none text-sm bg-white"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="password" className="text-white text-sm min-w-[100px]" style={{ fontWeight: '600' }}>
                PASSWORD:
              </label>
>>>>>>> admin-page
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
                placeholder="Password"
                className={inputClass}
=======
                className="flex-1 rounded px-3 py-1 outline-none text-sm bg-white"
                style={{ fontWeight: '400' }}
>>>>>>> admin-page
                required
              />
            </div>

<<<<<<< HEAD
            {/* Submit */}
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
                  className="text-white hover:underline"
                  style={{ fontWeight: "600" }}
                >
                  Sign up
                </button>
              </p>
=======
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
>>>>>>> admin-page
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
