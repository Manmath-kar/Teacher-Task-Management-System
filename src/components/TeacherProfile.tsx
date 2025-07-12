import React from 'react';
import { Teacher } from '../types/index.js';

interface TeacherProfileProps {
  teacher: Teacher;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">👨‍🏫</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{teacher.name}</h2>
          <p className="text-gray-600">Teacher</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Details */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Details</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-sm text-gray-900">{teacher.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm text-gray-900">{teacher.status}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Birth Date</p>
              <p className="text-sm text-gray-900">{teacher.birthDate}</p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Email</h3>
          <div>
            <p className="text-xs text-gray-500">Work</p>
            <p className="text-sm text-gray-900">{teacher.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Phone</h3>
          <div>
            <p className="text-xs text-gray-500">Home</p>
            <p className="text-sm text-gray-900">{teacher.phone}</p>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Address</h3>
          <div>
            <p className="text-xs text-gray-500">Home</p>
            <p className="text-sm text-gray-900">{teacher.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;