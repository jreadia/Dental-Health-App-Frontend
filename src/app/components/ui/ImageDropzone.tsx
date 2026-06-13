import React, { useRef, useState, ChangeEvent, DragEvent } from 'react';

interface ImageDropzoneProps {
  onImageSelected: (imageUrl: string | null) => void;
  selectedImage: string | null;
}

export function ImageDropzone({ onImageSelected, selectedImage }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
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
      onImageSelected(imageUrl);
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
      onImageSelected(imageUrl);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
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
  );
}
