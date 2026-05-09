/**
 * App.jsx — Root component
 * -------------------------
 * On logout: clears the JWT from localStorage via clearToken(),
 * then resets user state to show the login page.
 */

import { useState }   from 'react'
import { clearToken } from './api/notesApi'
import LoginPage      from './pages/LoginPage'
import DashboardPage  from './pages/DashboardPage'

export default function App() {
  const [user, setUser] = useState(null)

  function handleLogout() {
    clearToken()   // remove JWT from localStorage
    setUser(null)  // go back to login page
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  return <DashboardPage user={user} onLogout={handleLogout} />
}
