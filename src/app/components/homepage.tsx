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
    <div className="size-full relative overflow-hidden" style={{ backgroundColor: '#d4d4e8', minHeight: '100vh' }}>

      {/* Decorative curved lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 right-0 w-64 h-64 translate-x-20 -translate-y-20" viewBox="0 0 200 200">
          <path d="M 0,100 Q 50,150 100,100 T 200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-96 h-96 -translate-x-32 translate-y-32" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </svg>
      </div>

      {/* Top Bar: Home + Logout */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <button
          onClick={onHomeClick}
          className="bg-[#00004d] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ fontSize: '13px', fontWeight: '600' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6" /></svg>
          Home
        </button>

        <button
          onClick={onLogout}
          className="bg-white/70 text-[#00004d] border border-[#00004d]/30 px-6 py-2 rounded-full hover:bg-white transition-colors flex items-center gap-2"
          style={{ fontSize: '13px', fontWeight: '600' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>

      <div className="size-full min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left Side - Text Content & History List */}
          <div className="flex-1 w-full">
            <h1 className="text-[#00004d] mb-2" style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.2' }}>
              Dental Diagnostics
            </h1>
            <h2 className="text-[#00004d] mb-4" style={{ fontSize: '32px', fontWeight: '600', lineHeight: '1.2' }}>
              Presentation
            </h2>
            <p className="text-[#00004d] mb-8" style={{ fontSize: '14px', fontWeight: '400' }}>
              Watch the web page
            </p>

            {/* History List Section */}
            <div className="w-full max-w-md">
              <h3 className="text-[#00004d] font-bold text-lg mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Recent Scans
              </h3>

              {history.length > 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl w-full max-h-48 overflow-y-auto shadow-sm border border-white/50 p-2 space-y-2 custom-scrollbar">
                  {history.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">{item.date}</p>
                        <p className="text-sm font-bold text-[#00004d]">{item.plaques} Plaque(s) Detected</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Very Unhealthy' ? 'bg-rose-100 text-rose-700' :
                        item.status === 'Unhealthy' ? 'bg-orange-100 text-orange-700' :
                        item.status === 'Somewhat Safe' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item.status}
                      </span>
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
