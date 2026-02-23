
import React, { useState, useEffect } from 'react';
import { Student, UniformStatus, AssessmentStatus, FeeStatus, PaymentStatus, StudentType, StudentCategory, ApplicationStatus } from '../types';

interface UpdateModalProps {
  student: Student;
  onClose: () => void;
  onSave: (student: Student) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState(student);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === 'null' ? null : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const renderSelect = <T extends string>(name: keyof typeof formData, label: string, enumObject: Record<string, T>, value: T) => (
      <div>
        <label htmlFor={String(name)} className="block mb-2 text-sm font-medium text-slate-900">{label}</label>
        <select
            id={String(name)}
            name={String(name)}
            value={value}
            onChange={handleChange}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
            {Object.values(enumObject).map(val => (
                <option key={val} value={val}>{val}</option>
            ))}
        </select>
      </div>
  );

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
          <h3 className="text-xl font-semibold text-slate-900">
            {`Update Status: ${student.name}`}
          </h3>
          <button
            type="button"
            className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-900">Nama Siswa</label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>
              
              {renderSelect('studentType', 'Tipe Siswa', StudentType, formData.studentType)}
              
              {formData.studentType === StudentType.TRANSFER && (
                <>
                  <div>
                      <label htmlFor="transferGrade" className="block mb-2 text-sm font-medium text-slate-900">Pindahan Kelas</label>
                      <input
                          type="text"
                          id="transferGrade"
                          name="transferGrade"
                          value={formData.transferGrade || ''}
                          onChange={handleChange}
                          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                  </div>
                  <div>
                      <label htmlFor="sitInDate" className="block mb-2 text-sm font-medium text-slate-900">Tanggal Sit In</label>
                      <input
                          type="date"
                          id="sitInDate"
                          name="sitInDate"
                          value={formData.sitInDate || ''}
                          onChange={handleChange}
                          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                  </div>
                </>
              )}

              {formData.studentType !== StudentType.TRANSFER && (
                 <div>
                    <label htmlFor="observationDate" className="block mb-2 text-sm font-medium text-slate-900">Tanggal Observasi</label>
                    <input
                        type="date"
                        id="observationDate"
                        name="observationDate"
                        value={formData.observationDate || ''}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
              )}

              <div>
                  <label htmlFor="formPurchaseDate" className="block mb-2 text-sm font-medium text-slate-900">Tanggal Beli Formulir</label>
                  <input
                      type="date"
                      id="formPurchaseDate"
                      name="formPurchaseDate"
                      value={formData.formPurchaseDate || ''}
                      onChange={handleChange}
                      className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {renderSelect('studentCategory', 'Kategori Siswa', StudentCategory, formData.studentCategory)}
              
              <div>
                  <label htmlFor="interviewDate" className="block mb-2 text-sm font-medium text-slate-900">Tanggal Interview</label>
                  <input
                      type="date"
                      id="interviewDate"
                      name="interviewDate"
                      value={formData.interviewDate || ''}
                      onChange={handleChange}
                      className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {renderSelect('uniformStatus', 'Pengukuran Seragam', UniformStatus, formData.uniformStatus)}
              {renderSelect('assessmentNote', 'Asesmen Lanjutan', AssessmentStatus, formData.assessmentNote)}
              {renderSelect('feeStatus', 'Info Biaya', FeeStatus, formData.feeStatus)}
              
              <div>
                  <label htmlFor="acceptanceLetterDate" className="block mb-2 text-sm font-medium text-slate-900">Tanggal Surat Penerimaan</label>
                  <input
                      type="date"
                      id="acceptanceLetterDate"
                      name="acceptanceLetterDate"
                      value={formData.acceptanceLetterDate || ''}
                      onChange={handleChange}
                      className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>
              
              {renderSelect('paymentStatus', 'Status Pembayaran', PaymentStatus, formData.paymentStatus)}
              
              <div>
                  <label htmlFor="paymentDate" className="block mb-2 text-sm font-medium text-slate-900">Tanggal Pembayaran</label>
                  <input
                      type="date"
                      id="paymentDate"
                      name="paymentDate"
                      value={formData.paymentDate || ''}
                      onChange={handleChange}
                      className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {renderSelect('applicationStatus', 'Status Pendaftaran', ApplicationStatus, formData.applicationStatus)}
            </div>
          </div>
        
          <div className="flex items-center p-6 space-x-2 border-t border-slate-200 rounded-b sticky bottom-0 bg-white">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
