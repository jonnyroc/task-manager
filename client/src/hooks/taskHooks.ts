import { useQuery, useMutation, gql } from '@apollo/client'

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`

export const CREATE_TASK = gql`
  mutation AddTask($task: TaskInput) {
    addTask(task: $task) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($task: TaskInput) {
    updateTask(task: $task) {
      id
      title
      description
      status
      updatedAt
    }
  }
`

export const DELETE_TASK = gql`
mutation DeleteTask($deleteTaskId: ID!) {
  deleteTask(id: $deleteTaskId) {
    id
    title
    description
  }
}
`

export function useTasks() {
  const { data, loading, error } = useQuery(GET_TASKS)
  return {
    tasks: data?.tasks,
    loading,
    error,
  }
}

export const useCreateTask = () => {
  const [addTask, { data, loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Optionally refetch tasks list after adding
  });

  return {
    addTask,
    data,
    loading,
    error,
  };
};

export const useUpdateTask = () => {
  const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Optionally refetch tasks list after updating
  });

  return {
    updateTask,
    data,
    loading,
    error,
  };
};

export const useDeleteTask = () => {
  const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Optionally refetch tasks list after deleting
  });

  return {
    deleteTask,
    data,
    loading,
    error,
  };
};

