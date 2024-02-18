import React from 'react'
import { Typography } from '@mui/material'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import { useCreateTask } from './hooks/taskHooks'
import { ITask } from './types/task'
import './App.css'

function App() {
  const { addTask } = useCreateTask()

  const handleCreateTask = (task: ITask) => {
    const variables = { task }
    addTask({ variables })
  }
  return (
    <div className='App'>
      <TaskList />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <Typography variant='h6'>Create Task:</Typography>
      <TaskForm onSubmit={handleCreateTask} />
    </div>
  )
}

export default App
