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

  const plaques = resultData?.plaques ?? 0;
  const calculusDetected = plaques > 0;

  // Oral health status based on plaque count
  // healthy = 0, mild = 1-5, unhealthy = 6+
  const getOralHealthStatus = (count: number) => {
    if (count === 0) return "Healthy";
    if (count >= 1 && count <= 5) return "Mild";
    return "Unhealthy";
  };
  const oralHealthStatus = getOralHealthStatus(plaques);

  // Helper function to color code the result banner
  const getStatusStyle = (status: string) => {
    if (status === "Unhealthy") return "bg-rose-100 border-rose-200 text-rose-800";
    if (status === "Mild") return "bg-yellow-100 border-yellow-200 text-yellow-800";
    return "bg-emerald-100 border-emerald-200 text-emerald-800"; // Healthy
  };

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
            <span className="text-lg font-extrabold text-[#00004d]">{plaques} Calculus</span>
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

      <div className="relative w-80 h-[620px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl border-4 border-gray-800 z-10 flex-shrink-0">
        <div className="w-full h-full bg-slate-50 rounded-[2.25rem] overflow-hidden relative flex flex-col pt-16 pb-8 px-6 text-center shadow-inner">
          
          <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-3xl w-40 mx-auto z-20"></div>

          <div className="flex-1 flex flex-col items-center">
            
            {/* Dynamic Status Banner */}
            <div className={`w-full border p-4 rounded-2xl mb-6 ${getStatusStyle(oralHealthStatus)}`}>
              <h3 className="text-xl font-black uppercase tracking-wide mb-1">{oralHealthStatus}</h3>
              <p className="text-sm font-semibold opacity-90">{plaques} Calculus Detected</p>
            </div>

            {uploadedImage ? (
              <div className="w-full flex-1 border-2 border-slate-200 rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-inner p-2">
                <img 
                  src={uploadedImage} 
                  alt="Scanned Teeth" 
                  className="w-full h-full object-contain opacity-90 rounded-xl"
                />
              </div>
            ) : (
              <div className="w-full flex-1 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-white">
                <ImageIcon className="w-12 h-12 text-slate-300 mb-2" />
                <h4 className="text-sm font-bold text-slate-400 tracking-wider px-4">NO IMAGE UPLOADED</h4>
              </div>
            )}
            
          </div>
          
        </div>
      </div>
    </PageLayout>
  );
}
