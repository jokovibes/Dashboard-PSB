
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Student, StudentType, StudentCategory, ApplicationStatus, PaymentStatus } from './types';
import DashboardHeader from './components/DashboardHeader';
import StudentTable from './components/StudentTable';
import SummaryCards from './components/SummaryCards';
import Pagination from './components/Pagination';
import FilterControls from './components/FilterControls';
import SubSummary from './components/SubSummary';
import ParentReportModal from './components/ParentReportModal';
import { fetchStudentsFromSheets } from './services/googleSheetsService';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [studentForReport, setStudentForReport] = useState<Student | null>(null);

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchStudents = useCallback(async (isAutoRefresh = false) => {
    if (!isAutoRefresh) setIsLoading(true);
    setError(null);
    try {
        const data = await fetchStudentsFromSheets();
        setStudents(data);
        setLastUpdated(new Date());
    } catch (err) {
        setError("Gagal memuat data dari Google Sheets. Pastikan sheet telah dipublikasikan ke web atau periksa koneksi internet Anda.");
        console.error(err);
    } finally {
        if (!isAutoRefresh) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
    
    const interval = setInterval(() => {
      fetchStudents(true);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [fetchStudents]);

  const handleShowReport = useCallback((student: Student) => {
    setStudentForReport(student);
  }, []);

  const handleCloseReport = useCallback(() => {
    setStudentForReport(null);
  }, []);

  const subSummaryData = useMemo(() => {
    const activeStudents = students.filter(s => s.applicationStatus !== ApplicationStatus.CANCELLED);
    return {
      internal: activeStudents.filter(s => s.studentType === StudentType.INTERNAL).length,
      external: activeStudents.filter(s => s.studentType === StudentType.EXTERNAL).length,
      employees: activeStudents.filter(s => s.studentType === StudentType.KARYAWAN).length,
      transfers: activeStudents.filter(s => s.studentType === StudentType.TRANSFER).length,
      specialNeeds: activeStudents.filter(s => s.studentCategory === StudentCategory.ABK).length,
    }
  }, [students]);

  const filteredStudents = useMemo(() => {
    let tempStudents = students;

    switch (activeFilter) {
      case 'internal':
        tempStudents = tempStudents.filter(s => s.studentType === StudentType.INTERNAL);
        break;
      case 'external':
        tempStudents = tempStudents.filter(s => s.studentType === StudentType.EXTERNAL);
        break;
      case 'karyawan':
        tempStudents = tempStudents.filter(s => s.studentType === StudentType.KARYAWAN);
        break;
      case 'abk':
        tempStudents = tempStudents.filter(s => s.studentCategory === StudentCategory.ABK);
        break;
      case 'observed':
        tempStudents = tempStudents.filter(s => (s.observationDate || s.sitInDate));
        break;
      case 'interviewed':
        tempStudents = tempStudents.filter(s => s.interviewDate);
        break;
      case 'acceptanceSent':
        tempStudents = tempStudents.filter(s => s.acceptanceLetterDate && s.applicationStatus !== ApplicationStatus.CANCELLED);
        break;
      case 'paid':
        tempStudents = tempStudents.filter(s => (s.paymentStatus === PaymentStatus.BOOKING_FEE || s.paymentStatus === PaymentStatus.FULL) && s.applicationStatus !== ApplicationStatus.CANCELLED);
        break;
      case 'cancelled':
        tempStudents = tempStudents.filter(s => s.applicationStatus === ApplicationStatus.CANCELLED);
        break;
      default:
        break;
    }

    if (searchQuery) {
      tempStudents = tempStudents.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return tempStudents;
  }, [students, activeFilter, searchQuery]);
  
  const summaryData = useMemo(() => {
    return {
      formsPurchased: students.length,
      observed: students.filter(s => s.observationDate || s.sitInDate).length,
      interviewed: students.filter(s => s.interviewDate).length,
      acceptanceLettersSent: students.filter(s => s.acceptanceLetterDate && s.applicationStatus !== ApplicationStatus.CANCELLED).length,
      paid: students.filter(s => (s.paymentStatus === PaymentStatus.BOOKING_FEE || s.paymentStatus === PaymentStatus.FULL) && s.applicationStatus !== ApplicationStatus.CANCELLED).length,
      cancelled: students.filter(s => s.applicationStatus === ApplicationStatus.CANCELLED).length,
    };
  }, [students]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(prevFilter => prevFilter === filter ? 'all' : filter);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white gap-4 bg-[#1c59c6]">
        <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-medium text-blue-100 tracking-widest uppercase text-sm">Menyiapkan Dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white gap-6 bg-[#1c59c6] p-4 text-center">
        <div className="bg-red-500/20 p-6 rounded-2xl border border-red-500/50 max-w-md">
            <svg className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
            <p className="text-blue-100 mb-6">{error}</p>
            <button 
                onClick={fetchStudents}
                className="px-6 py-2 bg-white text-[#1c59c6] rounded-xl font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors"
            >
                Coba Lagi
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-[#1c59c6]">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader onRefresh={() => fetchStudents()} isLoading={isLoading} lastUpdated={lastUpdated} />
        <main>
          <SummaryCards data={summaryData} onFilterChange={handleFilterChange} activeFilter={activeFilter} />
          <SubSummary data={subSummaryData} />

          <div className="mt-10 mb-6 flex justify-between items-center flex-wrap gap-4">
            <FilterControls activeFilter={activeFilter} onFilterChange={handleFilterChange} />

             <div className="relative flex-1 sm:flex-auto min-w-[200px] max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Cari nama siswa..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-xl leading-5 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all sm:text-sm shadow-inner backdrop-blur-sm"
                />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <StudentTable 
              students={paginatedStudents} 
              onShowReport={handleShowReport}
            />
            {filteredStudents.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                totalItems={filteredStudents.length}
              />
            )}
          </div>
        </main>
        <footer className="mt-16 py-8 border-t border-white/10 text-center">
            <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-[0.3em]">
                &copy; 2024 SD Lazuardi - Sistem Monitoring Penerimaan Siswa Baru
            </p>
        </footer>
      </div>
      
      {studentForReport && (
        <ParentReportModal
          student={studentForReport}
          onClose={handleCloseReport}
        />
      )}
    </div>
  );
};

export default App;
