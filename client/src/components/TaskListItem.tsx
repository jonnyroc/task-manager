import { useState } from 'react'
import { ListItem, ListItemText, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ITask } from '../types/task'
import { TaskForm } from './TaskForm'
import { useUpdateTask, useDeleteTask } from '../hooks/taskHooks'

interface ITaskListItemProps {
  task: ITask
}

export const TaskListItem = ({ task }: ITaskListItemProps) => {
  const [showTaskFrom, setShowTaskFrom] = useState(false)
  const { updateTask } = useUpdateTask()
  const { deleteTask } = useDeleteTask()

  const handleEditClick = () => {
    setShowTaskFrom(!showTaskFrom)
  }

  const handleUpdateTask = (updatedTask: ITask) => {
    const variables = { task: { id: task.id, ...updatedTask } }
    updateTask({ variables })
    setShowTaskFrom(false)
  }

  const handleDeleteTask = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )
    if (isConfirmed) {
      deleteTask({ variables: { deleteTaskId: task.id } })
    }
  }

  return (
    <>
      {showTaskFrom ? (
        <>
          <TaskForm
            taskTitle={task.title}
            taskDescription={task.description}
            taskStatus={task.status}
            onSubmit={handleUpdateTask}
          />
          <br />
        </>
      ) : (
        <ListItem key={task.id}>
          <div style={{ display: 'flex' }}>
            <IconButton aria-label="edit task" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <ListItemText
              primary={
                <span
                  style={{
                    textDecoration:
                      task.status === 'completed' ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </span>
              }
              secondary={
                <span
                  style={{
                    textDecoration:
                      task.status === 'completed' ? 'line-through' : 'none',
                  }}
                >
                  {task.description}
                </span>
              }
            />
            <IconButton aria-label="delete task" onClick={handleDeleteTask}>
              <DeleteIcon />
            </IconButton>
          </div>
        </ListItem>
      )}
    </>
  )
}
