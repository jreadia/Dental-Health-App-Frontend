import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: "default" | "blobs";
  className?: string;
}

export function PageLayout({ children, variant = "default", className = "" }: PageLayoutProps) {
  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden overflow-y-auto flex flex-col"
      style={{ backgroundColor: "#d4d4e8" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {variant === "default" && (
          <>
            <svg
              className="absolute top-0 right-0 w-64 h-64 translate-x-20 -translate-y-20 opacity-50"
              viewBox="0 0 200 200"
            >
              <path
                d="M 0,100 Q 50,150 100,100 T 200,100"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-96 h-96 -translate-x-32 translate-y-32 opacity-50"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
            </svg>
          </>
        )}

        {variant === "blobs" && (
          <>
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
            />
            <div
              className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #818cf8, transparent)" }}
            />
          </>
        )}
      </div>

      <div className={`relative z-10 w-full min-h-screen ${className}`}>
        {children}
      </div>
    </div>
  );
}
