/**
 * Component: Navbar
 * Shows the app name, user's name, and a logout button.
 */

export default function Navbar({ user, onLogout }) {
  // Get initials from user's name for the avatar
  const initials = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <span className="navbar-brand">📝 Nota</span>

      <div className="ms-auto d-flex align-items-center gap-3">
        {/* Avatar circle */}
        <div
          className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
          style={{ width: 36, height: 36, background: '#6366f1', fontSize: '0.8rem' }}
        >
          {initials}
        </div>

        <span className="text-white-50 d-none d-md-inline" style={{ fontSize: '0.9rem' }}>
          {user.name}
        </span>

        <button
          onClick={onLogout}
          className="btn btn-sm btn-outline-light"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
