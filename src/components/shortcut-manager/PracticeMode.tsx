import { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Shortcut } from '@/data/shortcuts';
import { FiPlay, FiPause, FiTarget } from 'react-icons/fi';
import { useRecentApps } from '@/store/recentApps';


const PracticeMode = () => {
  const { apps } = useRecentApps();
  const activeApp = apps[0];
  const [isActive, setIsActive] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Shortcut | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeApp && isActive) {
      loadNewChallenge();
    }
  }, [activeApp, isActive]);

  const loadNewChallenge = async () => {
    if (!activeApp) return;
    try {
      setLoading(true);
      const shortcuts = await window.electron.getShortcutsByAppName(activeApp.name);
      if (shortcuts.length) {
        const randomShortcut = shortcuts[Math.floor(Math.random() * shortcuts.length)];
        setCurrentChallenge(randomShortcut);
      }
    } catch (error) {
      console.error('Error loading challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartPractice = () => {
    setIsActive(true);
    setScore(0);
    setStreak(0);
    loadNewChallenge();
  };

  const handleStopPractice = () => {
    setIsActive(false);
    setCurrentChallenge(null);
  };

  useHotkeys(currentChallenge?.key || '', () => {
    if (isActive && currentChallenge) {
      window.electron.updateShortcutUsage({
        appName: activeApp!.name,
        shortcutId: currentChallenge.id
      });
      setScore(s => s + 1);
      setStreak(s => s + 1);
      loadNewChallenge();
    }
  }, [currentChallenge, isActive]);

  return (
    <div className="practice-mode">
      <div className="practice-header">
        <h3 className="flex items-center text-xl font-semibold">
          <FiTarget className="mr-2" />
          Practice Mode
        </h3>
        <button
          onClick={isActive ? handleStopPractice : handleStartPractice}
          className={`practice-toggle ${isActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          {isActive ? (
            <>
              <FiPause className="mr-2" />
              Stop Practice
            </>
          ) : (
            <>
              <FiPlay className="mr-2" />
              Start Practice
            </>
          )}
        </button>
      </div>

      {isActive && (
        <div className="practice-content">
          {loading ? (
            <div className="h-32 rounded-lg animate-pulse bg-gray-700/50"></div>
          ) : currentChallenge ? (
            <div className="practice-challenge">
              <p className="mb-4 text-lg">Try this shortcut:</p>
              <div className="flex items-center justify-between">
                <span className="text-lg shortcut-key">{currentChallenge.key}</span>
                <span className="text-gray-300">{currentChallenge.description}</span>
              </div>
              <div className="flex justify-between mt-6 practice-stats">
                <div className="practice-score">
                  Score: {score}
                </div>
                <div className="text-2xl font-bold text-yellow-400 practice-streak">
                  {streak > 0 && `${streak}x Streak!`}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center text-gray-400">
              No shortcuts available for practice
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeMode; 
