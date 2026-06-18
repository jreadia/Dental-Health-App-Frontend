import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Sample component for testing
function HelloWorld() {
  return <h1>Hello, Vitest!</h1>;
}

describe('HelloWorld Component', () => {
  it('renders the correct text', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument();
  });
});
