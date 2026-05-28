import React from 'react'
import { Metric, Card, SectionLabel, ProgressRow, Empty, daysUntil } from './ui.jsx'
import { satData } from '../data/sat.js'

export default function SAT() {
  const { testDate, scores, focusAreas, practiceTests, studySchedule } = satData
  const days = daysUntil(testDate)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>SAT Prep</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Target: August 22, 2026</div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <Metric label="Current verbal" value={scores.verbal.current} sub={scores.verbal.label} />
        <Metric label="Target verbal"  value={scores.verbal.target}  sub="Bluebook practice range" />
        <Metric label="Days until test" value={days}                 sub="Aug 22, 2026" />
        <Metric label="Current math"   value={scores.math.current}   sub={scores.math.label} />
      </div>

      {/* Focus areas */}
      <SectionLabel>Priority focus areas</SectionLabel>
      <Card>
        {focusAreas.map((area, i) => (
          <div key={i} style={{ marginBottom: i < focusAreas.length - 1 ? 10 : 0 }}>
            <ProgressRow label={area.name} pct={area.pct} status={area.status} />
          </div>
        ))}
      </Card>

      {/* Study schedule */}
      <SectionLabel>Study schedule</SectionLabel>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['Week', 'Dates', 'Focus'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '10px 16px', fontSize: 11,
                  fontWeight: 500, color: 'var(--text-secondary)',
                  borderBottom: '0.5px solid var(--border)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studySchedule.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < studySchedule.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', width: 60 }}>{row.week}</td>
                <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', width: 120 }}>{row.dates}</td>
                <td style={{ padding: '10px 16px' }}>{row.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Practice tests */}
      <SectionLabel>Practice test log</SectionLabel>
      {practiceTests.length === 0 ? (
        <Empty message="No practice tests logged yet — add your first Bluebook score in src/data/sat.js" />
      ) : (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)' }}>
                {['Date', 'Test', 'Verbal', 'Math', 'Total', 'Notes'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 16px', fontSize: 11,
                    fontWeight: 500, color: 'var(--text-secondary)',
                    borderBottom: '0.5px solid var(--border)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {practiceTests.map((t, i) => (
                <tr key={i} style={{ borderBottom: i < practiceTests.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '10px 16px' }}>{t.date}</td>
                  <td style={{ padding: '10px 16px' }}>{t.test}</td>
                  <td style={{ padding: '10px 16px' }}>{t.verbal ?? '—'}</td>
                  <td style={{ padding: '10px 16px' }}>{t.math ?? '—'}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 500 }}>{t.verbal && t.math ? t.verbal + t.math : '—'}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>{t.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
