// /**
//  * App.jsx — Root component
//  * -------------------------
//  * On logout: clears the JWT from localStorage via clearToken(),
//  * then resets user state to show the login page.
//  */

// import { useState }   from 'react'
// import { clearToken } from './api/notesApi'
// import LoginPage      from './pages/LoginPage'
// import DashboardPage  from './pages/DashboardPage'

// export default function App() {
//   const [user, setUser] = useState(null)

//   function handleLogout() {
//     clearToken()   // remove JWT from localStorage
//     setUser(null)  // go back to login page
//   }

//   if (!user) {
//     return <LoginPage onLogin={setUser} />
//   }

//   return <DashboardPage user={user} onLogout={handleLogout} />
// }


/**
 * App.jsx — Root component
 * -------------------------
 * Persistent login support:
 * - Restores user from localStorage on refresh
 * - Clears JWT + user on logout
 */

import { useEffect, useState } from 'react'

import { clearToken } from './api/notesApi'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {

  // Restore saved user on app startup
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nota_user')

    return savedUser ? JSON.parse(savedUser) : null
  })

  // Optional extra safety check
  useEffect(() => {
    const savedUser = localStorage.getItem('nota_user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // ── Logout ────────────────────────────────────────────
  function handleLogout() {

    // Remove JWT
    clearToken()

    // Remove saved user
    localStorage.removeItem('nota_user')

    // Reset React state
    setUser(null)
  }

  // ── Show Login Page if not authenticated ──────────────
  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  // ── Show Dashboard if logged in ───────────────────────
  return (
    <DashboardPage
      user={user}
      onLogout={handleLogout}
    />
  )
}