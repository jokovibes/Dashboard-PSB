
import React from 'react';

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'internal', label: 'Internal' },
  { key: 'external', label: 'Eksternal' },
  { key: 'karyawan', label: 'Karyawan' },
  { key: 'abk', label: 'Special Needs' },
];

interface FilterControlsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {FILTERS.map(({ key, label }) => {
        const isActive = activeFilter === key;
        const baseClasses = "px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl focus:outline-none transition-all duration-300";
        const activeClasses = "bg-white text-[#1c59c6] shadow-xl scale-105 ring-2 ring-white/50";
        const inactiveClasses = "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm";
        
        return (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterControls;
