import { Shortcut } from '@/components/shortcut-manager/types';

interface IpcRenderer {
  send: (...args: any[]) => void
  on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
  once: (channel: string, listener: (event: any, ...args: any[]) => void) => void
  removeListener: (channel: string, listener: (...args: any[]) => void) => void
  removeAllListeners: (channel: string) => void
  off: (channel: string, listener: (event: any, ...args: any[]) => void) => void
  invoke: (channel: string, ...args: any[]) => Promise<any>
}

interface ElectronAPI {
  send: (channel: string, data: any) => void
  on: (channel: string, callback: Function) => () => void
  invoke: (channel: string, data: any) => Promise<any>
  getShortcutsByAppName: (appName: string) => Promise<Shortcut[]>
  updateShortcutUsage: (data: {
    appName: string
    shortcutId: string
  }) => Promise<void>
  onActiveWindowChange: (callback: (window: {
    name: string
    title: string
    path: string
  }) => void) => () => void
  getAllShortcuts: () => Promise<Shortcut[]>
}

declare global {
  interface Window {
    electron: ElectronAPI
    ipcRenderer: IpcRenderer
  }
}

export { ElectronAPI, IpcRenderer }
