import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component', () => {
  test('renders dashboard title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/پزشکیار/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders voice assistant section', () => {
    render(<Dashboard />);
    const voiceAssistant = screen.getByText(/دستیار صوتی پزشکیار/i);
    expect(voiceAssistant).toBeInTheDocument();
  });

  test('renders quick actions', () => {
    render(<Dashboard />);
    const quickActions = screen.getByText(/دسترسی سریع/i);
    expect(quickActions).toBeInTheDocument();
  });
});

export {};
