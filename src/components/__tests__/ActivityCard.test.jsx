import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ActivityCard from '../ActivityCard';

describe('ActivityCard', () => {
  it('renders children content', () => {
    render(<ActivityCard>Test Content</ActivityCard>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders with default props', () => {
    const { container } = render(<ActivityCard>Default Card</ActivityCard>);
    expect(container.querySelector('div')).toBeDefined();
  });

  it('renders with custom color', () => {
    render(<ActivityCard color="#ff0000">Red Card</ActivityCard>);
    expect(screen.getByText('Red Card')).toBeDefined();
  });

  it('renders with active=false', () => {
    render(<ActivityCard active={false}>Inactive Card</ActivityCard>);
    expect(screen.getByText('Inactive Card')).toBeDefined();
  });

  it('renders with particleEffect prop', () => {
    render(<ActivityCard particleEffect="sparkler">Sparkler Card</ActivityCard>);
    expect(screen.getByText('Sparkler Card')).toBeDefined();
  });

  it('renders with particleEffect="none"', () => {
    render(<ActivityCard particleEffect="none">No Particles</ActivityCard>);
    expect(screen.getByText('No Particles')).toBeDefined();
  });

  it('renders with shape="rectangle" (default)', () => {
    render(<ActivityCard shape="rectangle">Rectangle Card</ActivityCard>);
    expect(screen.getByText('Rectangle Card')).toBeDefined();
  });

  it('renders with shape="circle"', () => {
    render(<ActivityCard shape="circle">Circle Card</ActivityCard>);
    expect(screen.getByText('Circle Card')).toBeDefined();
  });
});
