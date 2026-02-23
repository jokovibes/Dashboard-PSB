
import React from 'react';

interface SubSummaryData {
  transfers: number;
  internal: number;
  external: number;
  employees: number;
  specialNeeds: number;
}

interface SubSummaryProps {
  data: SubSummaryData;
}

const StatItem: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="text-center px-4 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg group hover:bg-white transition-all duration-300">
    <p className="text-2xl font-black text-white group-hover:text-[#1c59c6]">{value}</p>
    <p className="text-[10px] font-bold text-blue-100 group-hover:text-[#1c59c6]/70 uppercase tracking-widest leading-tight mt-1">{label}</p>
  </div>
);


const SubSummary: React.FC<SubSummaryProps> = ({ data }) => {
  return (
    <div className="mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <StatItem label="Internal" value={data.internal} />
          <StatItem label="Eksternal" value={data.external} />
          <StatItem label="Karyawan" value={data.employees} />
          <StatItem label="Pindahan" value={data.transfers} />
          <StatItem label="Special Needs" value={data.specialNeeds} />
        </div>
    </div>
  );
};

export default SubSummary;
