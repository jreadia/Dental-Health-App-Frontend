import React from "react";
import { Plus, Database, User } from "lucide-react";

interface AdminHomepageProps {
  onAccessData: () => void;
  onAddAdmin: () => void;
  onLogout: () => void;
  loggedInAs: string;
}

export function AdminHomepage({
  onAccessData,
  onAddAdmin,
  onLogout,
  loggedInAs,
}: AdminHomepageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden px-10 pt-7 pb-0 font-sans" 
         style={{ background: "linear-gradient(135deg, #dde3f8 0%, #edeffe 50%, #d8e8fa 100%)" }}>
      
      {/* Background Circles */}
      <div className="absolute w-[420px] h-[420px] rounded-full border-2 border-[#0a2378]/10 -top-[90px] -left-[70px] pointer-events-none" />
      <div className="absolute w-[270px] h-[270px] rounded-full border-2 border-[#0a2378]/5 top-[5px] left-[25px] pointer-events-none" />

      {/* Navigation */}
      <nav className="flex items-center gap-3 mb-9 relative z-10">
        <span className="bg-[#0a2378] text-white text-[13px] font-bold px-[18px] py-[8px] rounded-lg">
          Homepage
        </span>
        <span className="bg-[#0a2378]/10 text-[#0a2378] text-[11px] font-bold tracking-widest px-3.5 py-1.5 rounded-full border border-[#0a2378]/20">
          ADMIN
        </span>
        <button 
          onClick={onLogout} 
          className="ml-auto bg-transparent border border-[#0a2378]/30 rounded-lg px-3.5 py-1.5 text-[#0a2378] text-xs cursor-pointer hover:bg-white/50 transition-colors"
        >
          ← Logout
        </button>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 items-center relative z-10">

        {/* Left Panel */}
        <div className="pb-6 max-w-xl">
          <h1 className="text-[54px] font-black text-[#0a1e6e] leading-[1.1] mb-3">
            Admin Dashboard
          </h1>
          <h2 className="text-[32px] font-bold text-[#1a3a9e] leading-[1.3] mb-4">
            Dental Calculus Severity Checker
          </h2>
          <p className="text-[16px] text-[#1a3a9e]/80 leading-relaxed mb-7 max-w-lg font-medium">
            Upload a dental image to detect potential dental calculus using AI-powered image processing. The technology analyzes the image and produces an estimated oral health assessment that will help users keep track of their dental health.
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4 w-[280px]">
    
          <button
            onClick={onAccessData}
            className="
              bg-white/80
              backdrop-blur-md
              border border-white/50
              rounded-2xl
              p-5
              shadow-lg
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              flex items-center gap-4
              text-left
            "
          >
            <div className="w-12 h-12 rounded-xl bg-[#0a2378]/10 flex items-center justify-center">
              <Database className="w-6 h-6 text-[#0a2378]" />
            </div>

            <div>
              <h3 className="font-bold text-[#0a2378] text-lg">
                Access Data
              </h3>
            </div>
          </button>

          <button
            onClick={onAddAdmin}
            className="
              bg-white/80
              backdrop-blur-md
              border border-white/50
              rounded-2xl
              p-5
              shadow-lg
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              flex items-center gap-4
              text-left
            "
          >
            <div className="w-12 h-12 rounded-xl bg-[#0a2378]/10 flex items-center justify-center">
              <Plus className="w-6 h-6 text-[#0a2378]" />
            </div>

            <div>
              <h3 className="font-bold text-[#0a2378] text-lg">
                Add Admin
              </h3>
            </div>
          </button>

        </div>
      </div>
      
      {/* Bottom Panel */}
      <div className="bg-[#0a2378] rounded-t-xl py-5 px-7 mt-2 flex items-center gap-4 text-white relative z-10 shrink-0">
        <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs opacity-70 m-0 leading-tight">Logged in as</p>
          <strong className="text-base">{loggedInAs} — Admin</strong>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs opacity-60">Online</span>
        </div>
      </div>
    </div>
  );
}
