import { gql } from 'apollo-server-express'

export const taskTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    status: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  input TaskInput {
    id: ID
    title: String
    description: String
    status: String
  }

  type Mutation {
    addTask(task: TaskInput): Task
    updateTask(task: TaskInput): Task
    deleteTask(id: ID!): Task
  }
`
