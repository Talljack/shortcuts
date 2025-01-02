import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiCommand, FiSettings, FiPlay } from 'react-icons/fi';

const MainLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: <FiCommand className="w-5 h-5" />,
      label: 'Shortcuts Manager',
      path: '/'
    },
    {
      icon: <FiPlay className="w-5 h-5" />,
      label: 'Practice Mode',
      path: '/practice'
    },
    {
      icon: <FiSettings className="w-5 h-5" />,
      label: 'Settings',
      path: '/settings'
    }
  ];

  return (
    <div className="flex h-screen w-screen bg-[#1E1E2E]">
      {/* Left Sidebar */}
      <div className="w-[260px] bg-[#1E1E2E] border-r border-[#2F2F2F] flex flex-col">
        {/* Header */}
        <div className="h-14 flex items-center px-4 border-b border-[#2F2F2F]">
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text">
            Shortcut Master
          </span>
        </div>

        {/* Navigation List */}
        <div className="flex-1 p-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                w-full flex items-center px-3 py-2 rounded-md mb-1
                ${location.pathname === item.path 
                  ? 'bg-[#2F2F2F] text-white' 
                  : 'text-gray-400 hover:bg-[#2F2F2F] hover:text-white'}
              `}
            >
              {item.icon}
              <span className="ml-2 text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex flex-col flex-1">
        {/* Main Content - This is where nested routes will render */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 
