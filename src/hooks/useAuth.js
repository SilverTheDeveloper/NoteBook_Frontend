import { useState } from 'react'
import * as api from '../api/notesApi'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ── Register ──────────────────────────────────────────
  async function register(name, email, password) {
    setLoading(true)
    setError('')

    try {
      const data = await api.registerUser(name, email, password)

      // Save JWT
      api.saveToken(data.token)

      // Save user info
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
      }

      localStorage.setItem('nota_user', JSON.stringify(user))

      return { ok: true, user }

    } catch (err) {

      if (!err.response) {
        setError('Cannot connect to server.')
      } else if (
        err.response.status === 409 ||
        err.response.status === 500
      ) {
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
      const data = await api.loginUser(email, password)

      // Save JWT
      api.saveToken(data.token)

      // Save user info
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
      }

      localStorage.setItem('nota_user', JSON.stringify(user))

      return { ok: true, user }

    } catch (err) {

      if (!err.response) {
        setError('Cannot connect to server.')
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
    localStorage.removeItem('nota_user')
  }

  return {
    login,
    register,
    logout,
    loading,
    error,
    setError,
  }
}