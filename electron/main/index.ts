import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { update } from './update'
import activeWin from 'active-win'
import Store from 'electron-store'
import { getShortcutsForApp, updateShortcutUsage, resetShortcuts, getAllShortcuts } from './shortcuts'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Initialize store for saving user progress and preferences
const store = new Store()

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
let activeWindowDetectionInterval: NodeJS.Timeout | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

app.setName('Shortcut Master');

async function createWindow() {
  // 获取图标路径
  const iconPath = process.env.VITE_DEV_SERVER_URL 
    ? path.join(process.env.APP_ROOT, 'public', 'icon.png') // 开发环境
    : path.join(process.env.APP_ROOT, 'dist', 'icon.png');  // 生产环境

  win = new BrowserWindow({
    title: 'Shortcut Master',
    // 暂时注释掉 icon 配置
    // icon: iconPath,
    width: 1000,
    height: 680,
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false
    },
    frame: true,  // 保留窗口框架
    transparent: false,
    alwaysOnTop: true, // 窗口始终保持在最顶层
    skipTaskbar: false, // 在任务栏显示
    resizable: true,
    fullscreenable: false, // 禁止全屏
    maximizable: false,    // 禁止最大化
    hasShadow: true,
    show: false,          // 初始不显示，等待加载完成
  });

  // 暂时注释掉 dock 图标设置
  // if (process.platform === 'darwin') {
  //   app.dock.setIcon(iconPath);
  // }

  // 当窗口准备好时再显示
  win.once('ready-to-show', () => {
    win?.show();
  });

  // 设置窗口层级
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setAlwaysOnTop(true, 'floating');

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // 监听窗口失去焦点事件
  win.on('blur', () => {
    // 确保窗口始终在顶部
    if (win && !win.isDestroyed()) {
      win.setAlwaysOnTop(true, 'floating');
    }
  });

  // Start active window detection when window is ready
  win.webContents.on('did-finish-load', () => {
    if (win) {
      // Send initial message
      win.webContents.send('main-process-message', 'Window loaded at: ' + new Date().toLocaleString())
      // Start active window detection
      startActiveWindowDetection()
    }
  })

  win.on('closed', () => {
    stopActiveWindowDetection()
    win = null
  })

  // Make all links open with the browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  update(win)

  // 监听窗口移动和调整大小
  win?.on('moved', saveWindowBounds);
  win?.on('resized', saveWindowBounds);
}

// Active window detection
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
      
      // 获取当前激活的窗口
      const focusedWindow = BrowserWindow.getFocusedWindow();
      const isShortcutMasterActive = focusedWindow === win;
      
      // 如果 Shortcut Master 不是当前激活窗口，则发送更新
      if (!isShortcutMasterActive && appName !== 'Shortcut Master') {
        win.webContents.send('active-window-changed', {
          name: appName,
          title: activeWindow.title,
          path: activeWindow.owner.path,
          isActive: false
        });
      }
    }
  } catch (error) {
    console.error('Error detecting active window:', error);
  }
}

function startActiveWindowDetection() {
  stopActiveWindowDetection();
  if (!activeWindowDetectionInterval && win && !win.isDestroyed()) {
    activeWindowDetectionInterval = setInterval(detectActiveWindow, 1000);
  }
}

function stopActiveWindowDetection() {
  if (activeWindowDetectionInterval) {
    clearInterval(activeWindowDetectionInterval);
    activeWindowDetectionInterval = null;
  }
}

// App lifecycle events
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  stopActiveWindowDetection();
  win = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers
ipcMain.handle('get-shortcuts-by-app-name', async (_, appName: string) => {
  const shortcuts = getShortcutsForApp(appName);
  return shortcuts;
});

ipcMain.handle('update-shortcut-usage', async (_, data: {
  appName: string,
  shortcutId: string
}) => {
  updateShortcutUsage(data.appName, data.shortcutId)
})

// 添加调试用的 IPC handlers
ipcMain.handle('debug-reset-shortcuts', async () => {
  resetShortcuts();
  return getAllShortcuts();
});

ipcMain.handle('get-all-shortcuts', async () => {
  return getAllShortcuts();
});

// 添加窗口位置保存功能
function saveWindowBounds() {
  if (!win) return;
  const bounds = win.getBounds();
  store.set('windowBounds', bounds);
}

// 恢复窗口位置
function restoreWindowBounds() {
  const bounds = store.get('windowBounds') as Electron.Rectangle | undefined;
  if (bounds && win) {
    win.setBounds(bounds);
  }
}

// 在应用退出前保存窗口位置
app.on('before-quit', () => {
  saveWindowBounds();
});
