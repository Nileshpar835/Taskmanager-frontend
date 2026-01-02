import './LevelCard.css'

export default function LevelCard({ level, xp }) {
  const xpForNextLevel = level * 50
  const xpProgress = ((xp % 50) / 50) * 100

  return (
    <div className="level-card">
      <div className="level-display">
        <div className="level-number">
          <span className="level-text">LEVEL</span>
          <span className="level-value">{level}</span>
        </div>
        
        <div className="xp-section">
          <div className="xp-info">
            <span className="xp-label">Experience Points</span>
            <span className="xp-value">{xp} XP</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${xpProgress}%` }}></div>
          </div>
          <span className="xp-next">{xp % 50}/{50} to next level</span>
        </div>
      </div>
    </div>
  )
}
