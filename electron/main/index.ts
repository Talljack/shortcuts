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

async function createWindow() {
  win = new BrowserWindow({
    title: 'Shortcut Master',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

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
      
      // 确保不是自己的窗口
      if (appName !== 'Shortcut Master') {
        win.webContents.send('active-window-changed', {
          name: appName,
          title: activeWindow.title,
          path: activeWindow.owner.path
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
ipcMain.handle('get-shortcuts', async (_, appName: string) => {
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

ipcMain.handle('debug-get-all-shortcuts', async () => {
  return getAllShortcuts();
});
