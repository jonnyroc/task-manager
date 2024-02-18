import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskList } from './TaskList';
import * as taskHooks from '../hooks/taskHooks';
import { ITask } from '../types/task';

jest.mock("./TaskListItem", () => ({
  TaskListItem: ({ task }: {task: ITask}) => <li>{task.title}</li>,
}));

jest.mock('../hooks/taskHooks', () => ({
  useTasks: jest.fn(),
}));

describe('TaskList', () => {
  it('displays loading indicator when tasks are being fetched', () => {
    (taskHooks.useTasks as jest.Mock).mockReturnValue({ tasks: [], loading: true, error: null });
    render(<TaskList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays an error message if there is an error fetching tasks', () => {
    (taskHooks.useTasks as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: { message: 'Error fetching tasks' } });
    render(<TaskList />);
    expect(screen.getByText('Error :Error fetching tasks')).toBeInTheDocument();
  });

  it('renders the correct number of TaskListItem components for fetched tasks', () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', description: 'Description 1', status: 'pending' },
      { id: '2', title: 'Task 2', description: 'Description 2', status: 'completed' },
    ];
    (taskHooks.useTasks as jest.Mock).mockReturnValue({ tasks: mockTasks, loading: false, error: null });
    render(<TaskList />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockTasks.length);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
