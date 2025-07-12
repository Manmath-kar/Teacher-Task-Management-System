export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
  birthDate: string;
  avatar?: string;
}

export interface Qualification {
  id: string;
  name: string;
  rate: number;
  type: 'Private' | 'Group';
}

export interface ScheduleSlot {
  id: string;
  day: string;
  time: string;
  status: 'Available' | 'Scheduled' | 'Completed' | 'Cancelled';
  studentId?: string;
  studentName?: string;
  subjectId?: string;
  subjectName?: string;
  notes?: string;
  duration: number;
  rate: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
  grade: string;
  subjects: string[];
  status: 'Active' | 'Inactive';
  joinDate: string;
  totalLessons: number;
  completedLessons: number;
  totalPaid: number;
  pendingAmount: number;
}

export interface Subject {
  id: string;
  name: string;
  category: string;
  description: string;
  rate: number;
  duration: number; // in minutes
  status: 'Active' | 'Inactive';
  totalStudents: number;
  totalLessons: number;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  description: string;
  method: 'Cash' | 'Card' | 'Bank Transfer' | 'Online';
  lessonDate?: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  type: 'Student' | 'Parent' | 'Admin';
  priority: 'Low' | 'Medium' | 'High';
}

export interface Report {
  id: string;
  title: string;
  type: 'Student Progress' | 'Payment Summary' | 'Schedule Overview' | 'Monthly Summary' | 'Subject Performance';
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
  generatedDate: string;
  filters: {
    studentIds?: string[];
    subjectIds?: string[];
    status?: string;
  };
}

export interface FormData {
  student: Partial<Student>;
  subject: Partial<Subject>;
  payment: Partial<Payment>;
  message: Partial<Message>;
  scheduleSlot: Partial<ScheduleSlot>;
}

export interface CrudOperations<T> {
  items: T[];
  add: (item: Omit<T, 'id'>) => void;
  update: (id: string, item: Partial<T>) => void;
  delete: (id: string) => void;
  getById: (id: string) => T | undefined;
}

export interface AppState {
  students: Student[];
  subjects: Subject[];
  payments: Payment[];
  messages: Message[];
  scheduleSlots: ScheduleSlot[];
  reports: Report[];
}