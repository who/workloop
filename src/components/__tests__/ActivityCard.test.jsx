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

  it('renders with lineStyle="solid" (default)', () => {
    render(<ActivityCard lineStyle="solid">Solid Line Card</ActivityCard>);
    expect(screen.getByText('Solid Line Card')).toBeDefined();
  });

  it('renders with lineStyle="dotted"', () => {
    render(<ActivityCard lineStyle="dotted">Dotted Line Card</ActivityCard>);
    expect(screen.getByText('Dotted Line Card')).toBeDefined();
  });

  it('renders with lineStyle="dashed"', () => {
    render(<ActivityCard lineStyle="dashed">Dashed Line Card</ActivityCard>);
    expect(screen.getByText('Dashed Line Card')).toBeDefined();
  });

  it('renders with lineStyle="scribble"', () => {
    render(<ActivityCard lineStyle="scribble">Scribble Line Card</ActivityCard>);
    expect(screen.getByText('Scribble Line Card')).toBeDefined();
  });

  it('renders with lineStyle="double"', () => {
    render(<ActivityCard lineStyle="double">Double Line Card</ActivityCard>);
    expect(screen.getByText('Double Line Card')).toBeDefined();
  });

  it('renders with lineStyle="wavy"', () => {
    render(<ActivityCard lineStyle="wavy">Wavy Line Card</ActivityCard>);
    expect(screen.getByText('Wavy Line Card')).toBeDefined();
  });

  it('renders with lineStyle="glow"', () => {
    render(<ActivityCard lineStyle="glow">Glow Line Card</ActivityCard>);
    expect(screen.getByText('Glow Line Card')).toBeDefined();
  });

  it('renders with lineStyle="tapered"', () => {
    render(<ActivityCard lineStyle="tapered">Tapered Line Card</ActivityCard>);
    expect(screen.getByText('Tapered Line Card')).toBeDefined();
  });

  it('renders with lineStyle on circle shape', () => {
    render(<ActivityCard shape="circle" lineStyle="dotted">Circle Dotted Card</ActivityCard>);
    expect(screen.getByText('Circle Dotted Card')).toBeDefined();
  });
});
