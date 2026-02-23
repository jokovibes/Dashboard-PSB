
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Student } from '../types';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface AIChatModalProps {
  students: Student[];
  onClose: () => void;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ students, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Halo! Saya asisten AI Anda. Silakan ajukan pertanyaan tentang data penerimaan siswa baru.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Fixed: Use named parameter for GoogleGenAI initialization as required.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const simplifiedStudents = students.map(({ id, name, studentType, studentCategory, paymentStatus, applicationStatus, observationDate, interviewDate, formPurchaseDate, sitInDate }) => ({
        id,
        name,
        studentType,
        studentCategory,
        paymentStatus,
        applicationStatus,
        hasForm: !!formPurchaseDate,
        hasObserved: !!observationDate || !!sitInDate,
        hasInterviewed: !!interviewDate
      }));

      const prompt = `
        Anda adalah asisten AI yang membantu staf administrasi sekolah. Tugas Anda adalah menjawab pertanyaan berdasarkan data pendaftaran siswa baru dalam format JSON yang disediakan.
        Selalu jawab dalam Bahasa Indonesia. Jawaban harus ringkas, jelas, dan akurat.
        Jika diminta untuk daftar nama, gunakan daftar bernomor.
        Jangan membuat informasi yang tidak ada di data. Jika tidak tahu, katakan Anda tidak dapat menemukan informasinya.

        Data Siswa:
        ${JSON.stringify(simplifiedStudents, null, 2)}

        Pertanyaan Pengguna:
        "${input}"

        Jawaban Anda:
      `;

      // Fixed: Use recommended model 'gemini-3-pro-preview' for complex reasoning/coding tasks.
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });

      // Fixed: Directly access the .text property from the response.
      const aiMessage: Message = { sender: 'ai', text: response.text || 'Maaf, saya tidak mendapatkan jawaban.' };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error("Error communicating with AI:", err);
      const errorMessage: Message = { sender: 'ai', text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (text: string) => {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(\n\d+\.\s)/g, '<br/>$1')
      .replace(/(\n-+\s)/g, '<br/>&bull; ')
      .replace(/\n/g, '<br/>');
    return { __html: formattedText };
  };


  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b rounded-t-2xl border-slate-200 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9"/>
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
                    <path d="M15 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
                    <path d="M12 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Tanya AI
            </h3>
          </div>
          <button type="button" className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" onClick={onClose}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
            <span className="sr-only">Close modal</span>
          </button>
        </header>
        
        <main className="p-4 flex-grow overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M15 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M12 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/></svg>
                </div>
              )}
              <div
                className={`max-w-sm md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-lg' 
                  : 'bg-slate-100 text-slate-800 rounded-bl-lg'}`}
              >
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={formatText(msg.text)} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M15 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M12 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/></svg>
                </div>
                <div className="max-w-sm md:max-w-md p-3 rounded-2xl bg-slate-100 rounded-bl-lg">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>
        
        <footer className="p-4 border-t border-slate-200 sticky bottom-0 bg-white">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              disabled={isLoading}
              className="flex-1 block w-full px-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading || input.trim() === ''}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AIChatModal;
