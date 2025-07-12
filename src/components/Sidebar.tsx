import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Teachers', icon: '👨‍🏫', active: true },
    { name: 'Subjects', icon: '📚' },
    { name: 'Students', icon: '👨‍🎓' },
    { name: 'Schedule', icon: '📅' },
    { name: 'Payments', icon: '💳' },
    { name: 'Reports', icon: '📊' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Messages', icon: '💬' },
    { name: 'Calendar', icon: '🗓️' },
    { name: 'Resources', icon: '📁' },
    { name: 'Analytics', icon: '📈' },
    { name: 'Notifications', icon: '🔔' },
    { name: 'Help', icon: '❓' },
    { name: 'Profile', icon: '👤' },
    { name: 'Logout', icon: '🚪' },
  ];

  return (
    <div className="w-64 bg-slate-800 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">School MS</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center px-6 py-3 text-sm hover:bg-slate-700 transition-colors ${
                  item.active ? 'bg-slate-700 border-r-2 border-blue-500' : ''
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;