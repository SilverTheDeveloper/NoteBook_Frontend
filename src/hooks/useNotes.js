/**
 * Hook: useNotes
 * --------------
 * Fetches, creates, updates and deletes notes for a given user.
 * All API calls go through src/api/notesApi.js
 */

import { useState, useEffect } from 'react'
import * as api from '../api/notesApi'

export function useNotes(userId) {
  const [notes, setNotes]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  // Load notes when the hook mounts
  useEffect(() => {
    if (userId) load()
  }, [userId])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await api.getNotes(userId)
      setNotes(data)
    } catch {
      setError('Could not load notes. Is Spring Boot running?')
    } finally {
      setLoading(false)
    }
  }

  async function addNote(noteData) {
    const created = await api.createNote(userId, noteData)
    setNotes(prev => [created, ...prev])
  }

  async function editNote(id, noteData) {
    const updated = await api.updateNote(id, noteData)
    setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
  }

  async function removeNote(id) {
    await api.deleteNote(id)
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return { notes, loading, error, reload: load, addNote, editNote, removeNote }
}
