import { useState } from "react";
import apiClient from "../apiClient";
import { useAuth } from "../AuthContext";

interface LoginPageProps {
  onSignUpClick: () => void;
  onLoginSubmit: () => void;
}

export function LoginPage({ onSignUpClick, onLoginSubmit }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Assuming backend expects email and password
      const response = await apiClient.post("/auth/users/login", {
        email: username,
        password
      });
      
      if (response.data && response.data.user) {
        setUser(response.data.user);
        onLoginSubmit();
      } else {
        // Fallback if the user object is just the response data
        setUser(response.data);
        onLoginSubmit();
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
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
      <div className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full shadow-lg" style={{ fontSize: '13px', fontWeight: '700' }}>
        LOGIN PAGE
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-[#00004d] rounded-3xl px-10 py-12 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-white mb-2" style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px' }}>
              Welcome!
            </h1>
            <p className="text-white opacity-80" style={{ fontSize: '14px', fontWeight: '400' }}>
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <button
              type="submit"
              className="w-full bg-white text-[#00004d] rounded-lg px-6 py-2.5 hover:bg-gray-100 transition-all shadow-md"
              style={{ fontWeight: '700', fontSize: '14px' }}
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-white text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSignUpClick}
                  className="hover:underline"
                  style={{ fontWeight: '600' }}
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
