/**
 * Page: DashboardPage
 * Shows all notes for the logged-in user.
 * Uses the useNotes hook for all data operations.
 */

import { useState } from 'react'
import { useNotes } from '../hooks/useNotes'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'
import SkeletonGrid from '../components/SkeletonGrid'

export default function DashboardPage({ user, onLogout }) {
  const { notes, loading, error, reload, addNote, editNote, removeNote } = useNotes(user.id)

  const [search,      setSearch]      = useState('')
  const [modalOpen,   setModalOpen]   = useState(false)
  const [editingNote, setEditingNote] = useState(null)  // null = new note
  const [saving,      setSaving]      = useState(false)
  const [deleteId,    setDeleteId]    = useState(null)  // for double-confirm

  // Filter notes by search input
  const filtered = notes.filter(n =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.content?.toLowerCase().includes(search.toLowerCase()) ||
    n.category?.toLowerCase().includes(search.toLowerCase())
  )

  // Total words across all notes
  const wordCount = notes.reduce(
    (sum, n) => sum + (n.content?.split(/\s+/).filter(Boolean).length || 0), 0
  )

  // ── Open modal for new note ────────────────────────────
  function openNew() {
    setEditingNote(null)
    setModalOpen(true)
  }

  // ── Open modal to edit existing note ──────────────────
  function openEdit(note) {
    setEditingNote(note)
    setModalOpen(true)
  }

  // ── Save note (create or update) ──────────────────────
  async function handleSave(noteData) {
    setSaving(true)
    try {
      if (editingNote) {
        await editNote(editingNote.id, noteData)
      } else {
        await addNote(noteData)
      }
    } catch {
      alert('Failed to save note. Is the backend running?')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete with double-confirm ─────────────────────────
  async function handleDelete(id) {
    if (deleteId !== id) {
      // First click — set a 2.5 second confirmation window
      setDeleteId(id)
      setTimeout(() => setDeleteId(null), 2500)
      return
    }
    // Second click — actually delete
    setDeleteId(null)
    try {
      await removeNote(id)
    } catch {
      alert('Failed to delete note.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>

      <Navbar user={user} onLogout={onLogout} />

      <div className="container py-4">

        {/* ── Page header ── */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
          <div>
            <h1 className="page-title mb-0">Your Notes</h1>
            <p className="stats-text mt-1">
              {notes.length} note{notes.length !== 1 ? 's' : ''} · {wordCount.toLocaleString()} words
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {/* Search */}
            <input
              type="text"
              className="form-control"
              style={{ width: 220 }}
              placeholder="Search notes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            {/* Refresh */}
            <button
              className="btn btn-outline-secondary"
              onClick={reload}
              title="Refresh from server"
            >
              ↻
            </button>

            {/* New note */}
            <button
              className="btn"
              onClick={openNew}
              style={{ backgroundColor: '#6366f1', borderColor: '#6366f1', color: 'white' }}
            >
              + New Note
            </button>
          </div>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center justify-content-between">
            <span>⚠ {error}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={reload}>Retry</button>
          </div>
        )}

        {/* ── Loading skeletons ── */}
        {loading && <SkeletonGrid />}

        {/* ── Notes grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="row g-3">
            {filtered.map(note => (
              <div key={note.id} className="col-12 col-sm-6 col-lg-4">
                <NoteCard
                  note={note}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h5 className="text-muted">
              {search ? 'No notes found' : 'No notes yet'}
            </h5>
            <p className="text-muted">
              {search
                ? 'Try a different search term'
                : 'Click "+ New Note" to create your first note'}
            </p>
          </div>
        )}
      </div>

      {/* ── Delete confirm toast ── */}
      {deleteId && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4 alert alert-warning shadow"
          style={{ zIndex: 1100, width: 'auto', whiteSpace: 'nowrap' }}
        >
          Click <strong>Delete</strong> again to confirm
        </div>
      )}

      {/* ── Note modal ── */}
      {modalOpen && (
        <NoteModal
          note={editingNote}
          saving={saving}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
