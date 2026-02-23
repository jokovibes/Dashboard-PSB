import Papa from 'papaparse';
import { Student, UniformStatus, AssessmentStatus, FeeStatus, PaymentStatus, StudentType, StudentCategory, ApplicationStatus } from '../types';

const SHEET_ID = '1zTorvpLMrBHKOWPeOSD6fgEKAENm3cxOelhLQXnob6g';
const GID = '924860406';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

export const fetchStudentsFromSheets = async (): Promise<Student[]> => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        complete: (results) => {
          const data = results.data as string[][];
          const students = parseSheetData(data);
          resolve(students);
        },
        error: (error: Error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

const parseSheetData = (rows: string[][]): Student[] => {
  const students: Student[] = [];
  
  // Find header row (usually row 10, which is index 9)
  // But let's find it dynamically just in case
  const headerIndex = rows.findIndex(row => 
    row.some(cell => cell && cell.toLowerCase().includes('no')) && 
    row.some(cell => cell && cell.toLowerCase().includes('nama siswa'))
  );

  if (headerIndex === -1) {
    console.error('Could not find header row in sheet data');
    return [];
  }

  // Data starts 2 rows after the header (skipping the sub-header)
  const dataRows = rows.slice(headerIndex + 2);

  for (const columns of dataRows) {
    // Basic validation: must have an ID and a Name
    if (columns.length < 2 || !columns[0] || isNaN(parseInt(columns[0]))) continue;

    const id = parseInt(columns[0]);
    const name = columns[1]?.trim();
    if (!name || name.toLowerCase() === 'none' || name === '') continue;
    
    const typeStr = columns[2] || '';
    const keterngan = columns[3] || '';
    
    let applicationStatus = ApplicationStatus.ACTIVE;
    if (typeStr.toLowerCase().includes('cancel') || keterngan.toLowerCase().includes('cancel')) {
        applicationStatus = ApplicationStatus.CANCELLED;
    }

    let studentType: StudentType = StudentType.EXTERNAL; 
    let studentCategory: StudentCategory = StudentCategory.REGULER;

    const lowerType = typeStr.toLowerCase();
    if (lowerType.includes('internal sn')) {
        studentType = StudentType.INTERNAL;
        studentCategory = StudentCategory.ABK;
    } else if (lowerType.includes('eksternal sn')) {
        studentType = StudentType.EXTERNAL;
        studentCategory = StudentCategory.ABK;
    } else if (lowerType.includes('internal')) {
        studentType = StudentType.INTERNAL;
    } else if (lowerType.includes('eksternal')) {
        studentType = StudentType.EXTERNAL;
    } else if (lowerType.includes('pindahan')) {
        studentType = StudentType.TRANSFER;
    } else if (lowerType.includes('karyawan')) {
        studentType = StudentType.KARYAWAN;
    } else if (lowerType.includes('beasiswa')) {
        studentType = StudentType.INTERNAL;
    }
    
    const transferGradeMatch = keterngan.match(/kelas (\d+)/i);
    
    const student: Student = {
        id,
        name,
        applicationStatus,
        studentType,
        studentCategory,
        transferGrade: studentType === StudentType.TRANSFER ? (transferGradeMatch ? `Kelas ${transferGradeMatch[1]}` : 'Pindahan') : null,
        formPurchaseDate: columns[4] || null,
        formReturnDate: columns[5] || null,
        docsComplete: (columns[6] || '').toLowerCase() === 'lengkap',
        observationDate: columns[9] || null,
        sitInDate: null, 
        interviewDate: columns[11] || null,
        uniformStatus: (columns[16] || '').toLowerCase().includes('sudah') ? UniformStatus.DONE : UniformStatus.PENDING,
        assessmentNote: ((columns[10] || '') + (columns[12] || '') + (columns[14] || '')).toLowerCase().includes('asesmen') ? AssessmentStatus.REQUIRED : AssessmentStatus.NOT_REQUIRED,
        feeStatus: (columns[17] || '').toLowerCase().includes('acc') ? FeeStatus.APPROVED : FeeStatus.PENDING,
        acceptanceLetterDate: columns[19] || null,
        paymentDate: columns[21] || null,
        paymentStatus: PaymentStatus.PENDING,
        notes: columns[10] || columns[12] || '',
    };
    
    const paymentStr = (columns[22] || '').toLowerCase();
    if (paymentStr.includes('lunas')) {
        student.paymentStatus = PaymentStatus.FULL;
    } else if (paymentStr.includes('booking fee')) {
        student.paymentStatus = PaymentStatus.BOOKING_FEE;
    }

    if(student.studentType === StudentType.TRANSFER) {
        student.sitInDate = student.observationDate;
        student.observationDate = null;
    }

    students.push(student);
  }
  
  return students;
};
