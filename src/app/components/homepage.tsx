export function Homepage() {
  return (
    <div className="size-full relative overflow-hidden" style={{ backgroundColor: '#d4d4e8' }}>
      {/* Decorative curved lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 right-0 w-64 h-64 translate-x-20 -translate-y-20" viewBox="0 0 200 200">
          <path d="M 0,100 Q 50,150 100,100 T 200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-96 h-96 -translate-x-32 translate-y-32" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </svg>
      </div>

      {/* Dashboard Button */}
      <div className="absolute top-6 left-6">
        <button className="bg-[#00004d] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity" style={{ fontSize: '13px', fontWeight: '600' }}>
          Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="size-full flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-6xl flex items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1">
            <h1 className="text-[#00004d] mb-2" style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.2' }}>
              Web Title
            </h1>
            <h2 className="text-[#00004d] mb-4" style={{ fontSize: '32px', fontWeight: '600', lineHeight: '1.2' }}>
              Presentation
            </h2>
            <p className="text-[#00004d] mb-8" style={{ fontSize: '14px', fontWeight: '400' }}>
              Watch the web page
            </p>

            {/* Dark Blue Rectangle */}
            <div className="bg-[#00004d] rounded-2xl w-full h-32"></div>
          </div>

          {/* Right Side - Tooth Character */}
          <div className="flex-shrink-0 relative">
            {/* Tooth Character Illustration */}
            <div className="relative w-48 h-48">
              {/* Light blue circle background */}
              <div className="absolute inset-0 bg-blue-200 rounded-full opacity-50"></div>

              {/* Tooth body */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <path
                  d="M 30,35 Q 30,25 40,25 L 60,25 Q 70,25 70,35 L 70,60 Q 70,70 65,75 Q 60,75 60,70 L 60,65 Q 55,70 50,70 Q 45,70 40,65 L 40,70 Q 40,75 35,75 Q 30,70 30,60 Z"
                  fill="white"
                  stroke="#00004d"
                  strokeWidth="2"
                />

                {/* Eyes */}
                <circle cx="42" cy="45" r="3" fill="#00004d" />
                <circle cx="58" cy="45" r="3" fill="#00004d" />

                {/* Smile */}
                <path d="M 40,52 Q 50,58 60,52" fill="none" stroke="#00004d" strokeWidth="2" strokeLinecap="round" />

                {/* Magnifying glass */}
                <circle cx="75" cy="45" r="8" fill="none" stroke="#00004d" strokeWidth="2" />
                <line x1="81" y1="51" x2="88" y2="58" stroke="#00004d" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* Arrow button */}
              <button className="absolute bottom-0 right-0 bg-[#00004d] text-white rounded-full p-3 hover:opacity-90 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
