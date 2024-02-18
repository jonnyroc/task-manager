import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  const mockOnSubmit = jest.fn();

  it('renders input fields and a submit button', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows entering and submitting new task data', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const statusCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Simulate user input
    userEvent.type(titleInput, 'New Task Title');
    userEvent.type(descriptionInput, 'New Task Description');
    userEvent.click(statusCheckbox);

    // Submit the form
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Task Title',
        description: 'New Task Description',
        status: 'completed',
      })
    );
  });

  it('resets the form after submission', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const statusCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out and submit the form
    userEvent.type(titleInput, 'New Task Title');
    userEvent.type(descriptionInput, 'New Task Description');
    userEvent.click(statusCheckbox);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(titleInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
      expect(statusCheckbox).not.toBeChecked();
    });
  });
});
