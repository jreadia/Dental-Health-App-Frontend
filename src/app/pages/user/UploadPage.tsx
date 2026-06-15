import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/ui/PageLayout';
import { DisclaimerModal } from '../../components/DisclaimerModal';
import { ImageDropzone } from '../../components/ui/ImageDropzone';
import { Button } from '../../components/ui/Button';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { uploadDentalImage } from '../../../api/dental';

export default function UploadPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <PageLayout className="flex flex-col items-center justify-center p-6">
      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onClose={() => setShowDisclaimer(false)} 
      />

      {isUploading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-[2rem]">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-[#00004d]">Processing Image</h3>
            <p className="text-slate-500 mt-2">Analyzing dental calculus...</p>
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
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Disclaimer:</span> This project is not based on a clinical study. Results are for
            demonstration only — please consult a doctor or dentist for real dental concerns.
          </p>
        </div>

        <ImageDropzone 
          selectedImage={selectedImage} 
          onImageSelected={(file, url) => {
            setSelectedFile(file);
            setSelectedImage(url);
          }} 
        />

        <div className="mt-12 flex justify-between items-center">
          <Button onClick={() => navigate('/homepage')} variant="outline" className="px-8 py-3 rounded-xl h-auto bg-white">
            Cancel
          </Button>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-[#00004d] mb-3 tracking-widest">SHOW RESULT</span>
            <button 
              disabled={isUploading}
              onClick={async () => {
                if (!selectedFile) {
                  alert("Please upload an image first to see the results.");
                  return;
                }
                setIsUploading(true);
                try {
                  const result = await uploadDentalImage(selectedFile);
                  
                  const imageUrl = result.annotatedImageUrl || result.imageUrl || URL.createObjectURL(selectedFile);
                  
                  const newResult = {
                    id: result.imageId || result.id || result._id || Date.now().toString(),
                    date: result.uploadDate ? new Date(result.uploadDate).toLocaleDateString() : new Date().toLocaleDateString(),
                    plaques: result.mlResults?.calculusAmount || 0,
                    status: result.mlResults?.overall_diagnosis || "Healthy",
                  };

                  // Append to sessionStorage cache to prevent Firebase read on Homepage
                  const cached = sessionStorage.getItem('dentalHistory');
                  if (cached) {
                    const parsed = JSON.parse(cached);
                    sessionStorage.setItem('dentalHistory', JSON.stringify([newResult, ...parsed]));
                  } else {
                    sessionStorage.setItem('dentalHistory', JSON.stringify([newResult]));
                  }

                  navigate('/results', { state: { resultData: newResult, uploadedImage: imageUrl } });
                } catch (e) {
                  alert("Failed to upload image. Please try again.");
                } finally {
                  setIsUploading(false);
                }
              }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                selectedFile ? 'bg-[#00004d] text-white hover:bg-blue-900' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ArrowRight className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
