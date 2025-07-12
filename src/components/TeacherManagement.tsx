import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.tsx';
import TeacherProfile from './TeacherProfile.tsx';
import QualificationsTable from './QualificationsTable.tsx';
import Schedule from './Schedule.tsx';
import { Teacher, Qualification, ScheduleSlot } from '../types/index.js';

const TeacherManagement: React.FC = () => {
  const [currentSchedule, setCurrentSchedule] = useState<ScheduleSlot[]>([]);
  // Mock data
  const teacher: Teacher = {
    id: '1',
    name: 'Alynia Allan',
    email: 'alynia.allan@schoolms.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, Anytown, ST 12345',
    status: 'Active',
    birthDate: '1985-06-15'
  };

  const privateQualifications: Qualification[] = [
    { id: '1', name: 'Vocal - Beginner', rate: 35.00, type: 'Private' },
    { id: '2', name: 'Vocal - Intermediate', rate: 35.00, type: 'Private' },
    { id: '3', name: 'Vocal - Advanced', rate: 35.00, type: 'Private' },
    { id: '4', name: 'Piano - Beginner', rate: 35.00, type: 'Private' },
    { id: '5', name: 'Piano - Intermediate', rate: 35.00, type: 'Private' }
  ];

  const groupQualifications: Qualification[] = [];

  // Initialize schedule state with default data
  useEffect(() => {
    const initialSchedule: ScheduleSlot[] = [
      {
        id: '1',
        day: 'Tuesday',
        time: '4:00pm',
        status: 'Scheduled',
        studentName: 'Mat',
        subjectName: 'Piano',
        studentId: 'student-1',
        subjectId: 'subject-1',
        duration: 60,
        rate: 35.00
      },
      {
        id: '2',
        day: 'Wednesday',
        time: '3:00pm',
        status: 'Scheduled',
        studentName: 'Sci',
        subjectName: 'Vocal',
        studentId: 'student-2',
        subjectId: 'subject-2',
        duration: 60,
        rate: 35.00
      },
      { id: '3', day: 'Friday', time: '2:00pm', status: 'Available', duration: 60, rate: 0 },
      { id: '4', day: 'Friday', time: '2:30pm', status: 'Available', duration: 30, rate: 0 },
      { id: '5', day: 'Friday', time: '3:00pm', status: 'Available', duration: 60, rate: 0 },
      { id: '6', day: 'Saturday', time: '2:00pm', status: 'Available', duration: 60, rate: 0 },
      { id: '7', day: 'Saturday', time: '2:30pm', status: 'Available', duration: 30, rate: 0 },
      { id: '8', day: 'Saturday', time: '3:00pm', status: 'Available', duration: 60, rate: 0 }
    ];
    setCurrentSchedule(initialSchedule);
  }, []);

  const handleScheduleUpdate = (updatedSchedule: ScheduleSlot[]) => {
    setCurrentSchedule(updatedSchedule);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Teacher Profile */}
          <TeacherProfile teacher={teacher} />
          
          {/* Qualifications Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QualificationsTable 
              title="Private Qualifications" 
              qualifications={privateQualifications} 
            />
            <QualificationsTable 
              title="Group Qualifications" 
              qualifications={groupQualifications} 
            />
          </div>
          
          {/* Schedule */}
          <Schedule onScheduleUpdate={handleScheduleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;