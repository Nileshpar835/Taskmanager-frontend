import './TaskItem.css'

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox-wrapper">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed, task.title)}
          className="task-checkbox"
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`} className="checkbox-label"></label>
      </div>

      <div className="task-content">
        <span className="task-title">{task.title}</span>
        {task.completed && <span className="xp-reward">+10 XP</span>}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        title="Delete task"
      >
        🗑️
      </button>
    </div>
  )
}
