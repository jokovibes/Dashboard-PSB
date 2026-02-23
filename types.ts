
export enum UniformStatus {
  DONE = 'Selesai',
  PENDING = 'Belum Ukur',
}

export enum AssessmentStatus {
  REQUIRED = 'Perlu Asesmen Lanjutan',
  NOT_REQUIRED = 'Tidak Perlu',
}

export enum FeeStatus {
  APPROVED = 'Disetujui Finance',
  PENDING = 'Menunggu Persetujuan',
}

export enum PaymentStatus {
  FULL = 'Lunas',
  BOOKING_FEE = 'Booking Fee',
  PENDING = 'Belum Bayar',
}

export enum StudentType {
  INTERNAL = 'Internal',
  EXTERNAL = 'Eksternal',
  TRANSFER = 'Pindahan',
  KARYAWAN = 'Karyawan',
}

export enum StudentCategory {
  REGULER = 'Reguler',
  ABK = 'ABK', // Anak Berkebutuhan Khusus
}

export enum ApplicationStatus {
  ACTIVE = 'Aktif',
  CANCELLED = 'Cancel',
}

export interface Student {
  id: number;
  name: string;
  formPurchaseDate: string | null;
  formReturnDate: string | null;
  docsComplete: boolean;
  observationDate: string | null;
  sitInDate: string | null;
  transferGrade: string | null;
  interviewDate: string | null;
  uniformStatus: UniformStatus;
  assessmentNote: AssessmentStatus;
  feeStatus: FeeStatus;
  acceptanceLetterDate: string | null;
  paymentStatus: PaymentStatus;
  paymentDate: string | null;
  studentType: StudentType;
  studentCategory: StudentCategory;
  applicationStatus: ApplicationStatus;
  notes?: string;
}
