import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { TaskListItem } from './TaskListItem';
import * as taskHooks from '../hooks/taskHooks';

// Mocking the external hooks
jest.mock('../hooks/taskHooks', () => ({
  useUpdateTask: jest.fn(),
  useDeleteTask: jest.fn(),
}));

jest.mock('./TaskForm', () => ({
    __esModule: true,
    TaskForm: ({ onSubmit }) => (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title: 'Mocked Title', description: 'Mocked Description', status: 'pending' });
      }}>
        <button type="submit">Submit</button>
      </form>
    ),
  }));
  

describe('TaskListItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
  };

  beforeEach(() => {
    (taskHooks.useUpdateTask as jest.Mock).mockImplementation(() => ({
      updateTask: jest.fn(),
      data: {},
      loading: false,
      error: undefined,
    }));
    (taskHooks.useDeleteTask as jest.Mock).mockImplementation(() => ({
      deleteTask: jest.fn(),
      data: {},
      loading: false,
      error: undefined,
    }));
  });
  
  it('renders correctly with task data', () => {
    render(<TaskListItem task={mockTask} />);

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByLabelText('edit task')).toBeInTheDocument();
    expect(screen.getByLabelText('delete task')).toBeInTheDocument();
  });

  it('opens TaskForm on edit button click', () => {
    render(<TaskListItem task={mockTask} />);
    userEvent.click(screen.getByLabelText('edit task'));
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('calls confirm and deleteTask on delete button click', () => {
    window.confirm = jest.fn().mockImplementation(() => true); // Mock confirm to return true

    render(<TaskListItem task={mockTask} />);
    userEvent.click(screen.getByLabelText('delete task'));

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this task?');
  });
});
