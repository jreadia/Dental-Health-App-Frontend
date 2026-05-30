import { useEffect } from "react";

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

export function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

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

      {/* Loading Card */}
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-[#00004d] rounded-2xl px-8 py-16 shadow-2xl text-center">
          <h1 className="text-white mb-8" style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '0.5px' }}>
            LOADING
          </h1>

          {/* Loading Spinner */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>

          <p className="text-white" style={{ fontSize: '16px', fontWeight: '400' }}>
            Verifying your account...
          </p>
        </div>
      </div>
    </div>
  );
}
