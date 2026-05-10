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