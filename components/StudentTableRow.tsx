
import React from 'react';
import { Student, StudentCategory, ApplicationStatus, StudentType, PaymentStatus, UniformStatus, FeeStatus } from '../types';
import StatusBadge from './StatusBadge';

interface StudentTableRowProps {
  student: Student;
  onShowReport: (student: Student) => void;
}

const StudentTableRow: React.FC<StudentTableRowProps> = ({ student, onShowReport }) => {
  const { 
    name, formPurchaseDate, observationDate, sitInDate, interviewDate, uniformStatus, 
    feeStatus, acceptanceLetterDate, paymentStatus, paymentDate,
    studentCategory, applicationStatus, studentType, transferGrade, docsComplete
  } = student;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
        const parts = dateString.split('/');
        if (parts.length === 3) {
             const date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
             return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
        }
        return dateString;
    } catch (e) {
        return dateString; 
    }
  };

  const calculateProgress = () => {
    let score = 0;
    if (formPurchaseDate) score += 1; 
    if (docsComplete) score += 1;     
    if (observationDate || sitInDate) score += 1; 
    if (interviewDate) score += 1;    
    if (uniformStatus === UniformStatus.DONE || feeStatus === FeeStatus.APPROVED) score += 1; 
    if (acceptanceLetterDate) score += 1; 
    if (paymentStatus !== PaymentStatus.PENDING) score += 1; 
    return (score / 7) * 100;
  };

  const progress = calculateProgress();
  const isPaid = paymentStatus === PaymentStatus.BOOKING_FEE || paymentStatus === PaymentStatus.FULL;

  const rowClass = applicationStatus === ApplicationStatus.CANCELLED 
    ? 'opacity-50 bg-slate-50' 
    : 'hover:bg-blue-50/50';

  const nameClass = isPaid && applicationStatus !== ApplicationStatus.CANCELLED
    ? 'text-[#1c59c6] font-black'
    : 'text-slate-900 font-bold';

  return (
    <tr className={`bg-white border-b border-slate-100 transition-colors duration-150 ${rowClass}`}>
      <th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap sticky left-0 z-10 min-w-64 border-r border-slate-100 transition-colors duration-150 ${applicationStatus === ApplicationStatus.CANCELLED ? 'bg-slate-50' : 'bg-white'}`}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            {isPaid && applicationStatus !== ApplicationStatus.CANCELLED && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span className={nameClass}>{name}</span>
            {studentCategory === StudentCategory.ABK && (
              <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-md bg-purple-100 text-purple-700 ring-1 ring-purple-200">ABK</span>
            )}
            {applicationStatus === ApplicationStatus.CANCELLED && (
              <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-md bg-red-100 text-red-700 ring-1 ring-red-200">BATAL</span>
            )}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 ring-1 ring-slate-200">
            <div 
              className={`h-2 rounded-full transition-all duration-700 ease-out ${applicationStatus === ApplicationStatus.CANCELLED ? 'bg-slate-300' : progress === 100 ? 'bg-green-500' : 'bg-[#1c59c6]'}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </th>
      
      <td className="px-6 py-4 font-medium text-slate-600">{formatDate(formPurchaseDate)}</td>
      <td className="px-6 py-4 text-center">
         {docsComplete ? (
           <span className="text-green-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
           </span>
         ) : '-'}
      </td>
      <td className="px-6 py-4 font-medium text-slate-600">{formatDate(observationDate || sitInDate)}</td>
      <td className="px-6 py-4 font-medium text-slate-600">{formatDate(interviewDate)}</td>
      <td className="px-6 py-4">
        <StatusBadge status={uniformStatus} type="uniform" />
      </td>
      <td className="px-6 py-4 text-xs max-w-[150px] truncate italic text-slate-400" title={student.notes}>
        {student.notes || '-'}
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={feeStatus} type="fee" />
      </td>
      <td className="px-6 py-4 font-medium text-slate-600">{formatDate(acceptanceLetterDate)}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
            <StatusBadge status={paymentStatus} type="payment" />
            {paymentDate && <span className="text-[10px] font-bold text-slate-400 mt-1">{formatDate(paymentDate)}</span>}
        </div>
      </td>
      
      <td className="px-6 py-4 min-w-36">
        <div className="flex items-center space-x-3">
            <button
                onClick={() => onShowReport(student)}
                className="px-4 py-1.5 rounded-lg bg-blue-50 text-xs font-bold text-[#1c59c6] hover:bg-blue-100 transition-all active:scale-95"
            >
                Lihat Alur
            </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentTableRow;
