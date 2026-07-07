import React, { useState } from 'react'
import TopicDrills from './TopicDrills.jsx'
import DashSets from './DashSets.jsx'

const TABS = [
  { key: 'topics', label: 'Topic Drills' },
  { key: 'dash', label: '12-Minute Dash' },
]

export default function MathDrills() {
  const [tab, setTab] = useState('topics')

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>ACT Math Drills</div>
      <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginBottom: 20 }}>
        Hard ACT math questions pulled from real test administrations — practice by topic or by timed dash.
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 18px', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer',
              border: 'none', background: 'transparent',
              color: tab === t.key ? 'var(--text)' : 'var(--text-secondary)',
              fontWeight: tab === t.key ? 600 : 400,
              borderBottom: tab === t.key ? '2px solid var(--text)' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'topics' ? <TopicDrills /> : <DashSets />}
    </div>
  )
}
