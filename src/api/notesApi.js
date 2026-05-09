/**
 * API Layer — updated for JWT auth
 * ----------------------------------
 * - getToken() reads the JWT from localStorage (stored at login/register)
 * - authHeaders() attaches it as  Authorization: Bearer <token>
 * - All note endpoints and protected user endpoints send the token
 * - loginUser() and registerUser() are public — no token needed
 *
 * Passwords are sent to the backend ONCE (over HTTPS in production)
 * and are never stored or logged on the frontend.
 */

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ── Token helpers ─────────────────────────────────────────

/** Read the JWT that was stored after login/register. */
export function getToken() {
  return localStorage.getItem('nota_jwt') || null
}

/** Store the JWT (called right after login or register). */
export function saveToken(token) {
  localStorage.setItem('nota_jwt', token)
}

/** Remove token on logout. */
export function clearToken() {
  localStorage.removeItem('nota_jwt')
}

/** Build the Authorization header object. */
function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ── User endpoints (public — no token needed) ─────────────

/**
 * POST /api/users/register
 * Returns { token, id, name, email }  — password is NOT in the response
 */
export const registerUser = (name, email, password) =>
  api.post('/users/register', { name, email, password }).then(res => res.data)

/**
 * POST /api/users/login
 * Returns { token, id, name, email }
 */
export const loginUser = (email, password) =>
  api.post('/users/login', { email, password }).then(res => res.data)

// ── User endpoints (protected) ────────────────────────────

export const getUserById = (id) =>
  api.get(`/users/${id}`, { headers: authHeaders() }).then(res => res.data)

// ── Note endpoints (all protected) ───────────────────────

export const getNotes = (userId) =>
  api.get(`/notes/user/${userId}`, { headers: authHeaders() }).then(res => res.data)

export const createNote = (userId, note) =>
  api.post(`/notes/user/${userId}`, note, { headers: authHeaders() }).then(res => res.data)

export const updateNote = (id, note) =>
  api.put(`/notes/${id}`, note, { headers: authHeaders() }).then(res => res.data)

export const deleteNote = (id) =>
  api.delete(`/notes/${id}`, { headers: authHeaders() })
