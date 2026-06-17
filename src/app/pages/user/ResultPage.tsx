import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { PageLayout } from "../../components/ui/PageLayout";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Button } from "../../components/ui/Button";
import { Image as ImageIcon } from "lucide-react";


export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { resultData, uploadedImage } = location.state || {};

  if (!resultData) {
    return <Navigate to="/homepage" replace />;
  }

  const calculusCount = resultData?.calculusCount ?? 0;
  const calculusDetected = calculusCount > 0;

  // Oral health status based on calculus count
  // healthy = 0, mild = 1-5, unhealthy = 6+
  const getOralHealthStatus = (count: number) => {
    if (count === 0) return "Healthy";
    if (count >= 1 && count <= 5) return "Mild";
    return "Unhealthy";
  };
  const oralHealthStatus = getOralHealthStatus(calculusCount);

  return (
    <PageLayout className="flex flex-col md:flex-row items-center justify-center p-8 gap-16">
      
      <div className="max-w-md flex flex-col items-start space-y-8 z-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-[#00004d] leading-tight">
            Diagnostic<br />Result
          </h1>
          <p className="text-lg text-[#00004d]/80 font-medium">
            AI analysis complete. Please review the visual classification of the dental calculus on the right.
          </p>
        </div>

        {/* Result Summary Card */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6 space-y-4">
          {/* Calculus Detected */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#00004d]/70">Calculus Detected</span>
            <StatusBadge status={calculusDetected ? "Unhealthy" : "Healthy"}>
              {calculusDetected ? "Yes" : "No"}
            </StatusBadge>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#00004d]/70">Amount</span>
            <span className="text-lg font-extrabold text-[#00004d]">{calculusCount} Calculus</span>
          </div>

          {/* Oral Health Status */}
          <div className="flex items-center justify-between border-t border-[#00004d]/10 pt-4">
            <span className="text-sm font-semibold text-[#00004d]/70">Oral Health Status</span>
            <StatusBadge status={oralHealthStatus} />
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full sm:w-auto">
          <Button 
            onClick={() => navigate('/homepage')}
            size="lg"
            className="px-10 py-4 h-auto shadow-lg hover:-translate-y-1 transition-all"
          >
            Upload Another Image
          </Button>
        </div>
      </div>

        <div className="w-full max-w-xl bg-white/45 backdrop-blur-sm rounded-3xl border border-[#00004d]/75 shadow-lg p-6 z-10">

          {uploadedImage ? (
            <div className="w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={uploadedImage}
                alt="Scanned Teeth"
                className="w-full h-auto object-contain"
              />
            </div>
          ) : (
            <div className="h-80 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-white">
              <ImageIcon className="w-12 h-12 text-slate-300 mb-2" />
              <h4 className="text-sm font-bold text-slate-400 tracking-wider">
                NO IMAGE UPLOADED
              </h4>
            </div>
          )}
          
        </div>
    </PageLayout>
  );
}
