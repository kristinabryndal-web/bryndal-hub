import React, { useState } from 'react'
import { Card } from './ui.jsx'
import { PracticeQuiz } from './PracticeQuiz.jsx'
import { areaProportionDrill, linearEquationsDrill, percentsDrill, sequencesSeriesDrill } from '../data/topicDrills.js'

const TOPICS = [
  { key: 'area', label: 'Area + Proportion', questions: areaProportionDrill },
  { key: 'linear', label: 'Linear Equations / Word Problems', questions: linearEquationsDrill },
  { key: 'percents', label: 'Percents', questions: percentsDrill },
  { key: 'sequences', label: 'Sequences & Series', questions: sequencesSeriesDrill },
]

export default function TopicDrills() {
  const [activeKey, setActiveKey] = useState(null)
  const active = TOPICS.find(t => t.key === activeKey)

  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>ACT Math — Topic Drills</div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Hard questions pulled from real ACT test administrations, grouped by topic instead of by full test form.
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {TOPICS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveKey(t.key)}
            style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit',
              cursor: 'pointer', border: `1px solid ${activeKey === t.key ? 'var(--border-hover)' : 'var(--border)'}`,
              background: activeKey === t.key ? 'var(--bg-secondary)' : 'var(--bg)',
              fontWeight: activeKey === t.key ? 600 : 400,
            }}
          >
            {t.label} <span style={{ color: 'var(--text-tertiary)' }}>({t.questions.length})</span>
          </button>
        ))}
      </div>

      {!active && (
        <Card>
          <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>Pick a topic above to start a drill set.</div>
        </Card>
      )}

      {active && (
        <PracticeQuiz
          key={active.key}
          title={active.label}
          subtitle={`${active.questions.length} questions`}
          questions={active.questions}
        />
      )}
    </div>
  )
}
