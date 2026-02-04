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

const PARTICLE_EFFECTS = ['sparkler', 'comet', 'stardust', 'ember', 'electric', 'bubble']
const PARTICLE_COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#06b6d4', '#22c55e']

const LINE_STYLES = ['solid', 'scribble', 'double', 'wavy', 'glow', 'tapered']
const LINE_STYLE_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899', '#14b8a6']

const HEAD_SHAPES = ['round', 'flat', 'pointed', 'soft']
const SHAPES = ['rectangle', 'circle']
const COLOR_PRESETS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Teal', value: '#14b8a6' },
]

const controlLabelStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  marginBottom: '0.25rem',
  display: 'block',
}

const controlGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
}

const selectStyle = {
  padding: '0.5rem',
  fontSize: '0.875rem',
  borderRadius: '6px',
  border: '1px solid var(--text-muted)',
  backgroundColor: 'var(--bg-color)',
  color: 'var(--text-color)',
  cursor: 'pointer',
  minWidth: '120px',
}

const sliderContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}

const sliderValueStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  minWidth: '40px',
  textAlign: 'right',
}

export default function Home() {
  const [isActive, setIsActive] = useState(true)
  const [customSpeed, setCustomSpeed] = useState(3)
  const [selectedEffect, setSelectedEffect] = useState('sparkler')
  const [selectedLineStyle, setSelectedLineStyle] = useState('solid')
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Interactive playground state
  const [playgroundActive, setPlaygroundActive] = useState(true)
  const [playgroundColor, setPlaygroundColor] = useState('#3b82f6')
  const [playgroundSpeed, setPlaygroundSpeed] = useState(3)
  const [playgroundParticleEffect, setPlaygroundParticleEffect] = useState('none')
  const [playgroundShape, setPlaygroundShape] = useState('rectangle')
  const [playgroundLineStyle, setPlaygroundLineStyle] = useState('solid')
  const [playgroundHeadShape, setPlaygroundHeadShape] = useState('round')
  const [playgroundHeadSize, setPlaygroundHeadSize] = useState(1)
  const [playgroundParticleFollowDistance, setPlaygroundParticleFollowDistance] = useState(0)

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

      {/* Interactive Playground */}
      <section style={{ ...sectionStyle, padding: '1.5rem', backgroundColor: 'rgba(128, 128, 128, 0.05)', borderRadius: '12px', border: '1px solid var(--text-muted)' }}>
        <div style={{ ...labelStyle, fontSize: '1rem', marginBottom: '1rem' }}>Interactive Playground</div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Explore all configuration options in real-time. Adjust the controls below to see how different combinations affect the appearance.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Preview Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <ActivityCard
              active={playgroundActive}
              color={playgroundColor}
              speed={playgroundSpeed}
              particleEffect={playgroundParticleEffect}
              shape={playgroundShape}
              lineStyle={playgroundLineStyle}
              headShape={playgroundHeadShape}
              headSize={playgroundHeadSize}
              particleFollowDistance={playgroundParticleFollowDistance}
            >
              <div style={{ textAlign: 'center', color: 'var(--text-color)', padding: '1rem' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Preview</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {playgroundShape} • {playgroundLineStyle} • {playgroundHeadShape}
                </div>
              </div>
            </ActivityCard>
            <button
              onClick={() => setPlaygroundActive(!playgroundActive)}
              style={{
                ...toggleButtonStyle,
                marginTop: 0,
                backgroundColor: playgroundActive ? '#22c55e' : '#6b7280',
              }}
            >
              {playgroundActive ? 'Active' : 'Inactive'}
            </button>
          </div>

          {/* Controls Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', flex: 1, minWidth: '300px' }}>
            {/* Shape */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Shape</label>
              <select
                value={playgroundShape}
                onChange={(e) => setPlaygroundShape(e.target.value)}
                style={selectStyle}
              >
                {SHAPES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Line Style */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Line Style</label>
              <select
                value={playgroundLineStyle}
                onChange={(e) => setPlaygroundLineStyle(e.target.value)}
                style={selectStyle}
              >
                {LINE_STYLES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Head Shape */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Head Shape</label>
              <select
                value={playgroundHeadShape}
                onChange={(e) => setPlaygroundHeadShape(e.target.value)}
                style={selectStyle}
              >
                {HEAD_SHAPES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Particle Effect */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Particle Effect</label>
              <select
                value={playgroundParticleEffect}
                onChange={(e) => setPlaygroundParticleEffect(e.target.value)}
                style={selectStyle}
              >
                <option value="none">None</option>
                {PARTICLE_EFFECTS.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={playgroundColor}
                  onChange={(e) => setPlaygroundColor(e.target.value)}
                  style={{ width: '36px', height: '36px', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0 }}
                />
                <select
                  value={COLOR_PRESETS.find(c => c.value === playgroundColor)?.value || ''}
                  onChange={(e) => e.target.value && setPlaygroundColor(e.target.value)}
                  style={{ ...selectStyle, minWidth: '80px' }}
                >
                  <option value="">Custom</option>
                  {COLOR_PRESETS.map((c) => (
                    <option key={c.value} value={c.value}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Speed */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Speed (seconds)</label>
              <div style={sliderContainerStyle}>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={playgroundSpeed}
                  onChange={(e) => setPlaygroundSpeed(parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={sliderValueStyle}>{playgroundSpeed}s</span>
              </div>
            </div>

            {/* Head Size */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Head Size</label>
              <div style={sliderContainerStyle}>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.25"
                  value={playgroundHeadSize}
                  onChange={(e) => setPlaygroundHeadSize(parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={sliderValueStyle}>{playgroundHeadSize}x</span>
              </div>
            </div>

            {/* Particle Follow Distance */}
            <div style={controlGroupStyle}>
              <label style={controlLabelStyle}>Particle Trail</label>
              <div style={sliderContainerStyle}>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={playgroundParticleFollowDistance}
                  onChange={(e) => setPlaygroundParticleFollowDistance(parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={sliderValueStyle}>{playgroundParticleFollowDistance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Props Display */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current Props:</div>
          <code style={{ color: 'var(--text-color)' }}>
            {`<ActivityCard`}
            {!playgroundActive && ` active={false}`}
            {playgroundColor !== '#3b82f6' && ` color="${playgroundColor}"`}
            {playgroundSpeed !== 3 && ` speed={${playgroundSpeed}}`}
            {playgroundParticleEffect !== 'none' && ` particleEffect="${playgroundParticleEffect}"`}
            {playgroundShape !== 'rectangle' && ` shape="${playgroundShape}"`}
            {playgroundLineStyle !== 'solid' && ` lineStyle="${playgroundLineStyle}"`}
            {playgroundHeadShape !== 'round' && ` headShape="${playgroundHeadShape}"`}
            {playgroundHeadSize !== 1 && ` headSize={${playgroundHeadSize}}`}
            {playgroundParticleFollowDistance !== 0 && ` particleFollowDistance={${playgroundParticleFollowDistance}}`}
            {` />`}
          </code>
        </div>
      </section>

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

      {/* Speed Variations */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Speed Presets</div>
        <div style={gridStyle}>
          <ActivityCard speed="slow">
            <span style={{ color: 'var(--text-color)' }}>Slow (5s)</span>
          </ActivityCard>
          <ActivityCard speed="normal">
            <span style={{ color: 'var(--text-color)' }}>Normal (3s)</span>
          </ActivityCard>
          <ActivityCard speed="fast">
            <span style={{ color: 'var(--text-color)' }}>Fast (1.5s)</span>
          </ActivityCard>
        </div>
      </section>

      {/* Interactive Speed Control */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Interactive Speed Control</div>
        <ActivityCard speed={customSpeed} color="#8b5cf6">
          <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            <div>Speed: {customSpeed}s</div>
            <input
              type="range"
              min="0.5"
              max="8"
              step="0.5"
              value={customSpeed}
              onChange={(e) => setCustomSpeed(parseFloat(e.target.value))}
              style={{ width: '200px', marginTop: '0.5rem' }}
            />
          </div>
        </ActivityCard>
      </section>

      {/* Speed-Based Intensity */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Speed-Based Intensity (with Particles)</div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Faster speeds produce more intense effects: brighter glow, more particles, larger sizes.
        </p>
        <div style={gridStyle}>
          <ActivityCard speed={7} color="#f59e0b" particleEffect="sparkler">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Very Slow (7s)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subtle glow, fewer particles</div>
            </div>
          </ActivityCard>
          <ActivityCard speed="normal" color="#f59e0b" particleEffect="sparkler">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Normal (3s)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Balanced intensity</div>
            </div>
          </ActivityCard>
          <ActivityCard speed={0.8} color="#f59e0b" particleEffect="sparkler">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Very Fast (0.8s)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Intense glow, more particles</div>
            </div>
          </ActivityCard>
        </div>
      </section>

      {/* Shape Variations */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Shape Variations</div>
        <div style={gridStyle}>
          <ActivityCard shape="rectangle">
            <span style={{ color: 'var(--text-color)' }}>Rectangle (default)</span>
          </ActivityCard>
          <ActivityCard shape="circle" color="#8b5cf6">
            <span style={{ color: 'var(--text-color)', textAlign: 'center' }}>Circle</span>
          </ActivityCard>
          <ActivityCard shape="circle" color="#22c55e" particleEffect="sparkler">
            <span style={{ color: 'var(--text-color)', textAlign: 'center' }}>Circle + Particles</span>
          </ActivityCard>
          <ActivityCard shape="circle" color="#f59e0b" speed="fast">
            <span style={{ color: 'var(--text-color)', textAlign: 'center' }}>Circle Fast</span>
          </ActivityCard>
        </div>
      </section>

      {/* Line Style Variations */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Line Style Variations</div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Different stroke styles for the border pulse effect. Use lineStyle prop to customize.
        </p>
        <div style={gridStyle}>
          {LINE_STYLES.map((style, index) => (
            <ActivityCard key={style} color={LINE_STYLE_COLORS[index]} lineStyle={style}>
              <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'capitalize' }}>{style}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  lineStyle=&quot;{style}&quot;
                </div>
              </div>
            </ActivityCard>
          ))}
        </div>
      </section>

      {/* Line Styles with Circle Shape */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Line Styles on Circle</div>
        <div style={gridStyle}>
          <ActivityCard shape="circle" lineStyle="double" color="#22c55e">
            <span style={{ color: 'var(--text-color)', textAlign: 'center' }}>Double Circle</span>
          </ActivityCard>
          <ActivityCard shape="circle" lineStyle="wavy" color="#8b5cf6">
            <span style={{ color: 'var(--text-color)', textAlign: 'center' }}>Wavy Circle</span>
          </ActivityCard>
          <ActivityCard shape="circle" lineStyle="glow" color="#ec4899">
            <span style={{ color: 'var(--text-color)', textAlign: 'center' }}>Glow Circle</span>
          </ActivityCard>
          <ActivityCard shape="circle" lineStyle="scribble" color="#f59e0b">
            <span style={{ color: 'var(--text-color)', textAlign: 'center' }}>Scribble Circle</span>
          </ActivityCard>
        </div>
      </section>

      {/* Interactive Line Style Selector */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Interactive Line Style Selector</div>
        <ActivityCard color="#06b6d4" lineStyle={selectedLineStyle} particleEffect={selectedEffect}>
          <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              Line: <strong style={{ textTransform: 'capitalize' }}>{selectedLineStyle}</strong>
            </div>
            <select
              value={selectedLineStyle}
              onChange={(e) => setSelectedLineStyle(e.target.value)}
              style={{
                padding: '0.5rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid var(--text-muted)',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                cursor: 'pointer',
              }}
            >
              {LINE_STYLES.map((style) => (
                <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
              ))}
            </select>
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

      {/* Particle Effects */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Particle Effects</div>
        <div style={gridStyle}>
          {PARTICLE_EFFECTS.map((effect, index) => (
            <ActivityCard key={effect} color={PARTICLE_COLORS[index]} particleEffect={effect}>
              <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'capitalize' }}>{effect}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  particleEffect=&quot;{effect}&quot;
                </div>
              </div>
            </ActivityCard>
          ))}
        </div>
      </section>

      {/* Interactive Particle Effect Selector */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Interactive Particle Effect Selector</div>
        <ActivityCard color="#ec4899" particleEffect={selectedEffect} speed={customSpeed}>
          <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            <div style={{ marginBottom: '0.5rem' }}>Effect: <strong style={{ textTransform: 'capitalize' }}>{selectedEffect}</strong></div>
            <select
              value={selectedEffect}
              onChange={(e) => setSelectedEffect(e.target.value)}
              style={{
                padding: '0.5rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid var(--text-muted)',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                cursor: 'pointer',
              }}
            >
              <option value="none">None</option>
              {PARTICLE_EFFECTS.map((effect) => (
                <option key={effect} value={effect}>{effect.charAt(0).toUpperCase() + effect.slice(1)}</option>
              ))}
            </select>
          </div>
        </ActivityCard>
      </section>

      {/* Different Content Types */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Different Content Types</div>
        <div style={gridStyle}>
          <ActivityCard color="#8b5cf6" particleEffect="stardust">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
              <div>Processing...</div>
            </div>
          </ActivityCard>
          <ActivityCard color="#06b6d4" particleEffect="bubble">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status</div>
              <div style={{ fontSize: '1.25rem', color: 'var(--text-color)', fontWeight: 'bold' }}>42 items</div>
              <div style={{ fontSize: '0.875rem', color: '#22c55e' }}>+12% from last hour</div>
            </div>
          </ActivityCard>
          <ActivityCard color="#f43f5e" particleEffect="electric">
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

      {/* Combined Particle + Line Style Examples */}
      <section style={sectionStyle}>
        <div style={labelStyle}>Combined Particle + Line Style Examples</div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Particle effects can be combined with different line styles for unique visual combinations.
        </p>
        <div style={gridStyle}>
          <ActivityCard color="#f59e0b" particleEffect="sparkler" lineStyle="double">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Sparkler + Double</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Festive sparkles with double trail
              </div>
            </div>
          </ActivityCard>
          <ActivityCard color="#3b82f6" particleEffect="comet" lineStyle="glow">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Comet + Glow</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Cosmic comet with glowing path
              </div>
            </div>
          </ActivityCard>
          <ActivityCard color="#06b6d4" particleEffect="electric" lineStyle="wavy">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Electric + Wavy</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Electric sparks on wavy current
              </div>
            </div>
          </ActivityCard>
          <ActivityCard color="#ef4444" particleEffect="ember" lineStyle="scribble">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Ember + Scribble</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Glowing embers on sketched border
              </div>
            </div>
          </ActivityCard>
          <ActivityCard color="#8b5cf6" particleEffect="stardust" lineStyle="tapered">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Stardust + Tapered</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Magical stardust with tapered stroke
              </div>
            </div>
          </ActivityCard>
          <ActivityCard color="#22c55e" particleEffect="bubble" lineStyle="double">
            <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Bubble + Double</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Floating bubbles with double line
              </div>
            </div>
          </ActivityCard>
        </div>
      </section>
    </main>
  )
}
