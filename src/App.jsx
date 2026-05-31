import React, { useState } from 'react'
import Home from './components/Home.jsx'
import SAT from './components/SAT.jsx'
import ACT from './components/ACT.jsx'
import Colleges from './components/Colleges.jsx'
import Essays from './components/Essays.jsx'

const pages = [
  { id: 'home',     label: 'Home' },
  { id: 'sat',      label: 'SAT Prep' },
  { id: 'act',      label: 'ACT Prep' },
  { id: 'colleges', label: 'College Tracker' },
  { id: 'essays',   label: 'Essays' },
]

export default function App() {
  const [page, setPage] = useState('home')

  const pageMap = { home: Home, sat: SAT, act: ACT, colleges: Colleges, essays: Essays }
  const PageComponent = pageMap[page] || Home
  const isEssays = page === 'essays'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--bg)', borderBottom: '0.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 56, position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div
          onClick={() => setPage('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)',
          }} />
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.3px' }}>
            Bryndal Hub
          </span>
        </div>

        <nav style={{ display: 'flex', gap: 4 }}>
          {pages.map(p => (
            <button
              key={p.id}
              onClick={() => setPage(p.id)}
              style={{
                fontSize: 13, padding: '6px 14px', borderRadius: 'var(--radius-md)',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                background: page === p.id ? 'var(--bg-secondary)' : 'transparent',
                color: page === p.id ? 'var(--text)' : 'var(--text-secondary)',
                fontWeight: page === p.id ? 500 : 400,
              }}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Page content */}
      <div style={isEssays ? {} : { maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <PageComponent onNavigate={setPage} />
      </div>
    </div>
  )
}
