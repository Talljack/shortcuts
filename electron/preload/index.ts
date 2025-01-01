import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  send: (channel: string, data: any) => {
    if (channel && data) {
      ipcRenderer.send(channel, data)
    }
  },
  on: (channel: string, callback: Function) => {
    if (channel && callback) {
      const subscription = (_event: any, data: any) => callback(data)
      ipcRenderer.on(channel, subscription)
      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    }
    return () => {}
  },
  invoke: (channel: string, data: any) => {
    if (channel) {
      return ipcRenderer.invoke(channel, data)
    }
    return Promise.reject(new Error('Invalid channel'))
  },
  getShortcuts: (appName: string) => {
    if (appName) {
      return ipcRenderer.invoke('get-shortcuts', appName)
    }
    return Promise.resolve([])
  },
  updateShortcutUsage: (data: {
    appName: string,
    shortcutId: string
  }) => {
    if (data.appName && data.shortcutId) {
      return ipcRenderer.invoke('update-shortcut-usage', data)
    }
    return Promise.resolve()
  },
  onActiveWindowChange: (callback: Function) => {
    if (callback) {
      const subscription = (_event: any, data: any) => callback(data)
      ipcRenderer.on('active-window-changed', subscription)
      return () => {
        ipcRenderer.removeListener('active-window-changed', subscription)
      }
    }
    return () => {}
  }
}

// Legacy ipcRenderer exposure
const legacyApi = {
  send: (...args: any[]) => ipcRenderer.send(...args),
  on: (...args: any[]) => ipcRenderer.on(...args),
  once: (...args: any[]) => ipcRenderer.once(...args),
  removeListener: (...args: any[]) => ipcRenderer.removeListener(...args),
  removeAllListeners: (...args: any[]) => ipcRenderer.removeAllListeners(...args),
  off: (...args: any[]) => ipcRenderer.removeListener(...args),
  invoke: (...args: any[]) => ipcRenderer.invoke(...args),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', api)
    contextBridge.exposeInMainWorld('ipcRenderer', legacyApi)
  } catch (error) {
    console.error('Error exposing API:', error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = api
  // @ts-ignore (define in dts)
  window.ipcRenderer = legacyApi
}

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)
