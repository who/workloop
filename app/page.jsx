import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
      <h1>Workloop</h1>
      <p>A visualizer for showing input and output of workers in a system</p>
      <Link href="/demo" style={{ color: '#3b82f6', marginTop: '1rem' }}>
        View ActivityCard Demo →
      </Link>
    </main>
  )
}
