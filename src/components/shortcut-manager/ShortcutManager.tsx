import { useState, useEffect } from 'react';
import ShortcutList from './ShortcutList';
import ShortcutSearch from './ShortcutSearch';
import DailySuggestion from './DailySuggestion';
import { FiCommand, FiSearch, FiMonitor } from 'react-icons/fi';
import { useRecentApps } from '@/store/recentApps';

const ShortcutManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const {
    apps,
    selectedApp,
    currentWindow,
    addApp,
    setSelectedApp,
    setCurrentWindow
  } = useRecentApps();

  // 监听窗口变化
  useEffect(() => {
    try {
      const windowHandler = (_event: any, window: any) => {
        if (window && window.name !== 'Shortcut Master') {
          // 添加到访问历史
          addApp(window.name);
          // 更新当前窗口
          setCurrentWindow(window.name);
        }
      };

      window.ipcRenderer.on('active-window-changed', windowHandler);

      return () => {
        window.ipcRenderer.removeListener('active-window-changed', windowHandler);
      };
    } catch (err) {
      setError('Failed to initialize window tracking');
      console.error('Error in ShortcutManager:', err);
    }
  }, [addApp, setCurrentWindow]);

  const handleDebugReset = async () => {
    try {
      await window.electron.invoke('debug-reset-shortcuts');
      const allShortcuts = await window.electron.invoke('debug-get-all-shortcuts');
      console.log('All shortcuts after reset:', allShortcuts);
    } catch (error) {
      console.error('Debug reset error:', error);
    }
  };

  // 选择一个应用
  const handleAppSelect = (appName: string) => {
    const app = apps.find(a => a.name === appName);
    if (app) {
      setSelectedApp(app);
    }
  };

  return (
    <div className="bg-[#1E1E2E] text-white overflow-auto">
      <div className="max-w-6xl p-6 mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="flex items-center text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text">
            <FiCommand className="inline-block mr-2" />
            Shortcut Master
          </h1>
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={handleDebugReset}
              className="px-4 py-2 text-sm bg-red-500 rounded-lg hover:bg-red-600"
            >
              Reset Shortcuts
            </button>
          )}
        </header>

        <div className="flex items-center gap-3 p-4 bg-[#2A2B3C] rounded-lg mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-lg">
            <FiMonitor className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {selectedApp?.name || currentWindow || 'No active window'}
            </h2>
            {currentWindow && currentWindow !== selectedApp?.name && (
              <p className="text-sm text-gray-400">
                Current active window: {currentWindow}
              </p>
            )}
          </div>
          {apps.length > 0 && (
            <select
              value={selectedApp?.name || ''}
              onChange={(e) => handleAppSelect(e.target.value)}
              className="bg-[#363748] text-white px-4 py-2 rounded-lg border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select an app</option>
              {apps.map(app => (
                <option key={app.name} value={app.name}>
                  {app.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex bg-[#2A2B3C] rounded-lg p-4 mb-6">
          <ShortcutSearch
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#2A2B3C] rounded-lg p-6 transition-colors duration-200">
            <DailySuggestion activeApp={selectedApp?.name || currentWindow} />
          </div>

          <div className="bg-[#2A2B3C] rounded-lg p-6 transition-colors duration-200 col-span-full">
            <ShortcutList
              activeApp={selectedApp?.name || currentWindow}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortcutManager;
