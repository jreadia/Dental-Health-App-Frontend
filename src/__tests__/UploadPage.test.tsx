import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UploadPage from '../app/pages/user/UploadPage';

vi.mock('../api/dental', () => ({
  uploadDentalImage: vi.fn(),
}));

describe('UploadPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the upload page and disclaimer', () => {
    render(<MemoryRouter><UploadPage /></MemoryRouter>);
    // The component has "UPLOAD IMAGE" text
    expect(screen.getByText('UPLOAD IMAGE')).toBeInTheDocument();
    expect(screen.getAllByText(/Disclaimer/i)[0]).toBeInTheDocument();
  });
});
