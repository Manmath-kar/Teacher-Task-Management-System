import React, { useState, useEffect } from 'react';
import { Student, Subject, Payment, Report, ScheduleSlot, AppState } from '../types/index.js';

interface ScheduleProps {
  onScheduleUpdate: (slots: ScheduleSlot[]) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onScheduleUpdate }) => {
  const [activeTab, setActiveTab] = useState('Schedule');
  const [appState, setAppState] = useState<AppState>({
    students: [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        address: '123 Main St, City, State',
        parentName: 'Robert Smith',
        parentPhone: '(555) 123-4568',
        grade: '10th Grade',
        subjects: ['math', 'physics'],
        status: 'Active',
        joinDate: '2024-01-15',
        totalLessons: 20,
        completedLessons: 15,
        totalPaid: 750,
        pendingAmount: 250
      },
      {
        id: '2',
        name: 'Emma Johnson',
        email: 'emma.johnson@email.com',
        phone: '(555) 234-5678',
        address: '456 Oak Ave, City, State',
        parentName: 'Sarah Johnson',
        parentPhone: '(555) 234-5679',
        grade: '11th Grade',
        subjects: ['chemistry', 'biology'],
        status: 'Active',
        joinDate: '2024-02-01',
        totalLessons: 16,
        completedLessons: 12,
        totalPaid: 600,
        pendingAmount: 200
      }
    ],
    subjects: [
      {
        id: 'math',
        name: 'Mathematics',
        category: 'Science',
        description: 'Advanced mathematics including algebra and calculus',
        rate: 50,
        duration: 60,
        status: 'Active',
        totalStudents: 8,
        totalLessons: 45
      },
      {
        id: 'physics',
        name: 'Physics',
        category: 'Science',
        description: 'Classical and modern physics concepts',
        rate: 55,
        duration: 60,
        status: 'Active',
        totalStudents: 6,
        totalLessons: 32
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        category: 'Science',
        description: 'Organic and inorganic chemistry',
        rate: 50,
        duration: 60,
        status: 'Active',
        totalStudents: 7,
        totalLessons: 38
      },
      {
        id: 'biology',
        name: 'Biology',
        category: 'Science',
        description: 'Cell biology and genetics',
        rate: 45,
        duration: 60,
        status: 'Active',
        totalStudents: 5,
        totalLessons: 28
      }
    ],
    payments: [
      {
        id: '1',
        studentId: '1',
        studentName: 'John Smith',
        subjectId: 'math',
        subjectName: 'Mathematics',
        amount: 200,
        date: '2024-01-15',
        status: 'Paid',
        description: 'Monthly tuition - January',
        method: 'Bank Transfer',
        lessonDate: '2024-01-20'
      },
      {
        id: '2',
        studentId: '2',
        studentName: 'Emma Johnson',
        subjectId: 'chemistry',
        subjectName: 'Chemistry',
        amount: 180,
        date: '2024-02-01',
        status: 'Pending',
        description: 'Monthly tuition - February',
        method: 'Cash'
      }
    ],
    messages: [
      {
        id: '1',
        from: 'Robert Smith',
        to: 'Teacher',
        subject: 'Schedule Change Request',
        content: 'Could we reschedule John\'s math lesson from Tuesday to Wednesday?',
        date: '2024-01-20',
        read: false,
        type: 'Parent',
        priority: 'Medium'
      }
    ],
    scheduleSlots: [
      {
        id: '1',
        day: 'Monday',
        time: '09:00',
        status: 'Scheduled',
        studentId: '1',
        studentName: 'John Smith',
        subjectId: 'math',
        subjectName: 'Mathematics',
        notes: 'Focus on algebra',
        duration: 60,
        rate: 50
      },
      {
        id: '2',
        day: 'Tuesday',
        time: '10:00',
        status: 'Scheduled',
        studentId: '2',
        studentName: 'Emma Johnson',
        subjectId: 'chemistry',
        subjectName: 'Chemistry',
        notes: 'Organic chemistry basics',
        duration: 60,
        rate: 50
      }
    ],
    reports: []
  });

  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'student' | 'subject' | 'payment' | 'message' | 'schedule'>('student');

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // CRUD Operations
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      totalLessons: 0,
      completedLessons: 0,
      totalPaid: 0,
      pendingAmount: 0
    };
    setAppState(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }));
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setAppState(prev => ({
      ...prev,
      students: prev.students.map(student => 
        student.id === id ? { ...student, ...updates } : student
      )
    }));
  };

  const deleteStudent = (id: string) => {
    setAppState(prev => ({
      ...prev,
      students: prev.students.filter(student => student.id !== id),
      scheduleSlots: prev.scheduleSlots.filter(slot => slot.studentId !== id),
      payments: prev.payments.filter(payment => payment.studentId !== id)
    }));
  };

  const addSubject = (subjectData: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      ...subjectData,
      id: Date.now().toString(),
      totalStudents: 0,
      totalLessons: 0
    };
    setAppState(prev => ({
      ...prev,
      subjects: [...prev.subjects, newSubject]
    }));
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setAppState(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject => 
        subject.id === id ? { ...subject, ...updates } : subject
      )
    }));
  };

  const deleteSubject = (id: string) => {
    setAppState(prev => ({
      ...prev,
      subjects: prev.subjects.filter(subject => subject.id !== id),
      scheduleSlots: prev.scheduleSlots.filter(slot => slot.subjectId !== id)
    }));
  };

  const addPayment = (paymentData: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString()
    };
    setAppState(prev => ({
      ...prev,
      payments: [...prev.payments, newPayment]
    }));
  };

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    setAppState(prev => ({
      ...prev,
      payments: prev.payments.map(payment => 
        payment.id === id ? { ...payment, ...updates } : payment
      )
    }));
  };

  const deletePayment = (id: string) => {
    setAppState(prev => ({
      ...prev,
      payments: prev.payments.filter(payment => payment.id !== id)
    }));
  };

  const addScheduleSlot = (slotData: Omit<ScheduleSlot, 'id'>) => {
    const student = appState.students.find(s => s.id === slotData.studentId);
    const subject = appState.subjects.find(s => s.id === slotData.subjectId);
    
    const newSlot: ScheduleSlot = {
      ...slotData,
      id: Date.now().toString(),
      studentName: student?.name || '',
      subjectName: subject?.name || ''
    };
    
    setAppState(prev => ({
      ...prev,
      scheduleSlots: [...prev.scheduleSlots, newSlot]
    }));
  };

  // Lesson-specific operations
  const addLesson = (lessonData: {
    studentId: string;
    subjectId: string;
    day: string;
    time: string;
    duration: number;
    notes?: string;
  }) => {
    const student = appState.students.find(s => s.id === lessonData.studentId);
    const subject = appState.subjects.find(s => s.id === lessonData.subjectId);
    
    if (!student || !subject) {
      alert('Please select valid student and subject');
      return;
    }

    const newLesson: ScheduleSlot = {
      id: Date.now().toString(),
      day: lessonData.day,
      time: lessonData.time,
      status: 'Scheduled',
      studentId: lessonData.studentId,
      studentName: student.name,
      subjectId: lessonData.subjectId,
      subjectName: subject.name,
      duration: lessonData.duration,
      rate: subject.rate,
      notes: lessonData.notes || ''
    };

    setAppState(prev => ({
      ...prev,
      scheduleSlots: [...prev.scheduleSlots, newLesson],
      students: prev.students.map(s =>
        s.id === lessonData.studentId
          ? { ...s, totalLessons: s.totalLessons + 1 }
          : s
      ),
      subjects: prev.subjects.map(s =>
        s.id === lessonData.subjectId
          ? { ...s, totalLessons: s.totalLessons + 1 }
          : s
      )
    }));
  };

  const completeLesson = (lessonId: string) => {
    const lesson = appState.scheduleSlots.find(s => s.id === lessonId);
    if (!lesson) return;

    setAppState(prev => ({
      ...prev,
      scheduleSlots: prev.scheduleSlots.map(slot =>
        slot.id === lessonId
          ? { ...slot, status: 'Completed' as const }
          : slot
      ),
      students: prev.students.map(s =>
        s.id === lesson.studentId
          ? { ...s, completedLessons: s.completedLessons + 1 }
          : s
      )
    }));
  };

  const cancelLesson = (lessonId: string, reason?: string) => {
    setAppState(prev => ({
      ...prev,
      scheduleSlots: prev.scheduleSlots.map(slot =>
        slot.id === lessonId
          ? { ...slot, status: 'Cancelled' as const, notes: reason ? `Cancelled: ${reason}` : 'Cancelled' }
          : slot
      )
    }));
  };

  // const rescheduleLesson = (lessonId: string, newDay: string, newTime: string) => {
  //   // Check if the new slot is available
  //   const existingSlot = appState.scheduleSlots.find(s =>
  //     s.day === newDay && s.time === newTime && s.id !== lessonId
  //   );
    
  //   if (existingSlot) {
  //     alert('This time slot is already occupied');
  //     return;
  //   }

  //   setAppState(prev => ({
  //     ...prev,
  //     scheduleSlots: prev.scheduleSlots.map(slot =>
  //       slot.id === lessonId
  //         ? { ...slot, day: newDay, time: newTime }
  //         : slot
  //     )
  //   }));
  // };

  const updateScheduleSlot = (id: string, updates: Partial<ScheduleSlot>) => {
    setAppState(prev => ({
      ...prev,
      scheduleSlots: prev.scheduleSlots.map(slot => 
        slot.id === id ? { ...slot, ...updates } : slot
      )
    }));
  };

  const deleteScheduleSlot = (id: string) => {
    setAppState(prev => ({
      ...prev,
      scheduleSlots: prev.scheduleSlots.filter(slot => slot.id !== id)
    }));
  };

  const generateReport = (type: Report['type'], filters: any = {}) => {
    const reportData = {
      students: appState.students.length,
      subjects: appState.subjects.length,
      totalLessons: appState.scheduleSlots.filter(slot => slot.status === 'Completed').length,
      pendingPayments: appState.payments.filter(payment => payment.status === 'Pending').length,
      totalRevenue: appState.payments.filter(payment => payment.status === 'Paid').reduce((sum, payment) => sum + payment.amount, 0)
    };

    const newReport: Report = {
      id: Date.now().toString(),
      title: `${type} Report`,
      type,
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      data: reportData,
      generatedDate: new Date().toISOString(),
      filters
    };

    setAppState(prev => ({
      ...prev,
      reports: [...prev.reports, newReport]
    }));
  };

  useEffect(() => {
    onScheduleUpdate(appState.scheduleSlots);
  }, [appState.scheduleSlots, onScheduleUpdate]);

  const tabs = [
    'Schedule', 'Lessons', 'Students', 'Subjects', 'Payments', 'Reports', 'Messages'
  ];

  const openForm = (type: typeof formType, item?: any) => {
    setFormType(type);
    setEditingItem(item || null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingItem) {
      // Update existing item
      switch (formType) {
        case 'student':
          updateStudent(editingItem.id, formData);
          break;
        case 'subject':
          updateSubject(editingItem.id, formData);
          break;
        case 'payment':
          // Add student and subject names for payment
          const student = appState.students.find(s => s.id === formData.studentId);
          const subject = appState.subjects.find(s => s.id === formData.subjectId);
          updatePayment(editingItem.id, {
            ...formData,
            studentName: student?.name || '',
            subjectName: subject?.name || ''
          });
          break;
        case 'schedule':
          // Update lesson with proper names
          const studentForUpdate = appState.students.find(s => s.id === formData.studentId);
          const subjectForUpdate = appState.subjects.find(s => s.id === formData.subjectId);
          updateScheduleSlot(editingItem.id, {
            ...formData,
            studentName: studentForUpdate?.name || '',
            subjectName: subjectForUpdate?.name || ''
          });
          break;
      }
    } else {
      // Add new item
      switch (formType) {
        case 'student':
          addStudent(formData);
          break;
        case 'subject':
          addSubject(formData);
          break;
        case 'payment':
          // Add student and subject names for payment
          const student = appState.students.find(s => s.id === formData.studentId);
          const subject = appState.subjects.find(s => s.id === formData.subjectId);
          addPayment({
            ...formData,
            studentName: student?.name || '',
            subjectName: subject?.name || ''
          });
          break;
        case 'schedule':
          // Use the enhanced addLesson function for better lesson management
          if (formData.studentId && formData.subjectId) {
            addLesson({
              studentId: formData.studentId,
              subjectId: formData.subjectId,
              day: formData.day,
              time: formData.time,
              duration: formData.duration,
              notes: formData.notes
            });
          } else {
            // Fallback to regular slot addition for availability slots
            addScheduleSlot(formData);
          }
          break;
      }
    }
    closeForm();
  };

  const renderScheduleGrid = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Weekly Schedule</h3>
        <div className="space-x-2">
          <button
            onClick={() => openForm('schedule')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Lesson
          </button>
          <button
            onClick={() => {
              const today = new Date();
              const todayStr = days[today.getDay() === 0 ? 6 : today.getDay() - 1]; // Convert Sunday=0 to our format
              const currentHour = today.getHours().toString().padStart(2, '0') + ':00';
              openForm('schedule', {
                day: todayStr,
                time: currentHour,
                status: 'Scheduled',
                duration: 60,
                rate: 50
              });
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Quick Add Now
          </button>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex space-x-4 mb-4 text-xs">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 border-blue-300 border rounded mr-1"></div>
          <span>Scheduled</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border-green-300 border rounded mr-1"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 border-red-300 border rounded mr-1"></div>
          <span>Cancelled</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-50 border-gray-200 border rounded mr-1"></div>
          <span>Available</span>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 text-sm">
        <div className="font-semibold p-2">Time</div>
        {days.map(day => (
          <div key={day} className="font-semibold p-2 text-center">{day}</div>
        ))}
        
        {timeSlots.map(time => (
          <React.Fragment key={time}>
            <div className="p-2 font-medium">{time}</div>
            {days.map(day => {
              const slot = appState.scheduleSlots.find(s => s.day === day && s.time === time);
              return (
                <div
                  key={`${day}-${time}`}
                  className={`p-2 border rounded cursor-pointer min-h-[80px] ${
                    slot
                      ? slot.status === 'Scheduled'
                        ? 'bg-blue-100 border-blue-300'
                        : slot.status === 'Completed'
                        ? 'bg-green-100 border-green-300'
                        : slot.status === 'Cancelled'
                        ? 'bg-red-100 border-red-300'
                        : 'bg-gray-100 border-gray-300'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (slot) {
                      openForm('schedule', slot);
                    } else {
                      openForm('schedule', { day, time, status: 'Available', duration: 60, rate: 50 });
                    }
                  }}
                >
                  {slot ? (
                    <div className="text-xs">
                      <div className="font-semibold text-gray-800">{slot.studentName}</div>
                      <div className="text-gray-600">{slot.subjectName}</div>
                      <div className="text-gray-500">{slot.duration}min - ${slot.rate}</div>
                      {slot.notes && (
                        <div className="text-gray-500 truncate" title={slot.notes}>
                          {slot.notes}
                        </div>
                      )}
                      <div className="flex justify-between mt-2 space-x-1">
                        {slot.status === 'Scheduled' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                completeLesson(slot.id);
                              }}
                              className="text-green-600 hover:text-green-800 text-xs"
                              title="Mark Complete"
                            >
                              ✓
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const reason = prompt('Cancellation reason (optional):');
                                cancelLesson(slot.id, reason || undefined);
                              }}
                              className="text-red-600 hover:text-red-800 text-xs"
                              title="Cancel"
                            >
                              ✗
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openForm('schedule', slot);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this lesson?')) {
                              deleteScheduleSlot(slot.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 text-xs"
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 text-center pt-4">
                      Click to add lesson
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Students</h3>
        <button
          onClick={() => openForm('student')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Grade</th>
              <th className="px-4 py-2 text-left">Subjects</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appState.students.map(student => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.grade}</td>
                <td className="px-4 py-2">{student.subjects.join(', ')}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openForm('student', student)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSubjects = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Subjects</h3>
        <button
          onClick={() => openForm('subject')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Subject
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appState.subjects.map(subject => (
          <div key={subject.id} className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg">{subject.name}</h4>
            <p className="text-gray-600 text-sm mb-2">{subject.description}</p>
            <div className="space-y-1 text-sm">
              <div>Category: {subject.category}</div>
              <div>Rate: ${subject.rate}/hour</div>
              <div>Duration: {subject.duration} minutes</div>
              <div>Students: {subject.totalStudents}</div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openForm('subject', subject)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSubject(subject.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Payments</h3>
        <button
          onClick={() => openForm('payment')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Payment
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Method</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appState.payments.map(payment => (
              <tr key={payment.id} className="border-t">
                <td className="px-4 py-2">{payment.studentName}</td>
                <td className="px-4 py-2">{payment.subjectName}</td>
                <td className="px-4 py-2">${payment.amount}</td>
                <td className="px-4 py-2">{payment.date}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-2">{payment.method}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openForm('payment', payment)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePayment(payment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Reports</h3>
        <div className="space-x-2">
          <button
            onClick={() => generateReport('Student Progress')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Student Progress
          </button>
          <button
            onClick={() => generateReport('Payment Summary')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Payment Summary
          </button>
          <button
            onClick={() => generateReport('Monthly Summary')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Monthly Summary
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800">Total Students</h4>
          <p className="text-2xl font-bold text-blue-600">{appState.students.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800">Active Subjects</h4>
          <p className="text-2xl font-bold text-green-600">{appState.subjects.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800">Pending Payments</h4>
          <p className="text-2xl font-bold text-yellow-600">
            {appState.payments.filter(p => p.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800">Total Revenue</h4>
          <p className="text-2xl font-bold text-purple-600">
            ${appState.payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0)}
          </p>
        </div>
      </div>

      {appState.reports.length > 0 && (
        <div className="space-y-4">
          {appState.reports.map(report => (
            <div key={report.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{report.title}</h4>
                  <p className="text-sm text-gray-600">
                    Generated: {new Date(report.generatedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Period: {report.dateRange.start} to {report.dateRange.end}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm space-y-1">
                    <div>Students: {report.data.students}</div>
                    <div>Subjects: {report.data.subjects}</div>
                    <div>Completed Lessons: {report.data.totalLessons}</div>
                    <div>Revenue: ${report.data.totalRevenue}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderLessons = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Lessons Management</h3>
        <button
          onClick={() => openForm('schedule')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Lesson
        </button>
      </div>
      
      {/* Lesson Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800">Scheduled</h4>
          <p className="text-2xl font-bold text-blue-600">
            {appState.scheduleSlots.filter(s => s.status === 'Scheduled').length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800">Completed</h4>
          <p className="text-2xl font-bold text-green-600">
            {appState.scheduleSlots.filter(s => s.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800">Cancelled</h4>
          <p className="text-2xl font-bold text-red-600">
            {appState.scheduleSlots.filter(s => s.status === 'Cancelled').length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800">Total Revenue</h4>
          <p className="text-2xl font-bold text-purple-600">
            ${appState.scheduleSlots.filter(s => s.status === 'Completed').reduce((sum, s) => sum + (s.rate || 0), 0)}
          </p>
        </div>
      </div>

      {/* Lessons List */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Date & Time</th>
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Rate</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appState.scheduleSlots
              .filter(slot => slot.studentId && slot.subjectId) // Only show actual lessons
              .sort((a, b) => {
                const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
                if (dayDiff !== 0) return dayDiff;
                return a.time.localeCompare(b.time);
              })
              .map(lesson => (
                <tr key={lesson.id} className="border-t">
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-medium">{lesson.day}</div>
                      <div className="text-sm text-gray-600">{lesson.time}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{lesson.studentName}</td>
                  <td className="px-4 py-2">{lesson.subjectName}</td>
                  <td className="px-4 py-2">{lesson.duration} min</td>
                  <td className="px-4 py-2">${lesson.rate}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      lesson.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      lesson.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      lesson.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lesson.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      {lesson.status === 'Scheduled' && (
                        <>
                          <button
                            onClick={() => completeLesson(lesson.id)}
                            className="text-green-600 hover:text-green-800 text-sm"
                            title="Mark Complete"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Cancellation reason (optional):');
                              cancelLesson(lesson.id, reason || undefined);
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                            title="Cancel"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => openForm('schedule', lesson)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this lesson?')) {
                            deleteScheduleSlot(lesson.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Messages</h3>
      <div className="space-y-4">
        {appState.messages.map(message => (
          <div key={message.id} className={`border rounded-lg p-4 ${!message.read ? 'bg-blue-50' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{message.subject}</h4>
                <p className="text-sm text-gray-600">From: {message.from}</p>
                <p className="text-sm text-gray-600">Date: {message.date}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                message.priority === 'High' ? 'bg-red-100 text-red-800' :
                message.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {message.priority}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderForm = () => {
    if (!showForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem ? 'Edit' : 'Add'} {formType.charAt(0).toUpperCase() + formType.slice(1)}
          </h3>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data: any = {};
            
            for (const [key, value] of formData.entries()) {
              if (key === 'subjects') {
                data[key] = (value as string).split(',').map(s => s.trim());
              } else if (key === 'rate' || key === 'duration' || key === 'amount') {
                data[key] = parseFloat(value as string);
              } else {
                data[key] = value;
              }
            }
            
            handleFormSubmit(data);
          }}>
            {formType === 'student' && (
              <>
                <input
                  name="name"
                  placeholder="Student Name"
                  defaultValue={editingItem?.name || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={editingItem?.email || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  defaultValue={editingItem?.phone || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="address"
                  placeholder="Address"
                  defaultValue={editingItem?.address || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="parentName"
                  placeholder="Parent Name"
                  defaultValue={editingItem?.parentName || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="parentPhone"
                  placeholder="Parent Phone"
                  defaultValue={editingItem?.parentPhone || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="grade"
                  placeholder="Grade"
                  defaultValue={editingItem?.grade || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="subjects"
                  placeholder="Subjects (comma separated)"
                  defaultValue={editingItem?.subjects?.join(', ') || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <select
                  name="status"
                  defaultValue={editingItem?.status || 'Active'}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </>
            )}

            {formType === 'subject' && (
              <>
                <input
                  name="name"
                  placeholder="Subject Name"
                  defaultValue={editingItem?.name || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="category"
                  placeholder="Category"
                  defaultValue={editingItem?.category || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  defaultValue={editingItem?.description || ''}
                  className="w-full p-2 border rounded mb-2"
                  rows={3}
                  required
                />
                <input
                  name="rate"
                  type="number"
                  placeholder="Rate per hour"
                  defaultValue={editingItem?.rate || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="duration"
                  type="number"
                  placeholder="Duration (minutes)"
                  defaultValue={editingItem?.duration || '60'}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <select
                  name="status"
                  defaultValue={editingItem?.status || 'Active'}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </>
            )}

            {formType === 'payment' && (
              <>
                <select
                  name="studentId"
                  defaultValue={editingItem?.studentId || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="">Select Student</option>
                  {appState.students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
                <select
                  name="subjectId"
                  defaultValue={editingItem?.subjectId || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="">Select Subject</option>
                  {appState.subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
                <input
                  name="amount"
                  type="number"
                  placeholder="Amount"
                  defaultValue={editingItem?.amount || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="date"
                  type="date"
                  defaultValue={editingItem?.date || new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <select
                  name="status"
                  defaultValue={editingItem?.status || 'Pending'}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <select
                  name="method"
                  defaultValue={editingItem?.method || 'Cash'}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Online">Online</option>
                </select>
                <textarea
                  name="description"
                  placeholder="Description"
                  defaultValue={editingItem?.description || ''}
                  className="w-full p-2 border rounded mb-2"
                  rows={2}
                  required
                />
              </>
            )}

            {formType === 'schedule' && (
              <>
                <select
                  name="day"
                  defaultValue={editingItem?.day || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select
                  name="time"
                  defaultValue={editingItem?.time || ''}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="">Select Time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <select
                  name="studentId"
                  defaultValue={editingItem?.studentId || ''}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="">Select Student</option>
                  {appState.students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
                <select
                  name="subjectId"
                  defaultValue={editingItem?.subjectId || ''}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="">Select Subject</option>
                  {appState.subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
                <select
                  name="status"
                  defaultValue={editingItem?.status || 'Available'}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <input
                  name="duration"
                  type="number"
                  placeholder="Duration (minutes)"
                  defaultValue={editingItem?.duration || '60'}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  name="rate"
                  type="number"
                  placeholder="Rate"
                  defaultValue={editingItem?.rate || '50'}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <textarea
                  name="notes"
                  placeholder="Notes"
                  defaultValue={editingItem?.notes || ''}
                  className="w-full p-2 border rounded mb-2"
                  rows={2}
                />
              </>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {editingItem ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Schedule':
        return renderScheduleGrid();
      case 'Lessons':
        return renderLessons();
      case 'Students':
        return renderStudents();
      case 'Subjects':
        return renderSubjects();
      case 'Payments':
        return renderPayments();
      case 'Reports':
        return renderReports();
      case 'Messages':
        return renderMessages();
      default:
        return renderScheduleGrid();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Form Modal */}
      {renderForm()}
    </div>
  );
};

export default Schedule;