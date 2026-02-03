'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ActivityCard from '../src/components/ActivityCard'

const sectionStyle = {
  marginBottom: '3rem',
}

const labelStyle = {
  fontSize: '0.875rem',
  color: 'var(--text-muted)',
  marginBottom: '0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
}

const toggleButtonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '1rem',
}

const themeToggleStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  color: 'var(--text-color)',
  border: '1px solid var(--text-muted)',
  borderRadius: '6px',
  cursor: 'pointer',
}

export default function Home() {
  const [isActive, setIsActive] = useState(true)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  const getThemeLabel = () => {
    if (!mounted) return '...'
    if (theme === 'system') return `System (${resolvedTheme})`
    return theme.charAt(0).toUpperCase() + theme.slice(1)
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h1 style={{ margin: 0 }}>ActivityCard Demo</h1>
        <button onClick={cycleTheme} style={themeToggleStyle}>
          Theme: {getThemeLabel()}
        </button>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        A card component with a glowing trail that traces the border, conveying an in-progress state.
      </p>

      {/* Default Props */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Default Props</div>
        <ActivityCard>
          <span style={{ color: 'var(--text-color)' }}>Default ActivityCard</span>
        </ActivityCard>
      </section>

      {/* Interactive Toggle */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Interactive Active Toggle</div>
        <ActivityCard active={isActive}>
          <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            <div>Animation: {isActive ? 'Running' : 'Stopped'}</div>
            <button
              onClick={() => setIsActive(!isActive)}
              style={toggleButtonStyle}
            >
              Toggle Active
            </button>
          </div>
        </ActivityCard>
      </section>

      {/* Inactive State */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Inactive State (active=false)</div>
        <ActivityCard active={false}>
          <span style={{ color: 'var(--text-color)' }}>Inactive - No Animation</span>
        </ActivityCard>
      </section>

      {/* Color Variations */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Color Variations</div>
        <div style={gridStyle}>
          <ActivityCard color="#3b82f6">
            <span style={{ color: 'var(--text-color)' }}>Blue (default)</span>
          </ActivityCard>
          <ActivityCard color="#22c55e">
            <span style={{ color: 'var(--text-color)' }}>Green (#22c55e)</span>
          </ActivityCard>
          <ActivityCard color="#ef4444">
            <span style={{ color: 'var(--text-color)' }}>Red (#ef4444)</span>
          </ActivityCard>
          <ActivityCard color="#f59e0b">
            <span style={{ color: 'var(--text-color)' }}>Amber (#f59e0b)</span>
          </ActivityCard>
          <ActivityCard color="purple">
            <span style={{ color: 'var(--text-color)' }}>Purple (named)</span>
          </ActivityCard>
          <ActivityCard color="rgb(236, 72, 153)">
            <span style={{ color: 'var(--text-color)' }}>Pink (rgb)</span>
          </ActivityCard>
        </div>
      </section>

      {/* Different Content Types */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Different Content Types</div>
        <div style={gridStyle}>
          <ActivityCard color="#8b5cf6">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
              <div>Processing...</div>
            </div>
          </ActivityCard>
          <ActivityCard color="#06b6d4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status</div>
              <div style={{ fontSize: '1.25rem', color: 'var(--text-color)', fontWeight: 'bold' }}>42 items</div>
              <div style={{ fontSize: '0.875rem', color: '#22c55e' }}>+12% from last hour</div>
            </div>
          </ActivityCard>
          <ActivityCard color="#f43f5e">
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f43f5e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Click Me
              </button>
            </div>
          </ActivityCard>
        </div>
      </section>
    </main>
  )
}
