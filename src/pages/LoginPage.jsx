/**
 * Page: LoginPage
 * Login + Register tabs in one card.
 * Uses the useAuth hook for all logic.
 */

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage({ onLogin }) {
  const [tab, setTab] = useState('login') // 'login' | 'register'

  // Login fields
  const [loginEmail,    setLoginEmail]    = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register fields
  const [regName,     setRegName]     = useState('')
  const [regEmail,    setRegEmail]    = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm,  setRegConfirm]  = useState('')
  const [regSuccess,  setRegSuccess]  = useState('')

  const { login, register, loading, error, setError } = useAuth()

  function switchTab(t) {
    setTab(t)
    setError('')
    setRegSuccess('')
  }

  // ── Handle login form submit ───────────────────────────
  async function handleLogin(e) {
    e.preventDefault()
    const result = await login(loginEmail, loginPassword)
    if (result.ok) onLogin(result.user)
  }

  // ── Handle register form submit ────────────────────────
  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    if (regPassword !== regConfirm) {
      setError('Passwords do not match.')
      return
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    const result = await register(regName.trim(), regEmail.trim(), regPassword)
    if (result.ok) {
      setRegSuccess(`Account created! Welcome, ${result.user.name}`)
      setTimeout(() => onLogin(result.user), 900)
    }
  }

  return (
    <div className="auth-wrapper">
      <div style={{ width: '100%', maxWidth: 440, padding: '0 16px' }}>

        {/* Logo */}
        <div className="auth-logo">
          📝 Nota
          <small>your notes, always with you</small>
        </div>

        {/* Card */}
        <div className="card auth-card">

          {/* Tab switcher */}
          <div className="card-header">
            <ul className="nav nav-tabs w-100">
              <li className="nav-item w-50 text-center">
                <button
                  className={`nav-link w-100 ${tab === 'login' ? 'active' : ''}`}
                  onClick={() => switchTab('login')}
                >
                  Sign In
                </button>
              </li>
              <li className="nav-item w-50 text-center">
                <button
                  className={`nav-link w-100 ${tab === 'register' ? 'active' : ''}`}
                  onClick={() => switchTab('register')}
                >
                  Register
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-4">

            {/* ── LOGIN FORM ── */}
            {tab === 'login' && (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2 px-3" style={{ fontSize: '0.875rem' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn w-100 mt-1"
                  disabled={loading}
                  style={{ backgroundColor: '#6366f1', borderColor: '#6366f1', color: 'white' }}
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>

                <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.8rem' }}>
                  Don't have an account?{' '}
                  <button type="button" className="btn btn-link p-0" style={{ fontSize: '0.8rem' }} onClick={() => switchTab('register')}>
                    Register
                  </button>
                </p>
              </form>
            )}

            {/* ── REGISTER FORM ── */}
            {tab === 'register' && (
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Min 6 characters"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repeat password"
                    value={regConfirm}
                    onChange={e => setRegConfirm(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2 px-3" style={{ fontSize: '0.875rem' }}>
                    {error}
                  </div>
                )}
                {regSuccess && (
                  <div className="alert alert-success py-2 px-3" style={{ fontSize: '0.875rem' }}>
                    {regSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn w-100 mt-1"
                  disabled={loading}
                  style={{ backgroundColor: '#6366f1', borderColor: '#6366f1', color: 'white' }}
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>

                <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.8rem' }}>
                  Already have an account?{' '}
                  <button type="button" className="btn btn-link p-0" style={{ fontSize: '0.8rem' }} onClick={() => switchTab('login')}>
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center mt-3" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
          Connected to Spring Boot API on localhost:8080
        </p>
      </div>
    </div>
  )
}
