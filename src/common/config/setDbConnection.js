import { ipcMain } from 'electron'
import { dbClientUrls } from '../db/dbClientUrls'

/**
 *
 * @param {BrowserWindow} browserWindow
 */
const connectDatabase = () => {
  //   const webContents = browserWindow.webContents;
  //   if (!webContents) throw new Error("browserWindow.webContents is undefined.");
  ipcMain.handle('DB_REQUEST', handleDbRequest)
}

/**
 *
 * @param {string} event
 * @param {string} url
 * @param {object} param
 */
const handleDbRequest = async (event, ...args) => {
  const [url, param] = args
  console.log('DB_REQUEST ACCEPTED', { url, param })

  const mappedController = getExecution(url)

  return await mappedController(param)
}

export { connectDatabase }

const getExecution = (url) => {
  const urlArr = url.split('/')
  let currentObj = dbClientUrls // 값 복사

  for (const segment of urlArr) {
    if (currentObj[segment] !== undefined) {
      currentObj = currentObj[segment]
    } else {
      console.error(`404 ERROR!! Mapped URL '${segment}' not found.`)
      return null // 또는 적절한 기본값/에러 처리
    }
  }
  if (currentObj.execute !== undefined) {
    return currentObj.execute
  } else {
    console.error('Execute property not found.')
    return null
  }
}
