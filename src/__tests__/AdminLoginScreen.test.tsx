import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AdminLoginScreen } from '../app/pages/admin/AdminLoginScreen';
import * as authApi from '../api/auth';

// Mock the API module
vi.mock('../api/auth', () => ({
  loginAdmin: vi.fn(),
}));

describe('AdminLoginScreen Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the admin login form', () => {
    render(<MemoryRouter><AdminLoginScreen /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Enter admin email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter admin password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ENTER ADMIN →' })).toBeInTheDocument();
  });

  it('calls loginAdmin and sets localStorage on successful login', async () => {
    vi.mocked(authApi.loginAdmin).mockResolvedValueOnce({
      admin: { isSuperAdmin: true },
    });

    render(<MemoryRouter><AdminLoginScreen /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Enter admin email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter admin password'), { target: { value: 'adminpass' } });
    fireEvent.click(screen.getByRole('button', { name: 'ENTER ADMIN →' }));

    await waitFor(() => {
      expect(authApi.loginAdmin).toHaveBeenCalledWith({ email: 'admin@example.com', password: 'adminpass' });
    });

    expect(localStorage.getItem('isAuthenticated')).toBe('true');
    expect(localStorage.getItem('isAdmin')).toBe('true');
    expect(localStorage.getItem('loggedInAs')).toBe('admin@example.com');
    expect(localStorage.getItem('isSuperAdmin')).toBe('true');
  });

  it('shows error message on failed login', async () => {
    vi.mocked(authApi.loginAdmin).mockRejectedValueOnce(new Error('Invalid admin credentials. Access denied.'));

    render(<MemoryRouter><AdminLoginScreen /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Enter admin email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter admin password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: 'ENTER ADMIN →' }));

    await waitFor(() => {
      expect(screen.getByText(/⚠ Invalid admin credentials\. Access denied\./)).toBeInTheDocument();
    });

    expect(localStorage.getItem('isAuthenticated')).toBeNull();
  });
});
