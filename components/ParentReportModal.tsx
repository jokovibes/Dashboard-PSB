
import React from 'react';
import { Student, UniformStatus, FeeStatus, PaymentStatus, StudentType } from '../types';

interface ParentReportModalProps {
  student: Student;
  onClose: () => void;
}

const ReportStep: React.FC<{ title: string; status: string; date: string | null; isComplete: boolean }> = ({ title, status, date, isComplete }) => (
  <li className="mb-6 ms-8">
    <span className={`absolute flex items-center justify-center w-8 h-8 ${isComplete ? 'bg-green-100' : 'bg-slate-100'} rounded-full -start-4 ring-4 ring-white`}>
      {isComplete ? (
        <svg className="w-4 h-4 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
        </svg>
      ) : (
        <svg className="w-4 h-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"/>
        </svg>
      )}
    </span>
    <h3 className="font-semibold text-white">{title}</h3>
    <p className="text-sm font-normal text-blue-200">{status} {date && `- ${new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`}</p>
  </li>
);

const ParentReportModal: React.FC<ParentReportModalProps> = ({ student, onClose }) => {
    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPdf = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            const { jsPDF } = (window as any).jspdf;
            const html2canvas = (window as any).html2canvas;
            const reportContent = document.getElementById('report-content');

            if (!reportContent || !jsPDF || !html2canvas) {
                console.error("Elemen laporan atau pustaka PDF tidak ditemukan!");
                alert("Gagal membuat PDF. Harap coba lagi.");
                reject(new Error("Pustaka PDF tidak ditemukan"));
                return;
            }
            
            html2canvas(reportContent, { 
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#1c59c6' // Match the dark theme background
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                // Set the background color for the entire PDF page
                pdf.setFillColor('#1c59c6');
                pdf.rect(0, 0, pdfWidth, pdfHeight, 'F'); // 'F' for fill

                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const ratio = canvasWidth / canvasHeight;
                
                let imgFinalWidth = pdfWidth - 20; // Margin
                let imgFinalHeight = imgFinalWidth / ratio;

                if (imgFinalHeight > pdfHeight - 20) {
                    imgFinalHeight = pdfHeight - 20; // Margin
                    imgFinalWidth = imgFinalHeight * ratio;
                }

                const xPos = (pdfWidth - imgFinalWidth) / 2;
                const yPos = 10;

                pdf.addImage(imgData, 'PNG', xPos, yPos, imgFinalWidth, imgFinalHeight);
                pdf.save(`Laporan_PSB_${student.name.replace(/ /g, '_')}.pdf`);
                resolve();
            }).catch(err => {
                console.error("Gagal membuat PDF:", err);
                alert("Terjadi kesalahan saat membuat file PDF.");
                reject(err);
            });
        });
    };

    const getObservationStep = () => {
        const date = student.observationDate || student.sitInDate;
        const title = student.studentType === StudentType.TRANSFER ? 'Sit In' : 'Observasi';
        return {
            title: title,
            date: date,
            status: date ? 'Selesai' : 'Belum Terjadwal',
            isComplete: !!date,
        };
    };

    const steps = [
        { title: 'Pembelian Formulir', date: student.formPurchaseDate, status: student.formPurchaseDate ? 'Selesai' : 'Belum Dilakukan', isComplete: !!student.formPurchaseDate },
        getObservationStep(),
        { title: 'Interview', date: student.interviewDate, status: student.interviewDate ? 'Selesai' : 'Belum Terjadwal', isComplete: !!student.interviewDate },
        { title: 'Pengukuran Seragam', date: null, status: student.uniformStatus, isComplete: student.uniformStatus === UniformStatus.DONE },
        { title: 'Penjelasan Keuangan', date: null, status: student.feeStatus, isComplete: student.feeStatus === FeeStatus.APPROVED },
        { title: 'Penerbitan Surat Penerimaan', date: student.acceptanceLetterDate, status: student.acceptanceLetterDate ? 'Sudah Terbit' : 'Menunggu', isComplete: !!student.acceptanceLetterDate },
        { title: 'Pembayaran', date: student.paymentDate, status: student.paymentStatus, isComplete: student.paymentStatus === PaymentStatus.FULL || student.paymentStatus === PaymentStatus.BOOKING_FEE },
    ];

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 modal-overlay-print-hide"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow w-full max-w-2xl max-h-[90vh] flex flex-col modal-dialog-print-show"
        onClick={e => e.stopPropagation()}
      >
        <div id="report-content" className="bg-[#1c59c6] rounded-t-lg">
            <div className="flex items-start justify-between p-4 border-b rounded-t border-blue-500">
                <h3 className="text-xl font-semibold text-white">
                    Laporan Alur Penerimaan Siswa
                </h3>
                <div className="flex items-center space-x-2 print-hidden">
                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        title="Download PDF"
                        className="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm p-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414Z"/>
                            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z"/>
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handlePrint}
                        title="Cetak"
                        className="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm p-2 bg-green-600 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-green-500"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
                            <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
                            <path d="M4 0a2 2 0 0 0-2 2v2h16V2a2 2 0 0 0-2-2H4Z"/>
                        </svg>
                    </button>
                    <button type="button" className="text-blue-200 bg-transparent hover:bg-blue-800 hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center" onClick={onClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white">SD Lazuardi</h2>
                    <p className="text-blue-200">Alur Penerimaan Siswa Baru</p>
                    <p className="mt-4 text-lg font-semibold text-white">{student.name}</p>
                </div>

                <ol className="relative border-s border-blue-400">                  
                    {steps.map(step => <ReportStep key={step.title} {...step} />)}
                </ol>
                
                <div className="mt-8 p-4 border-t border-blue-400 text-center">
                    <p className="text-sm text-white">
                        Terima kasih atas partisipasi dan kerja sama Ananda serta Bapak/Ibu dalam proses penerimaan siswa baru di SD Lazuardi.
                        <br/>
                        Rangkuman ini menunjukkan tahapan yang telah diselesaikan oleh Ananda <span className="font-semibold text-white">{student.name}</span> hingga saat ini.
                        <br/>
                        Informasi selanjutnya akan disampaikan oleh admin SD.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end p-4 space-x-2 border-t border-slate-200 rounded-b bg-white modal-footer-print-hide">
            <button type="button" onClick={onClose} className="text-slate-500 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10">
                Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

export default ParentReportModal;
