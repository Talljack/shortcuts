import { useState, useEffect } from 'react';
import ShortcutList from './ShortcutList';
import ShortcutSearch from './ShortcutSearch';
import { FiMonitor } from 'react-icons/fi';
import { ScrollArea } from '@/components/ui/scroll-area';
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

  // 选择一个应用
  const handleAppSelect = (appName: string) => {
    const app = apps.find(a => a.name === appName);
    if (app) {
      setSelectedApp(app);
    }
  };

  return (
    <div className="bg-[#1E1E2E] text-white overflow-auto">
      <div className="p-6 mx-auto max-w-8xl">

        <div className="flex items-center gap-3 p-4 bg-[#2A2B3C] rounded-lg mb-6">
          <div className="flex justify-center items-center w-8 h-8 bg-indigo-500 rounded-lg">
            <FiMonitor className="w-5 h-5" />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <p className="m-0 text-xl font-semibold">
              {selectedApp?.name || currentWindow || 'No active window'}
            </p>
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

        <ScrollArea className="h-[calc(100vh-340px)]">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#2A2B3C] rounded-lg p-6 transition-colors duration-200 col-span-full">
            <ShortcutList
              activeApp={selectedApp?.name || currentWindow}
              searchQuery={searchQuery}
            />
          </div>
        </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ShortcutManager;
