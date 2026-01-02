import TaskItem from './TaskItem'
import './TaskList.css'

export default function TaskList({ tasks, onToggle, onDelete }) {
  const activeTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>🎯 No tasks yet. Add one to start leveling up!</p>
        </div>
      ) : (
        <>
          {activeTasks.length > 0 && (
            <div className="task-section">
              <h2 className="section-title">📋 ACTIVE TASKS</h2>
              <div className="task-list">
                {activeTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="task-section">
              <h2 className="section-title">✅ COMPLETED TASKS</h2>
              <div className="task-list">
                {completedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
