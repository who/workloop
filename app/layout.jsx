export const metadata = {
  title: 'Workloop',
  description: 'A visualizer for showing input and output of workers in a system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
