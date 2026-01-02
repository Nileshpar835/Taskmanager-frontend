import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import LevelCard from './components/LevelCard'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '')

export default function App() {
  const [tasks, setTasks] = useState([])
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_URL}/api/tasks`)
      setTasks(response.data.tasks || [])
      setXp(response.data.xp || 0)
      setLevel(response.data.level || 1)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Failed to load tasks. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (title) => {
    try {
      const response = await axios.post(`${API_URL}/api/tasks`, { title })
      setTasks([...tasks, response.data.task])
      setXp(response.data.xp)
      setLevel(response.data.level)
      setError(null)
    } catch (err) {
      console.error('Error adding task:', err)
      setError('Failed to add task.')
    }
  }

  const handleToggleTask = async (id, completed, title) => {
    try {
      const response = await axios.put(`${API_URL}/api/tasks`, {
        id,
        title,
        completed: !completed
      })
      
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !completed } : task
      ))
      setXp(response.data.xp)
      setLevel(response.data.level)
      setError(null)
    } catch (err) {
      console.error('Error updating task:', err)
      setError('Failed to update task.')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/tasks?id=${id}`)
      setTasks(tasks.filter(task => task.id !== id))
      setXp(response.data.xp)
      setLevel(response.data.level)
      setError(null)
    } catch (err) {
      console.error('Error deleting task:', err)
      setError('Failed to delete task.')
    }
  }

  return (
    <div className="app-container">
      <div className="neon-border">
        <header className="app-header">
          <h1>⚡ LEVEL UP YOUR TASKS</h1>
        </header>

        <main className="app-main">
          {error && <div className="error-banner">{error}</div>}

          <LevelCard level={level} xp={xp} />

          <TaskForm onAddTask={handleAddTask} />

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>✨ Complete tasks to level up!</p>
        </footer>
      </div>
    </div>
  )
}
