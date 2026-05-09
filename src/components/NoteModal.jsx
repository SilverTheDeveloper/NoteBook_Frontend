/**
 * Component: NoteModal
 * A modal form for creating or editing a note.
 * Fields: title, content, category — matching Note.java entity.
 */

import { useState, useEffect } from 'react'

const CATEGORIES = ['General', 'Work', 'Personal', 'Ideas']

export default function NoteModal({ note, onSave, onClose, saving }) {
  const [title,    setTitle]    = useState('')
  const [content,  setContent]  = useState('')
  const [category, setCategory] = useState('General')

  // Pre-fill form when editing an existing note
  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setContent(note.content || '')
      setCategory(note.category || 'General')
    }
  }, [note])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() && !content.trim()) return
    onSave({ title: title.trim() || 'Untitled', content: content.trim(), category })
    onClose()
  }

  // Close modal when clicking the dark backdrop
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-box">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title fw-bold">
            {note ? 'Edit Note' : '+ New Note'}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          />
        </div>

        {/* Body — the form */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Note title…"
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
              />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Content</label>
              <textarea
                className="form-control"
                rows={6}
                placeholder="Write your note here…"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-1">
              <label className="form-label fw-semibold">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}
            >
              {saving ? 'Saving…' : 'Save Note'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
