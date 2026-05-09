/**
 * Hook: useAuth — updated for JWT
 * --------------------------------
 * - register: calls /api/users/register → stores JWT → returns user info
 * - login:    calls /api/users/login    → stores JWT → returns user info
 *
 * No passwords are ever stored locally.
 * The JWT (which contains only userId) lives in localStorage as 'nota_jwt'.
 */

import { useState } from 'react'
import * as api from '../api/notesApi'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  // ── Register ──────────────────────────────────────────
  async function register(name, email, password) {
    setLoading(true)
    setError('')
    try {
      // Backend hashes the password — we never touch or store it again
      const data = await api.registerUser(name, email, password)
      api.saveToken(data.token)
      return { ok: true, user: { id: data.id, name: data.name, email: data.email } }
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to server. Is Spring Boot running on port 8080?')
      } else if (err.response.status === 409 || err.response.status === 500) {
        setError('An account with this email already exists.')
      } else {
        setError('Registration failed. Please try again.')
      }
      return { ok: false }
    } finally {
      setLoading(false)
    }
  }

  // ── Login ─────────────────────────────────────────────
  async function login(email, password) {
    setLoading(true)
    setError('')
    try {
      // Backend verifies BCrypt hash — password sent once, never stored
      const data = await api.loginUser(email, password)
      api.saveToken(data.token)
      return { ok: true, user: { id: data.id, name: data.name, email: data.email } }
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to server. Is Spring Boot running on port 8080?')
      } else if (err.response.status === 401) {
        setError('Invalid email or password.')
      } else {
        setError('Login failed. Please try again.')
      }
      return { ok: false }
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ────────────────────────────────────────────
  function logout() {
    api.clearToken()
  }

  return { login, register, logout, loading, error, setError }
}
