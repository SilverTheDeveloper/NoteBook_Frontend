/**
 * Component: SkeletonGrid
 * Shows placeholder cards while notes are loading from the backend.
 */

function SkeletonCard() {
  return (
    <div className="card" style={{ borderRadius: 12 }}>
      <div className="card-body">
        <div className="skeleton mb-3" style={{ height: 16, width: '60%' }} />
        <div className="skeleton mb-2" style={{ height: 12, width: '100%' }} />
        <div className="skeleton mb-2" style={{ height: 12, width: '85%' }} />
        <div className="skeleton"      style={{ height: 12, width: '70%' }} />
      </div>
    </div>
  )
}

export default function SkeletonGrid() {
  return (
    <div className="row g-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="col-12 col-sm-6 col-lg-4">
          <SkeletonCard />
        </div>
      ))}
    </div>
  )
}
