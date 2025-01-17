import Store from 'electron-store';
import { defaultShortcuts } from '../../src/data/shortcuts';
import { Shortcut } from '@/data/shortcuts';
import { activeWin } from 'active-win';

const store = new Store();

// 修改初始化逻辑
const initializeShortcuts = () => {
  const currentShortcuts = store.get('shortcuts') as Shortcut[];
  
  // 合并现有快捷键和默认快捷键
  const mergedShortcuts = { ...defaultShortcuts };
  
  // 保留现有快捷键的使用次数
  Object.keys(currentShortcuts).forEach(app => {
    if (mergedShortcuts[app as keyof typeof mergedShortcuts]) {
      mergedShortcuts[app as keyof typeof mergedShortcuts] = mergedShortcuts[app as keyof typeof mergedShortcuts].map(shortcut => {
        const existing = currentShortcuts[app as keyof typeof currentShortcuts]?.find(s => s.id === shortcut.id);
        return existing ? { ...shortcut, usage: existing.usage } : shortcut;
      });
    }
  });

  console.log('Initializing shortcuts store with:', mergedShortcuts);
  store.set('shortcuts', mergedShortcuts);
  return mergedShortcuts;
};

// 确保每次启动时都初始化快捷键
const shortcuts = initializeShortcuts();

export const getShortcutsForApp = (appName: string) => {
  console.log('Getting shortcuts for app:', appName);
  const shortcuts = store.get('shortcuts') as typeof defaultShortcuts;
  console.log('All shortcuts in store:', shortcuts);
  console.log('Available apps:', Object.keys(shortcuts));
  
  // 确保大小写匹配
  const normalizedAppName = Object.keys(shortcuts).find(
    key => key.toLowerCase() === appName.toLowerCase()
  );
  
  if (normalizedAppName) {
    console.log('Found shortcuts for:', normalizedAppName);
    return shortcuts[normalizedAppName];
  }
  
  console.log('No shortcuts found for:', appName);
  return [];
};

export const updateShortcutUsage = (appName: string, shortcutId: string) => {
  const shortcuts = store.get('shortcuts') as typeof defaultShortcuts;
  const normalizedAppName = Object.keys(shortcuts).find(
    key => key.toLowerCase() === appName.toLowerCase()
  );
  
  if (normalizedAppName && shortcuts[normalizedAppName]) {
    const shortcut = shortcuts[normalizedAppName].find(s => s.id === shortcutId);
    if (shortcut) {
      shortcut.usage += 1;
      store.set('shortcuts', shortcuts);
    }
  }
};

// 添加一个重置函数，用于调试
export const resetShortcuts = () => {
  console.log('Resetting shortcuts to defaults');
  store.set('shortcuts', defaultShortcuts);
};

// 添加一个获取所有快捷键的函数，用于调试
export const getAllShortcuts = () => {
  return store.get('shortcuts');
};

// 在 detectActiveWindow 函数中修改
async function detectActiveWindow() {
  if (!win || win.isDestroyed()) {
    stopActiveWindowDetection();
    return;
  }

  try {
    const activeWindow = await activeWin();
    if (activeWindow && win && !win.isDestroyed()) {
      let appName = activeWindow.owner.name;
      
      // 标准化应用名称
      if (appName.includes('Cursor')) appName = 'Cursor';
      if (appName.includes('Chrome')) appName = 'Google Chrome';
      if (appName.includes('Code')) appName = 'Visual Studio Code';
      if (appName.includes('Photoshop')) appName = 'Adobe Photoshop';
      if (appName.includes('Electron')) appName = 'Shortcut Master';
      
      // 确保不是自己的窗口，并且窗口保持在顶部
      if (appName !== 'Shortcut Master') {
        win.webContents.send('active-window-changed', {
          name: appName,
          title: activeWindow.title,
          path: activeWindow.owner.path
        });
        
        // 确保窗口始终在顶部
        win.setAlwaysOnTop(true, 'floating');
      }
    }
  } catch (error) {
    console.error('Error detecting active window:', error);
  }
}
