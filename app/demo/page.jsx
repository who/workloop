'use client'

import { useState } from 'react'
import ActivityCard from '../../src/components/ActivityCard'

const sectionStyle = {
  marginBottom: '3rem',
}

const labelStyle = {
  fontSize: '0.875rem',
  color: '#888',
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

export default function DemoPage() {
  const [isActive, setIsActive] = useState(true)

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>ActivityCard Demo</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        A card component with a glowing trail that traces the border, conveying an in-progress state.
      </p>

      {/* Default Props */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Default Props</div>
        <ActivityCard>
          <span style={{ color: '#fff' }}>Default ActivityCard</span>
        </ActivityCard>
      </section>

      {/* Interactive Toggle */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Interactive Active Toggle</div>
        <ActivityCard active={isActive}>
          <div style={{ textAlign: 'center', color: '#fff' }}>
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
          <span style={{ color: '#fff' }}>Inactive - No Animation</span>
        </ActivityCard>
      </section>

      {/* Color Variations */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Color Variations</div>
        <div style={gridStyle}>
          <ActivityCard color="#3b82f6">
            <span style={{ color: '#fff' }}>Blue (default)</span>
          </ActivityCard>
          <ActivityCard color="#22c55e">
            <span style={{ color: '#fff' }}>Green (#22c55e)</span>
          </ActivityCard>
          <ActivityCard color="#ef4444">
            <span style={{ color: '#fff' }}>Red (#ef4444)</span>
          </ActivityCard>
          <ActivityCard color="#f59e0b">
            <span style={{ color: '#fff' }}>Amber (#f59e0b)</span>
          </ActivityCard>
          <ActivityCard color="purple">
            <span style={{ color: '#fff' }}>Purple (named)</span>
          </ActivityCard>
          <ActivityCard color="rgb(236, 72, 153)">
            <span style={{ color: '#fff' }}>Pink (rgb)</span>
          </ActivityCard>
        </div>
      </section>

      {/* Different Content Types */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Different Content Types</div>
        <div style={gridStyle}>
          <ActivityCard color="#8b5cf6">
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
              <div>Processing...</div>
            </div>
          </ActivityCard>
          <ActivityCard color="#06b6d4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Status</div>
              <div style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>42 items</div>
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
