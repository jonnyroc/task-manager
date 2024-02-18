import { GraphQLError } from 'graphql'
import taskModel from '../../models/task'

interface ITask {
  id?: string
  title?: string
  description?: string
  status?: string
}

export const taskResolvers = {
  Query: {
    tasks: async () => await taskModel.find({}),
    task: async (_parent: unknown, { id }: ITask) =>
      await taskModel.findById(id),
  },
  Mutation: {
    addTask: async (_parent: unknown, { task }: { task: ITask }) => {
      const { title, description, status } = task

      if (!title) {
        // Simple validation for title
        throw new GraphQLError('Title is required')
      }
      try {
        const newTask = await taskModel.create({
          title,
          description,
          status,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        return newTask
      } catch (error: unknown) {
        return new GraphQLError('error creating task', {
          originalError: error as Error,
        })
      }
    },
    updateTask: async (_parent: unknown, { task }: { task: ITask }) => {
      const { id, title, description, status } = task

      const updatedTaskObj: ITask = {}
      if(title) {updatedTaskObj['title'] = title}
      if(description) {updatedTaskObj['description'] = description}
      if(status) {updatedTaskObj['status'] = status}

      try {
        const updatedTask = await taskModel.findByIdAndUpdate(
          id,
          { ...updatedTaskObj, updatedAt: new Date().toISOString() },
          { new: true }
        )
        return updatedTask
      } catch (error: unknown) {
        return new GraphQLError('error updating task', {
          originalError: error as Error,
        })
      }
    },
    deleteTask: async (_parent: unknown, { id }: { id: string }) => {

      try {
        const deletedTask = await taskModel.findByIdAndDelete(id)
        return deletedTask
          ? { ...deletedTask.toObject(), id: deletedTask._id }
          : null
      } catch (error: unknown) {
        return new GraphQLError('error deleting task', {
          originalError: error as Error,
        })
      }
    },
  },
}
