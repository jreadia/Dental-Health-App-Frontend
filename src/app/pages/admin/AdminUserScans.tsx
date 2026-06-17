import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDentalImagesAdmin, DentalImage } from '../../../api/users';

export function AdminUserScans() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [images, setImages] = useState<DentalImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      // Fetch only the last 3 recent scans. We also slice it here in case 
      // the backend hasn't been updated in production yet to respect the limit.
      getUserDentalImagesAdmin(userId, 3)
        .then(res => setImages((res || []).slice(0, 3)))
        .catch(e => console.error("Failed to fetch user scans", e))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans">
      <header className="bg-[#0a2378] text-white flex items-center gap-4 py-5 px-8">
        <button 
          onClick={() => navigate('/admin', { state: { returnToData: true } })} 
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white cursor-pointer font-sans text-[13px] hover:bg-white/20 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold flex-1 m-0">User Scans</h2>
      </header>

      <div className="py-6 px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 p-6">
          <h3 className="text-lg font-bold text-[#0a2378] mb-4">Recent Scans (Last 3)</h3>
          
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading scans...</div>
          ) : images.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No scans found for this user.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {images.map(img => {
                // Parse date correctly
                const uploadDate = img.uploadDate;
                const dateObj = (uploadDate && typeof uploadDate === 'object' && '_seconds' in uploadDate)
                  ? new Date((uploadDate as { _seconds: number })._seconds * 1000) 
                  : new Date(uploadDate as string);
                const date = isNaN(dateObj.getTime()) ? 'Unknown Date' : dateObj.toLocaleDateString();

                // Correct ML parsing based on backend structure
                const mlData = img.mlResults;
                const plaqueCount = mlData?.boxes?.length || 0;
                const status = mlData?.overall_diagnosis || img.diagnosis?.oralHealthStatus || (plaqueCount > 0 ? 'NEEDS ATTENTION' : 'HEALTHY');
                // Determine status color
                let statusColorClass = 'bg-gray-100 text-gray-700';
                const lowerStatus = status.toLowerCase();
                if (lowerStatus.includes('unhealthy') || lowerStatus.includes('needs attention')) {
                  statusColorClass = 'bg-red-100 text-red-700';
                } else if (lowerStatus.includes('mild')) {
                  statusColorClass = 'bg-yellow-100 text-yellow-800';
                } else if (lowerStatus.includes('healthy')) {
                  statusColorClass = 'bg-green-100 text-green-700';
                }
                
                return (
                  <div key={img.imageId} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="aspect-[4/3] bg-black overflow-hidden relative">
                      <img 
                        src={img.annotatedImageUrl || img.imageUrl} 
                        alt="Scan" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-sm text-gray-500 mb-1">Uploaded: {date}</div>
                      <div className="font-bold text-lg text-[#0a2378] mb-3">{plaqueCount} Plaque(s) Detected</div>
                      <div className="mt-auto">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusColorClass}`}>
                          Status: {status}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
