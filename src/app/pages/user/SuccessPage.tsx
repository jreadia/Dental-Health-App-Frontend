import { useEffect } from "react";
import { CheckCircle, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const wasExistingUser = location.state?.wasExistingUser;

  useEffect(() => {
    // Give them more time to read if there's a notice
    const timeout = wasExistingUser ? 8000 : 3000;
    const timer = setTimeout(() => {
      navigate('/login');
    }, timeout);

    return () => clearTimeout(timer);
  }, [navigate, wasExistingUser]);

  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#d4d4e8' }}>
      {/* Decorative curved lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-64 h-64 -translate-x-20 -translate-y-20" viewBox="0 0 200 200">
          <path d="M 0,100 Q 50,50 100,100 T 200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-96 h-96 translate-x-32 translate-y-32" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </svg>
      </div>

      {/* Success Card */}
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-[#00004d] rounded-3xl p-8 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="size-16 text-green-400" strokeWidth={2} />
          </div>

          <h1 className="text-white mb-3" style={{ fontSize: '26px', fontWeight: '700' }}>
            Account Created!
          </h1>

          <p className="text-white/80 mb-6" style={{ fontSize: '15px' }}>
            Your user profile has been set up successfully.
          </p>

          {wasExistingUser && (
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-blue-300" />
                <span className="font-semibold text-blue-200">Important Notice</span>
              </div>
              <p className="text-blue-100/90 text-sm leading-relaxed">
                We detected that you already have an Admin account. Your password has been <strong>updated</strong> to the one you just entered. Please use this new password to log into both the Admin and User portals.
              </p>
            </div>
          )}

          <div className="text-white/60 text-sm animate-pulse">
            Redirecting to login page...
          </div>
        </div>
      </div>
    </div>
  );
}
