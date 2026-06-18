import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../app/pages/user/LoginPage';
import * as authApi from '../api/auth';

// Mock the API module
vi.mock('../api/auth', () => ({
  loginUser: vi.fn(),
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the login form', () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('calls loginUser and navigates on successful login', async () => {
    vi.mocked(authApi.loginUser).mockResolvedValueOnce({});

    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    const email = 'mockuser@example.com';
    const password = 'mockpassword123';

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: email } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(authApi.loginUser).toHaveBeenCalledWith({ email, password });
    });
  });

  it('shows error message on failed login', async () => {
    vi.mocked(authApi.loginUser).mockRejectedValueOnce(new Error('Invalid credentials.'));

    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    const email = 'mockuser@example.com';
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: email } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
    });
  });
});
