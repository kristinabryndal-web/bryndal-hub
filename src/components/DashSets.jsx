import React, { useState } from 'react'
import { Card } from './ui.jsx'
import { PracticeQuiz } from './PracticeQuiz.jsx'
import { dash1Drill, dash8Drill } from '../data/dashSets.js'

const SETS = [
  { key: 'set1', label: 'Set 1', questions: dash1Drill },
  { key: 'set8', label: 'Set 8', questions: dash8Drill },
]

export default function DashSets() {
  const [activeKey, setActiveKey] = useState(null)
  const active = SETS.find(s => s.key === activeKey)

  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>ACT Math — 12-Minute Dash</div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Timed mixed-topic drills built from the last, hardest questions of a real ACT math section.
        Try to work through a set in about 12 minutes: do the quick plug-and-chug questions first,
        then come back for the long word problems.
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {SETS.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveKey(s.key)}
            style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit',
              cursor: 'pointer', border: `1px solid ${activeKey === s.key ? 'var(--border-hover)' : 'var(--border)'}`,
              background: activeKey === s.key ? 'var(--bg-secondary)' : 'var(--bg)',
              fontWeight: activeKey === s.key ? 600 : 400,
            }}
          >
            {s.label} <span style={{ color: 'var(--text-tertiary)' }}>({s.questions.length})</span>
          </button>
        ))}
      </div>

      {!active && (
        <Card>
          <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>Pick a set above to start a dash.</div>
        </Card>
      )}

      {active && (
        <PracticeQuiz
          key={active.key}
          title={`12-Minute Dash — ${active.label}`}
          subtitle={`${active.questions.length} questions`}
          questions={active.questions}
        />
      )}
    </div>
  )
}
