import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Homepage } from '../app/pages/user/Homepage';
import * as dentalApi from '../api/dental';

// Mock the API module
vi.mock('../api/dental', () => ({
  getUserImageHistory: vi.fn(),
  getDentalImageById: vi.fn(),
}));

describe('Homepage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders layout and handles empty history', async () => {
    vi.mocked(dentalApi.getUserImageHistory).mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    expect(screen.getByText('SmileScan')).toBeInTheDocument();
    expect(screen.getByText('Upload Dental Image')).toBeInTheDocument();

    await waitFor(() => {
      expect(dentalApi.getUserImageHistory).toHaveBeenCalledWith(1);
    });

    expect(screen.getByText('No scan history available.')).toBeInTheDocument();
  });

  it('renders correctly with history data', async () => {
    const mockHistory = [
      {
        id: 'img-123',
        createdAt: new Date().toISOString(),
        mlResults: { calculusAmount: 3, overall_diagnosis: 'Mild' },
      },
    ];
    vi.mocked(dentalApi.getUserImageHistory).mockResolvedValueOnce(mockHistory);

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('3 Calculus Detected')).toBeInTheDocument();
    });

    // The status badge text 'Mild' should also appear
    expect(screen.getByText('Mild')).toBeInTheDocument();
  });
});
