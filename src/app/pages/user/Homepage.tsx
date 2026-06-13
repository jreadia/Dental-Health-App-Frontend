import React from "react";
import { PageLayout } from "../../components/ui/PageLayout";
import { Button } from "../../components/ui/Button";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Home, LogOut, FileClock, ChevronRight } from "lucide-react";

interface HistoryItem {
  id: string;
  date: string;
  plaques: number;
  status: string;
}

interface HomepageProps {
  onUploadClick?: () => void;
  onHomeClick?: () => void;
  onLogout?: () => void;
  history?: HistoryItem[];
}

export function Homepage({ onUploadClick, onHomeClick, onLogout, history = [] }: HomepageProps) {
  return (
    <PageLayout>
      {/* Top Bar: Home + Logout */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <Button onClick={onHomeClick} variant="default" className="rounded-full">
          <Home className="w-4 h-4 mr-2" /> Home
        </Button>

        <Button onClick={onLogout} variant="secondary" className="rounded-full">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="size-full min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side - Text Content & History List */}
          <div className="flex-1 w-full">
            <h1 className="text-[#00004d] mb-2 text-[48px] font-bold leading-[1.2]">
              Dental Diagnostics
            </h1>
            <h2 className="text-[#00004d] mb-4 text-[32px] font-semibold leading-[1.2]">
              Presentation
            </h2>
            <p className="text-[#00004d] mb-8 text-[14px] font-normal">
              Watch the web page
            </p>

            {/* History List Section */}
            <div className="w-full max-w-md">
              <h3 className="text-[#00004d] font-bold text-lg mb-3 flex items-center gap-2">
                <FileClock className="w-5 h-5" /> Recent Scans
              </h3>

              {history.length > 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl w-full max-h-48 overflow-y-auto shadow-sm border border-white/50 p-2 space-y-2 custom-scrollbar">
                  {history.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">{item.date}</p>
                        <p className="text-sm font-bold text-[#00004d]">{item.plaques} Plaque(s) Detected</p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#00004d]/5 border-2 border-dashed border-[#00004d]/20 rounded-2xl w-full h-32 flex flex-col items-center justify-center text-center p-6">
                  <p className="text-[#00004d]/60 font-medium text-sm">No scan history available.</p>
                  <p className="text-[#00004d]/40 text-xs mt-1">Upload an image to see your results here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Tooth Character */}
          <div className="flex-shrink-0 relative mt-8 md:mt-0">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-blue-200 rounded-full opacity-50"></div>

              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <path
                  d="M 30,35 Q 30,25 40,25 L 60,25 Q 70,25 70,35 L 70,60 Q 70,70 65,75 Q 60,75 60,70 L 60,65 Q 55,70 50,70 Q 45,70 40,65 L 40,70 Q 40,75 35,75 Q 30,70 30,60 Z"
                  fill="white"
                  stroke="#00004d"
                  strokeWidth="2"
                />
                <circle cx="42" cy="45" r="3" fill="#00004d" />
                <circle cx="58" cy="45" r="3" fill="#00004d" />
                <path d="M 40,52 Q 50,58 60,52" fill="none" stroke="#00004d" strokeWidth="2" strokeLinecap="round" />
                <circle cx="75" cy="45" r="8" fill="none" stroke="#00004d" strokeWidth="2" />
                <line x1="81" y1="51" x2="88" y2="58" stroke="#00004d" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <button
                onClick={onUploadClick}
                className="absolute bottom-0 right-0 bg-[#00004d] text-white rounded-full p-3 hover:opacity-90 transition-opacity shadow-lg"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
