import React from "react";
import { ToothMascot } from "../../../components/pictures/ToothMascot";
import { Plus, Database, User } from "lucide-react";
import { Button } from "../../../components/ui/Button";

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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end relative z-10">
        <div className="pb-6">
          <h1 className="text-[54px] font-black text-[#0a1e6e] leading-[1.1] mb-3">
            Web Title
          </h1>
          <p className="text-[32px] font-bold text-[#1a3a9e] leading-[1.3] mb-7">
            Description<br />of the app
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <Button onClick={onAddAdmin} variant="outline" className="rounded-full px-[22px] py-[11px] h-auto border-2 border-[#0a2378] text-[#0a2378]">
              <Plus className="w-4 h-4 mr-2" /> Add admin account
            </Button>
            <Button onClick={onAccessData} variant="default" className="rounded-full px-[22px] py-[11px] h-auto bg-[#0a2378]">
              <Database className="w-4 h-4 mr-2" /> Access Data
            </Button>
          </div>
        </div>

        <div className="w-[260px] bg-[#b8dcf5] rounded-xl flex items-center justify-center p-4 min-h-[240px] shrink-0">
          <ToothMascot />
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
