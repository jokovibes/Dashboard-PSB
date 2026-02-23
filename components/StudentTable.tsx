
import React from 'react';
import { Student } from '../types';
import StudentTableRow from './StudentTableRow';

interface StudentTableProps {
  students: Student[];
  onShowReport: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onShowReport }) => {
  const tableHeaders = [
    { name: 'Siswa & Progress', sticky: true, position: 'left-0', minWidth: 'min-w-64' },
    { name: 'Beli' },
    { name: 'Berkas' },
    { name: 'Obs' },
    { name: 'Intv' },
    { name: 'Srgm' },
    { name: 'Notes/Asesmen' },
    { name: 'Keuangan' },
    { name: 'Surat' },
    { name: 'Bayar' },
    { name: 'Aksi', minWidth: 'min-w-36' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500 border-collapse">
        <thead className="text-[10px] text-slate-500 uppercase bg-slate-50 font-bold tracking-wider">
          <tr>
            {tableHeaders.map(header => (
              <th 
                key={header.name} 
                scope="col" 
                className={`
                  px-6 py-3 whitespace-nowrap border-b border-slate-200
                  ${header.sticky ? 'sticky z-10 bg-slate-50 border-r' : ''}
                  ${header.position || ''}
                  ${header.minWidth || ''}
                `}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length} className="text-center py-20 px-6">
                <div className="text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium">Data Belum Tersedia</h3>
                  <p className="mt-1 text-sm">Coba sesuaikan filter atau pencarian Anda.</p>
                </div>
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <StudentTableRow 
                key={student.id} 
                student={student} 
                onShowReport={onShowReport}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
