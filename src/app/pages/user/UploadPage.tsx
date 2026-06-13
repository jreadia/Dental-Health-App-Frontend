import React, { useState } from 'react';
import { PageLayout } from '../../components/ui/PageLayout';
import { DisclaimerModal } from '../../components/DisclaimerModal';
import { ImageDropzone } from '../../components/ui/ImageDropzone';
import { Button } from '../../components/ui/Button';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface UploadPageProps {
  onShowResult?: (imageUrl: string) => void;
  onCancel?: () => void;
}

export default function UploadPage({ onShowResult, onCancel }: UploadPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <PageLayout className="flex flex-col items-center justify-center p-6">
      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onClose={() => setShowDisclaimer(false)} 
      />

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
          onImageSelected={setSelectedImage} 
        />

        <div className="mt-12 flex justify-between items-center">
          <Button onClick={onCancel} variant="outline" className="px-8 py-3 rounded-xl h-auto bg-white">
            Cancel
          </Button>
          
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
              <ArrowRight className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
