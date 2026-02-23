
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Student, ApplicationStatus, PaymentStatus } from '../types';

interface AIInsightsModalProps {
  students: Student[];
  onClose: () => void;
}

const AIInsightsModal: React.FC<AIInsightsModalProps> = ({ students, onClose }) => {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fixed: Use named parameter for GoogleGenAI initialization as required.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const activeStudents = students.filter(s => s.applicationStatus !== ApplicationStatus.CANCELLED);
        
        const summary = {
          totalApplicants: students.length,
          activeApplicants: activeStudents.length,
          cancelled: students.length - activeStudents.length,
          formsPurchased: activeStudents.filter(s => s.formPurchaseDate).length,
          observedOrSitIn: activeStudents.filter(s => s.observationDate || s.sitInDate).length,
          interviewed: activeStudents.filter(s => s.interviewDate).length,
          paid: activeStudents.filter(s => s.paymentStatus === PaymentStatus.BOOKING_FEE || s.paymentStatus === PaymentStatus.FULL).length,
        };

        const dataForPrompt = JSON.stringify(summary, null, 2);

        const prompt = `
          Anda adalah seorang analis ahli dalam proses penerimaan siswa di sebuah sekolah. 
          Berdasarkan data ringkas berikut, berikan analisis dan wawasan mengenai alur pendaftaran siswa baru.

          Data Ringkas Pendaftaran:
          ${dataForPrompt}

          Tolong berikan analisis dalam format Markdown yang jelas, mencakup poin-poin berikut:
          1.  **Ringkasan Umum**: Berikan gambaran singkat tentang status pendaftaran saat ini. Sebutkan jumlah pendaftar aktif dan yang sudah membayar.
          2.  **Identifikasi Potensi Hambatan (Bottlenecks)**: Analisis data untuk menemukan di mana calon siswa paling banyak berhenti atau tertunda. Misalnya, bandingkan jumlah yang membeli formulir dengan yang sudah observasi. Apakah ada penurunan yang signifikan?
          3.  **Rekomendasi Aksi**: Berikan 2-3 saran konkret yang bisa ditindaklanjuti oleh tim administrasi untuk memperlancar proses. Contoh: "Follow-up calon siswa yang sudah membeli formulir tapi belum jadwal observasi," atau "Tingkatkan komunikasi mengenai jadwal interview."
          4.  **Poin Positif**: Sebutkan satu hal yang berjalan baik berdasarkan data.

          Gunakan bahasa yang profesional, positif, dan mudah dimengerti.
        `;

        // Fixed: Use recommended model 'gemini-3-flash-preview' for basic text tasks.
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        // Fixed: Directly access the .text property from the response.
        setInsights(response.text || '');

      } catch (err) {
        console.error("Error generating AI insights:", err);
        setError("Gagal menghasilkan insight. Mungkin ada masalah dengan koneksi atau kunci API. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    generateInsights();
  }, [students]);

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.618 1.633a.5.5 0 01.764 0l1.25 1.667a.5.5 0 00.632.228l1.888-.63a.5.5 0 01.6.543l-.63 1.888a.5.5 0 00.228.632l1.667 1.25a.5.5 0 010 .764l-1.667 1.25a.5.5 0 00-.228.632l.63 1.888a.5.5 0 01-.6.543l-1.888-.63a.5.5 0 00-.632.228l-1.25 1.667a.5.5 0 01-.764 0l-1.25-1.667a.5.5 0 00-.632-.228l-1.888.63a.5.5 0 01-.6-.543l.63-1.888a.5.5 0 00-.228-.632l-1.667-1.25a.5.5 0 010-.764l1.667-1.25a.5.5 0 00.228-.632l-.63-1.888a.5.5 0 01.6-.543l1.888.63a.5.5 0 00.632-.228l1.25-1.667zM10 3.864l-.938 1.25a1.5 1.5 0 01-1.896.684l-1.416-.472.472 1.416a1.5 1.5 0 01-.684 1.896L4.288 10l1.25.938a1.5 1.5 0 01.684 1.896l-.472 1.416 1.416-.472a1.5 1.5 0 011.896.684L10 16.136l.938-1.25a1.5 1.5 0 011.896-.684l1.416.472-.472-1.416a1.5 1.5 0 01.684-1.896L15.712 10l-1.25-.938a1.5 1.5 0 01-.684-1.896l.472-1.416-1.416.472a1.5 1.5 0 01-1.896-.684L10 3.864z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-900">
              AI Insights
            </h3>
          </div>
          <button type="button" className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" onClick={onClose}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
            {loading && (
                <div className="flex flex-col items-center justify-center h-full">
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-slate-500">AI sedang menganalisis data...</p>
                </div>
            )}
            {error && (
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">Error!</span> {error}
                </div>
            )}
            {!loading && !error && (
                 <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: insights.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} 
                />
            )}
        </div>
        
        <div className="flex items-center justify-end p-6 space-x-2 border-t border-slate-200 rounded-b sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10"
            >
              Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsModal;
