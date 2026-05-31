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
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 58, position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '-0.5px',
          }}>B</div>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.4px', color: 'var(--text)' }}>
            Bryndal Hub
          </span>
        </div>

        <nav style={{ display: 'flex', gap: 2 }}>
          {pages.map(p => (
            <button
              key={p.id}
              onClick={() => setPage(p.id)}
              style={{
                fontSize: 13, padding: '6px 14px', borderRadius: 'var(--radius-md)',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                background: page === p.id ? 'var(--border-hover)' : 'transparent',
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
      <div style={isEssays ? {} : { maxWidth: 960, margin: '0 auto', padding: '36px 28px' }}>
        <PageComponent onNavigate={setPage} />
      </div>
    </div>
  )
}
