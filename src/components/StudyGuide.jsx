import React, { useState, useMemo } from 'react'
import { SectionLabel } from './ui.jsx'
import { mathTopics, tierMeta } from '../data/mathTopics.js'

const tiers = ['all', 'guaranteed', 'likely', 'worth', 'twice']
const tierLabels = { all: 'All Topics', ...Object.fromEntries(Object.entries(tierMeta).map(([k,v]) => [k, v.label])) }

function TopicCard({ topic }) {
  const [open, setOpen] = useState(false)
  const meta = tierMeta[topic.tier]

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: '14px 16px',
        marginBottom: 8, cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
          background: meta.bg, color: meta.color, flexShrink: 0, whiteSpace: 'nowrap',
        }}>
          {meta.label}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>
          {topic.id}. {topic.name}
        </span>
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)', flexShrink: 0 }}>
          {open ? '▲' : '▼'}
        </span>
      </div>

      {open && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            background: 'var(--bg-secondary)', borderRadius: 6, padding: '10px 12px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-tertiary)', marginBottom: 5 }}>What to Know</div>
            <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.55 }}>{topic.know}</div>
          </div>
          <div style={{
            background: '#1e1408', border: '1px solid #3d2c00', borderRadius: 6, padding: '10px 12px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#ef9f27', marginBottom: 5 }}>⚠ Key Trap</div>
            <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.55 }}>{topic.trap}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function StudyGuide() {
  const [activeTier, setActiveTier] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return mathTopics.filter(t => {
      const tierMatch = activeTier === 'all' || t.tier === activeTier
      const searchMatch = !search || t.name.toLowerCase().includes(search.toLowerCase())
        || t.know.toLowerCase().includes(search.toLowerCase())
      return tierMatch && searchMatch
    })
  }, [activeTier, search])

  const counts = useMemo(() => {
    const c = { all: mathTopics.length }
    for (const t of mathTopics) c[t.tier] = (c[t.tier] || 0) + 1
    return c
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>ACT Math Study Guide</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Top 75 topics ranked by frequency. Click any topic for what to know and the key trap to avoid.
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '9px 14px', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          color: 'var(--text)', fontSize: 14, fontFamily: 'inherit', marginBottom: 14,
        }}
      />

      {/* Tier filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {tiers.map(t => (
          <button
            key={t}
            onClick={() => setActiveTier(t)}
            style={{
              fontSize: 12, padding: '6px 12px', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit',
              background: activeTier === t ? 'var(--blue)' : 'var(--bg-card)',
              color: activeTier === t ? 'white' : 'var(--text-secondary)',
              fontWeight: activeTier === t ? 600 : 400,
            }}
          >
            {tierLabels[t]} <span style={{ opacity: 0.6 }}>({counts[t] || 0})</span>
          </button>
        ))}
      </div>

      {/* Topic count */}
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        Showing {filtered.length} of {mathTopics.length} topics
      </div>

      {/* Topic list */}
      {filtered.length === 0 ? (
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '32px 20px', textAlign: 'center',
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          No topics match your search.
        </div>
      ) : (
        filtered.map(t => <TopicCard key={t.id} topic={t} />)
      )}
    </div>
  )
}
