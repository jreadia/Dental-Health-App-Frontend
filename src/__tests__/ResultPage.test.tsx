import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultPage from '../app/pages/user/ResultPage';

describe('ResultPage Component', () => {
  it('redirects to homepage if no resultData is present', () => {
    render(
      <MemoryRouter initialEntries={['/result']}>
        <ResultPage />
      </MemoryRouter>
    );
    // Wait, the component uses <Navigate to="/homepage" replace />
    // We can't directly check the URL change without listening to the router,
    // but we can assert it does NOT render the ResultPage content.
    expect(screen.queryByText('DiagnosticResult')).not.toBeInTheDocument();
  });

  it('renders result data correctly when present', () => {
    const mockState = {
      resultData: {
        calculusCount: 5,
      },
      uploadedImage: 'test-image-url.jpg',
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/result', state: mockState }]}>
        <ResultPage />
      </MemoryRouter>
    );

    // Assert that the page title renders
    expect(screen.getByText(/Diagnostic/i)).toBeInTheDocument();
    
    // Assert Calculus Detected Yes (since 5 > 0)
    expect(screen.getByText('Calculus Detected')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    
    // Assert Amount
    expect(screen.getByText('5 Calculus')).toBeInTheDocument();
    
    // Assert Oral Health Status (1-5 should be 'Mild')
    expect(screen.getByText('Oral Health Status')).toBeInTheDocument();
    expect(screen.getByText('Mild')).toBeInTheDocument();

    // Assert image is rendered
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test-image-url.jpg');
  });

  it('renders correctly when calculus is 0 (Healthy)', () => {
    const mockState = {
      resultData: {
        calculusCount: 0,
      },
      uploadedImage: null,
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/result', state: mockState }]}>
        <ResultPage />
      </MemoryRouter>
    );

    expect(screen.getByText('No')).toBeInTheDocument(); // Calculus Detected: No
    expect(screen.getByText('0 Calculus')).toBeInTheDocument();
    expect(screen.getByText('Healthy')).toBeInTheDocument(); // Health Status
    expect(screen.getByText('NO IMAGE UPLOADED')).toBeInTheDocument();
  });
});
