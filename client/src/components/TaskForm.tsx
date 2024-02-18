import React, { useState } from 'react'
import { ITask } from '../types/task'
import { TextField, Button, Checkbox, Typography } from '@mui/material'

interface TaskFormProps {
  taskTitle?: string
  taskDescription?: string
  taskStatus?: string
  onSubmit: (task: ITask) => void
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  taskTitle = '',
  taskDescription = '',
  taskStatus = 'pending',
}) => {
  const [title, setTitle] = useState(taskTitle)
  const [description, setDescription] = useState(taskDescription)
  const [status, setStatus] = useState(taskStatus)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, description, status })
    setTitle('')
    setDescription('')
    setStatus('pending')
  }

  const handleStatusChange = () => {
    const updatedStatus = status === 'pending' ? 'completed' : 'pending'
    setStatus(updatedStatus)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '15px 15px',
        border: '0.5px solid lightGray',
        borderRadius: '10px',
        display: 'inline-block'
      }}
    >
      <TextField
        label='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={status === 'completed'}
          onChange={handleStatusChange}
        />
        <Typography variant='body1'>Is Completed</Typography>
      </div>
      <Button style={{ height: '4em' }} variant='contained' type='submit'>
        Submit
      </Button>
    </form>
  )
}
