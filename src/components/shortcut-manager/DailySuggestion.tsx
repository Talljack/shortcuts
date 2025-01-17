import { useState, useEffect } from 'react';
import { Shortcut } from './types';
import { FiStar, FiTrendingUp } from 'react-icons/fi';

interface Props {
  activeApp: string | null;
}

const DailySuggestion = ({ activeApp }: Props) => {
  const [suggestion, setSuggestion] = useState<Shortcut | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeApp) {
      loadDailySuggestion();
    }
  }, [activeApp]);

  const loadDailySuggestion = async () => {
    if (!activeApp) return;

    try {
      setLoading(true);
      const shortcuts = await window.electron.getShortcuts(activeApp);
      // Get least used shortcuts first
      const sortedShortcuts = shortcuts.sort((a, b) => a.usage - b.usage);
      setSuggestion(sortedShortcuts[0]);
    } catch (error) {
      console.error('Error loading daily suggestion:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
        <div className="h-20 rounded animate-pulse bg-white/10"></div>
      </div>
    );
  }

  if (!suggestion) return null;

  return (
    <div className="p-6 text-white bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-600">
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center text-xl font-semibold">
          <FiStar className="mr-2" />
          Daily Suggestion
        </h3>
        <span className="flex items-center text-sm text-white/70">
          <FiTrendingUp className="mr-1" />
          Learn New Shortcuts
        </span>
      </div>
      <div className="p-4 mt-4 rounded-lg bg-black/20">
        <div className="flex justify-between items-center mb-2">
          <div className="px-3 py-1.5 bg-indigo-500 rounded-md font-mono text-sm font-medium">
            {suggestion.key}
          </div>
          <div className="text-sm text-white/60">Times used: {suggestion.usage}</div>
        </div>
        <div className="mt-2 text-lg">{suggestion.description}</div>
      </div>
    </div>
  );
};

export default DailySuggestion;
