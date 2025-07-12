import React from 'react';
import { Qualification } from '../types/index.js';

interface QualificationsTableProps {
  title: string;
  qualifications: Qualification[];
}

const QualificationsTable: React.FC<QualificationsTableProps> = ({ title, qualifications }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {qualifications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Qualification</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rate</th>
              </tr>
            </thead>
            <tbody>
              {qualifications.map((qualification) => (
                <tr key={qualification.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{qualification.name}</td>
                  <td className="py-3 px-4 text-gray-900">${qualification.rate.toFixed(2)}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No qualifications added yet</p>
        </div>
      )}
    </div>
  );
};

export default QualificationsTable;