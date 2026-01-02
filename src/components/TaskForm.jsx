import { useState } from 'react'
import './TaskForm.css'

export default function TaskForm({ onAddTask }) {
  const [input, setInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsSubmitting(true)
    try {
      await onAddTask(input)
      setInput('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isSubmitting}
        className="task-input"
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !input.trim()}
        className="add-btn"
      >
        {isSubmitting ? 'Adding...' : '➕ ADD TASK'}
      </button>
    </form>
  )
}
