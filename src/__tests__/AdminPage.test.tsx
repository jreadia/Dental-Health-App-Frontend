import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminPage from '../app/pages/admin/AdminPage';

// Mock subcomponents
vi.mock('../app/pages/admin/components/AdminHomepage', () => ({
  AdminHomepage: ({ onAccessData, onAddAdmin, onLogout }: { onAccessData: () => void; onAddAdmin: () => void; onLogout: () => void }) => (
    <div data-testid="admin-homepage">
      <button onClick={onAccessData}>Access Data</button>
      <button onClick={onAddAdmin}>Add Admin</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  ),
}));

vi.mock('../app/pages/admin/components/DataDashboard', () => ({
  DataDashboard: ({ onBack }: { onBack: () => void }) => (
    <div data-testid="data-dashboard">
      <button onClick={onBack}>Back to Home</button>
    </div>
  ),
}));

vi.mock('../app/pages/admin/components/AddAdminModal', () => ({
  AddAdminModal: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="add-admin-modal">
      <button onClick={onClose}>Close Modal</button>
    </div>
  ),
}));

describe('AdminPage Component', () => {
  it('renders AdminHomepage by default', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('admin-homepage')).toBeInTheDocument();
    expect(screen.queryByTestId('data-dashboard')).not.toBeInTheDocument();
  });

  it('switches to DataDashboard when requested', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Access Data'));

    expect(screen.getByTestId('data-dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('admin-homepage')).not.toBeInTheDocument();
  });

  it('shows AddAdminModal when requested and hides on close', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    // Initial state
    expect(screen.queryByTestId('add-admin-modal')).not.toBeInTheDocument();

    // Click Add Admin
    fireEvent.click(screen.getByText('Add Admin'));
    expect(screen.getByTestId('add-admin-modal')).toBeInTheDocument();

    // Click Close
    fireEvent.click(screen.getByText('Close Modal'));
    expect(screen.queryByTestId('add-admin-modal')).not.toBeInTheDocument();
  });

  it('starts in DataDashboard if location state has returnToData', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/admin', state: { returnToData: true } }]}>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('data-dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('admin-homepage')).not.toBeInTheDocument();
  });
});
