import { Route, Router } from 'electron-router-dom'
import App from '../App'
import DbTest from '../components/DbTest'

export const AppRoutes = () => {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<App />} />
          <Route path="/dbTest" element={<DbTest />} />
        </>
      }
    />
  )
}
