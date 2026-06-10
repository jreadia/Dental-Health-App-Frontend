interface ResultPageProps {
  onGoHome?: () => void;
  uploadedImage?: string | null;
  apiResult?: any;
}

export default function ResultPage({ onGoHome, uploadedImage, apiResult }: ResultPageProps) {
  // Extract info from apiResult or fallback to mock data
  const hasCalculus = apiResult?.hasCalculus ?? true; // fallback to true for the UI mockup
  const confidenceScore = apiResult?.confidenceScore ?? 94; // fallback to 94%
  const message = apiResult?.message ?? "Professional cleaning recommended";
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-16 relative overflow-hidden" style={{ backgroundColor: '#d4d4e8' }}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <svg className="absolute bottom-0 left-0 w-96 h-96 -translate-x-32 translate-y-32" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-md flex flex-col items-start space-y-8 z-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-[#00004d] leading-tight">
            Diagnostic<br />Result
          </h1>
          <p className="text-lg text-[#00004d]/80 font-medium">
            AI analysis complete. Please review the visual classification of the dental calculus on the right.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 w-full sm:w-auto">
          <button 
            onClick={onGoHome}
            className="bg-[#00004d] hover:bg-blue-900 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all hover:-translate-y-1"
          >
            Upload Another Image
          </button>
        </div>
      </div>

      <div className="relative w-80 h-[620px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl border-4 border-gray-800 z-10 flex-shrink-0">
        <div className="w-full h-full bg-slate-50 rounded-[2.25rem] overflow-hidden relative flex flex-col pt-16 pb-8 px-6 text-center shadow-inner">
          
          <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-3xl w-40 mx-auto z-20"></div>

          <div className="flex-1 flex flex-col items-center">
            {hasCalculus ? (
              <div className="w-full bg-rose-100 border border-rose-200 text-rose-800 p-4 rounded-2xl mb-6">
                <h3 className="text-lg font-bold mb-1">Calculus Detected</h3>
                <p className="text-sm font-medium opacity-80">{message}</p>
              </div>
            ) : (
              <div className="w-full bg-green-100 border border-green-200 text-green-800 p-4 rounded-2xl mb-6">
                <h3 className="text-lg font-bold mb-1">Healthy Teeth</h3>
                <p className="text-sm font-medium opacity-80">No significant calculus detected</p>
              </div>
            )}

            {uploadedImage ? (
              <div className="w-full flex-1 border-2 border-slate-200 rounded-2xl overflow-hidden bg-black mb-6 flex items-center justify-center">
                <img 
                  src={uploadedImage} 
                  alt="Scanned Teeth" 
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            ) : (
              <div className="w-full flex-1 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-white mb-6">
                <svg className="w-12 h-12 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 className="text-sm font-bold text-slate-400 tracking-wider px-4">NO IMAGE UPLOADED</h4>
              </div>
            )}
            
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#00004d] rounded-full transition-all duration-1000" style={{ width: `${confidenceScore}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-2">{confidenceScore}% Confidence Score</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}