
import React from 'react';

interface SummaryData {
  formsPurchased: number;
  observed: number;
  interviewed: number;
  acceptanceLettersSent: number;
  paid: number;
  cancelled: number;
}

interface SummaryCardsProps {
  data: SummaryData;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

// Fixed: Defined specific literal types for colorScheme to match the usage in the component
const SummaryCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  filterKey: string;
  isActive: boolean;
  onClick: (filter: string) => void;
  colorScheme?: 'blue' | 'red' | 'purple' | 'green';
}> = ({ title, value, icon, filterKey, isActive, onClick, colorScheme = 'blue' }) => {
  const schemes = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    green: 'bg-green-50 text-green-600 border-green-100',
  };

  return (
    <button
      onClick={() => onClick(filterKey)}
      className={`relative group bg-white p-4 rounded-xl flex flex-col items-start gap-2 border transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 border-transparent shadow-lg -translate-y-1' : 'border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200'}`}
    >
      <div className={`p-2 rounded-lg ${schemes[colorScheme]}`}>
        {icon}
      </div>
      <div className="mt-1 text-left">
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider leading-none mt-1">{title}</p>
      </div>
    </button>
  );
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ data, onFilterChange, activeFilter }) => {
  // Fixed: Added explicit type annotation to the cards array to fix string-to-union assignment error
  const cards: Array<{
    title: string;
    value: number;
    filterKey: string;
    colorScheme: 'blue' | 'red' | 'purple' | 'green';
    icon: React.ReactNode;
  }> = [
    { 
      title: 'Formulir', 
      value: data.formsPurchased, 
      filterKey: 'formsPurchased',
      colorScheme: 'blue',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    },
    { 
      title: 'Observasi', 
      value: data.observed,
      filterKey: 'observed',
      colorScheme: 'blue',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    },
    { 
      title: 'Interview', 
      value: data.interviewed,
      filterKey: 'interviewed',
      colorScheme: 'blue',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    },
    { 
      title: 'Penerimaan', 
      value: data.acceptanceLettersSent,
      filterKey: 'acceptanceSent',
      colorScheme: 'purple',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    { 
      title: 'Pembayaran', 
      value: data.paid,
      filterKey: 'paid',
      colorScheme: 'green',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    { 
      title: 'Batal', 
      value: data.cancelled,
      filterKey: 'cancelled',
      colorScheme: 'red',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {cards.map(card => (
        <SummaryCard 
            key={card.filterKey} 
            {...card}
            isActive={activeFilter === card.filterKey}
            onClick={onFilterChange}
        />
      ))}
    </div>
  );
};

export default SummaryCards;
