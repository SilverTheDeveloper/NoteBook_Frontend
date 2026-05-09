/**
 * Component: NoteCard
 * Shows a single note in the grid.
 * Edit/Delete buttons appear on hover (CSS handles opacity).
 */

// Color strip at top based on category
const STRIP_CLASS = {
  General:  'strip-general',
  Work:     'strip-work',
  Personal: 'strip-personal',
  Ideas:    'strip-ideas',
}

// Colored badge for category label
const BADGE_CLASS = {
  General:  'badge-general',
  Work:     'badge-work',
  Personal: 'badge-personal',
  Ideas:    'badge-ideas',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return isNaN(d) ? dateStr : d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export default function NoteCard({ note, onEdit, onDelete }) {
  const stripClass = STRIP_CLASS[note.category] || 'strip-general'
  const badgeClass = BADGE_CLASS[note.category] || 'badge-general'

  return (
    <div className="note-card card" onClick={() => onEdit(note)}>
      {/* Color strip */}
      <div className={`category-strip ${stripClass}`} />

      <div className="card-body">
        {/* Title + category badge */}
        <div className="d-flex align-items-start justify-content-between mb-2">
          <h6 className="card-title mb-0 me-2">{note.title}</h6>
          {note.category && (
            <span className={`badge rounded-pill ${badgeClass}`} style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
              {note.category}
            </span>
          )}
        </div>

        {/* Content preview */}
        <p className="card-text">{note.content || 'No content'}</p>
      </div>

      <div className="card-footer">
        {/* Date */}
        <span>{formatDate(note.createdAt)}</span>

        {/* Action buttons — visible on hover via CSS */}
        <div
          className="d-flex gap-1"
          onClick={e => e.stopPropagation()} // Don't trigger card click
        >
          <button
            className="btn btn-sm btn-outline-primary btn-action"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger btn-action"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
