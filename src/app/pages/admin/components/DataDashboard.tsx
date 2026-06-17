import React, { useEffect, useState } from "react";
import { AdminAccountsList } from "./AdminAccountsList";
import { UserSummaryCards } from "./UserSummaryCards";
import { UserManagementTable } from "./UserManagementTable";
import { getUserStats, UserStats } from "../../../../api/users";

interface DataDashboardProps {
  onBack: () => void;
  loggedInAs: string;
}

export function DataDashboard({ onBack, loggedInAs }: DataDashboardProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await getUserStats();
      setStats(data);
    } catch (e) {
      console.error("Failed to fetch user stats", e);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans">
      <header className="bg-[#0a2378] text-white flex items-center gap-4 py-5 px-8">
        <button 
          onClick={onBack} 
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white cursor-pointer font-sans text-[13px] hover:bg-white/20 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold flex-1 m-0">Data Dashboard</h2>
        <span className="text-xs opacity-70 tracking-widest uppercase">
          ADMIN — {loggedInAs}
        </span>
      </header>

      <div className="py-6 px-8 max-w-7xl mx-auto">
        <UserSummaryCards stats={stats} loading={loadingStats} />
        
        <UserManagementTable onStatsChange={fetchStats} totalUsers={stats?.total ?? 0} />

        {/* Existing Admin accounts list */}
        <AdminAccountsList />
      </div>
    </div>
  );
}
