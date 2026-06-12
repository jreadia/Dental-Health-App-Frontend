import { useState, useRef, ChangeEvent, DragEvent } from 'react';

interface UploadPageProps {
  onShowResult?: (imageUrl: string) => void;
  onCancel?: () => void;
}

export default function UploadPage({ onShowResult, onCancel }: UploadPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: '#d4d4e8' }}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <svg className="absolute top-0 right-0 w-64 h-64 translate-x-20 -translate-y-20" viewBox="0 0 200 200">
          <path d="M 0,100 Q 50,150 100,100 T 200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        </svg>
      </div>

      {/* Disclaimer Modal (shown once before using the feature) */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#00004d] mb-3">Disclaimer</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              This tool is part of a student/academic project and is <span className="font-semibold">not based on a clinical study</span> or
              validated medical research. The results shown are for demonstration purposes only and should
              <span className="font-semibold"> not be used as a substitute for professional dental advice, diagnosis, or treatment</span>.
              Please consult a licensed dentist or doctor for any concerns about your dental health.
            </p>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="w-full bg-[#00004d] text-white font-semibold py-3 rounded-xl hover:bg-blue-900 transition-colors"
            >
              I Understand, Continue
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl border border-white/40 p-10 z-10 relative">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#00004d]">UPLOAD IMAGE</h2>
          <p className="text-slate-500 mt-2">Upload a photo of teeth for calculus checking</p>
        </div>

        {/* Persistent disclaimer banner */}
        <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Disclaimer:</span> This project is not based on a clinical study. Results are for
            demonstration only — please consult a doctor or dentist for real dental concerns.
          </p>
        </div>

        <div 
          onClick={handleBoxClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer min-h-[300px] overflow-hidden relative group ${
            isDragging 
              ? 'border-blue-500 bg-blue-100/50' 
              : 'border-[#00004d]/30 bg-blue-50/50 hover:bg-blue-50 hover:border-[#00004d]/60'
          }`}
        >
          {selectedImage ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img src={selectedImage} alt="Uploaded preview" className="max-h-64 object-contain rounded-lg shadow-sm" />
              <button onClick={handleRemoveImage} className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors">
                Remove Image
              </button>
            </div>
          ) : (
            <>
              <svg className={`w-16 h-16 mb-6 transition-colors ${isDragging ? 'text-blue-500' : 'text-[#00004d]/50 group-hover:text-[#00004d]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[#00004d] font-semibold text-lg text-center">
                {isDragging ? 'Drop image here!' : 'Click to browse or drag image here'}
              </span>
              <span className="text-sm text-slate-500 mt-2 text-center">Supported formats: JPG, PNG, WEBP</span>
            </>
          )}
          
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button onClick={onCancel} className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-[#00004d] mb-3 tracking-widest">SHOW RESULT</span>
            <button 
              onClick={() => {
                if (!selectedImage) {
                  alert("Please upload an image first to see the results.");
                  return;
                }
                if (onShowResult) onShowResult(selectedImage);
              }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                selectedImage ? 'bg-[#00004d] text-white hover:bg-blue-900' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
