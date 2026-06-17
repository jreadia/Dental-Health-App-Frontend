import React from 'react';
import { UserStats } from '../../../../api/users';

interface UserSummaryCardsProps {
  stats: UserStats | null;
  loading?: boolean;
}

export function UserSummaryCards({ stats, loading }: UserSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card 
        title="Total Users" 
        value={stats?.total ?? 0} 
        colorClass="text-blue-600" 
        borderClass="border-blue-400"
        loading={loading}
      />
      <Card 
        title="Active" 
        value={stats?.active ?? 0} 
        colorClass="text-green-500" 
        borderClass="border-green-400"
        loading={loading}
      />
      <Card 
        title="Inactive" 
        value={stats?.inactive ?? 0} 
        colorClass="text-yellow-500" 
        borderClass="border-yellow-400"
        loading={loading}
      />
    </div>
  );
}

function Card({ title, value, colorClass, borderClass, loading }: { title: string, value: number, colorClass: string, borderClass: string, loading?: boolean }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-t-4 ${borderClass} p-5 flex flex-col items-start justify-center min-h-[100px]`}>
      {loading ? (
        <div className="animate-pulse h-8 w-16 bg-gray-200 rounded mb-2"></div>
      ) : (
        <div className={`text-3xl font-bold mb-1 ${colorClass}`}>
          {value}
        </div>
      )}
      <div className="text-gray-500 text-sm font-medium">
        {title}
      </div>
    </div>
  );
}
