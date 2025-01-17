import { useState, useEffect } from 'react';
import { Shortcut } from '@/data/shortcuts';
import { FiCommand, FiClock } from 'react-icons/fi';
import { Tag } from 'antd';

interface Props {
  activeApp: string | null;
  searchQuery: string;
}

const ShortcutList = ({ activeApp, searchQuery }: Props) => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [filteredShortcuts, setFilteredShortcuts] = useState<Shortcut[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeApp) {
      loadShortcuts();
    }
  }, [activeApp]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredShortcuts(
        shortcuts.filter(shortcut =>
          shortcut.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shortcut.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredShortcuts(shortcuts);
    }
  }, [searchQuery, shortcuts]);

  const loadShortcuts = async () => {
    if (!activeApp) return;
    try {
      setLoading(true);
      console.log('activeApp', activeApp);
      const data = await window.electron.getShortcutsByAppName(activeApp);
      setShortcuts(data);
      setFilteredShortcuts(data);
    } catch (error) {
      console.error('Error loading shortcuts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 rounded-lg animate-pulse bg-gray-700/50"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
        Available Shortcuts
        <Tag className="text-white bg-indigo-500">
          {filteredShortcuts.length}
        </Tag>
      </h2>

      {/* Shortcuts Grid */}
      {filteredShortcuts.length === 0 ? (
        <div className="py-12 text-center">
          <FiCommand className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">
            {searchQuery 
              ? 'No shortcuts found for your search' 
              : 'No shortcuts available'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredShortcuts.map((shortcut) => (
            <div
              key={shortcut.id}
              className="group bg-[#363748] rounded-lg p-4 transition-all duration-200"
            >
              <div className="flex flex-col h-full">
                {/* Shortcut Key */}
                <div className="mb-3">
                  <kbd className="px-3 py-1.5 bg-indigo-500 rounded-md font-mono text-sm font-medium transition-colors">
                    {shortcut.key}
                  </kbd>
                </div>

                {/* Description */}
                <div className="flex-1 mb-3">
                  <p className="text-gray-300">{shortcut.description}</p>
                </div>

                {/* Usage Count */}
                <div className="flex items-center text-sm text-gray-400">
                  <FiClock className="mr-1" />
                  <span>{shortcut.usage} times used</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortcutList; 
