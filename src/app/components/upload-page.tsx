import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import apiClient from '../apiClient';

interface UploadPageProps {
  onShowResult?: (imageUrl: string, apiResult?: any) => void;
  onCancel?: () => void;
}

export default function UploadPage({ onShowResult, onCancel }: UploadPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    if (fileInputRef.current && !isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
      setError("");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isUploading) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUploading) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
      setError("");
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (isUploading) return;
    
    setSelectedImage(null);
    setSelectedFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  const handleUploadAndShowResult = async () => {
    if (!selectedFile || !selectedImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await apiClient.post('/dental-images', formData);
      
      if (onShowResult) {
        onShowResult(selectedImage, response.data);
      }
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.response?.data?.message || "Failed to upload image to ML service.");
      setIsUploading(false); // Only stop loading if failed, otherwise we navigate away
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: '#d4d4e8' }}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <svg className="absolute top-0 right-0 w-64 h-64 translate-x-20 -translate-y-20" viewBox="0 0 200 200">
          <path d="M 0,100 Q 50,150 100,100 T 200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        </svg>
      </div>

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl border border-white/40 p-10 z-10 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#00004d]">UPLOAD IMAGE</h2>
          <p className="text-slate-500 mt-2">Upload a photo of teeth for calculus checking</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
            {error}
          </div>
        )}

        <div 
          onClick={handleBoxClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 min-h-[300px] overflow-hidden relative group ${
            isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${
            isDragging 
              ? 'border-blue-500 bg-blue-100/50' 
              : 'border-[#00004d]/30 bg-blue-50/50 hover:bg-blue-50 hover:border-[#00004d]/60'
          }`}
        >
          {selectedImage ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img src={selectedImage} alt="Uploaded preview" className="max-h-64 object-contain rounded-lg shadow-sm" />
              <button onClick={handleRemoveImage} disabled={isUploading} className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors disabled:opacity-50">
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
          
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} disabled={isUploading} />
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button onClick={onCancel} disabled={isUploading} className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-[#00004d] mb-3 tracking-widest">{isUploading ? 'PROCESSING...' : 'SHOW RESULT'}</span>
            <button 
              onClick={handleUploadAndShowResult}
              disabled={!selectedImage || isUploading}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                selectedImage && !isUploading ? 'bg-[#00004d] text-white hover:bg-blue-900' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              } ${isUploading ? 'animate-pulse' : ''}`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isUploading ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}