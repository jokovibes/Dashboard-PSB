
import React from 'react';

interface DashboardHeaderProps {
  onRefresh?: () => void;
  isLoading?: boolean;
  lastUpdated?: Date;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onRefresh, isLoading, lastUpdated }) => {
  return (
    <header className="mb-12">
      <div className="flex flex-col items-center justify-center text-center relative">
        {onRefresh && (
          <div className="absolute right-0 top-0 flex flex-col items-end gap-1">
            <button 
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 text-blue-200 hover:text-white transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <svg className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            {lastUpdated && (
              <span className="text-[10px] text-blue-200/60 font-mono uppercase tracking-wider">
                Update: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </div>
        )}
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">
          Monitoring Siswa Baru
        </h1>
        <p className="text-blue-200 mt-2 font-bold tracking-[0.4em] uppercase text-xs opacity-80">
          SD LAZUARDI • CONNECTING TO THE FUTURE
        </p>
      </div>
    </header>
  );
};

export default DashboardHeader;
