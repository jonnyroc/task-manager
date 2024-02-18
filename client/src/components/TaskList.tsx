import React from 'react'
import { useTasks } from '../hooks/taskHooks'
import { List, CircularProgress } from '@mui/material'
import { TaskListItem } from "./TaskListItem";
import { ITask } from '../types/task';

export const TaskList = () => {
  const { tasks, loading, error } = useTasks()

  if (loading) return <CircularProgress />
  if (error) return <p>Error :{error.message}</p>

  return (
    <List>
      {tasks.map((task: ITask) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </List>
  )
}
