import { Providers } from './providers'

export const metadata = {
  title: 'Workloop',
  description: 'A visualizer for showing input and output of workers in a system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --bg-color: #fff;
            --text-color: #111;
            --text-muted: #666;
            --card-bg: rgba(128, 128, 128, 0.1);
          }
          .dark {
            --bg-color: #111;
            --text-color: #fff;
            --text-muted: #888;
            --card-bg: rgba(128, 128, 128, 0.1);
          }
          @media (prefers-color-scheme: dark) {
            :root:not(.light) {
              --bg-color: #111;
              --text-color: #fff;
              --text-muted: #888;
            }
          }
        `}</style>
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', minHeight: '100vh', transition: 'background-color 0.2s, color 0.2s' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
