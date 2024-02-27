import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const dbConnectionApi = {
  request: (...args) => ipcRenderer.invoke('DB_REQUEST', ...args)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('DbConnection', dbConnectionApi)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = dbConnectionApi
}
