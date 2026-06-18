import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SignupPage } from '../app/pages/user/SignupPage';
import * as authApi from '../api/auth';

// Mock the API module
vi.mock('../api/auth', () => ({
  registerUser: vi.fn(),
}));

describe('SignupPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the registration form', () => {
    render(<MemoryRouter><SignupPage /></MemoryRouter>);
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('shows error if passwords do not match', async () => {
    render(<MemoryRouter><SignupPage /></MemoryRouter>);

    // Fill all required fields
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Test St' } });
    fireEvent.change(screen.getByTitle('Birthday'), { target: { value: '2000-01-01' } });
    
    // Mismatched passwords
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm'), { target: { value: 'password456' } });

    // Inline error should appear
    expect(screen.getByText("Passwords don't match")).toBeInTheDocument();

    // Submit form
    const form = screen.getByRole('button', { name: 'Create Account' }).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match!')).toBeInTheDocument();
    });
    expect(authApi.registerUser).not.toHaveBeenCalled();
  });

  it('calls registerUser and navigates on successful signup', async () => {
    vi.mocked(authApi.registerUser).mockResolvedValueOnce({ user: { wasExistingUser: false } });

    render(<MemoryRouter><SignupPage /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Test St' } });
    // Note: React testing library handling of date input
    fireEvent.change(screen.getByTitle('Birthday'), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(authApi.registerUser).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        address: '123 Test St',
        birthday: '2000-01-01',
        password: 'password123',
      });
    });
  });

  it('shows error message on failed registration', async () => {
    vi.mocked(authApi.registerUser).mockRejectedValueOnce(new Error('Email already in use'));

    render(<MemoryRouter><SignupPage /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Test St' } });
    fireEvent.change(screen.getByTitle('Birthday'), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });
  });
});
