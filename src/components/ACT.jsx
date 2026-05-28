import React from 'react'
import { Metric, Card, SectionLabel, Badge, Empty, daysUntil } from './ui.jsx'
import { actData } from '../data/act.js'

export default function ACT() {
  const { testDate, registrationDeadline, decision, targets, practiceTests, pros, cons } = actData
  const regDays = daysUntil(registrationDeadline)

  const sections = ['english', 'math', 'reading', 'science']

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>ACT Prep</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Potential test date: July 11, 2026 — registration closes ~June 6
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <Metric label="Decision" value={<Badge type={decision} />} />
        <Metric label="Target composite" value={`${targets.composite.score}+`} />
        <Metric label="Days to register" value={regDays} sub="~June 6 deadline" />
        <Metric label="Current composite" value={targets.composite.current} sub="Add after first test" />
      </div>

      {/* Pros / Cons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <SectionLabel>Reasons to sit the ACT</SectionLabel>
          <Card>
            {pros.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, padding: '6px 0', color: 'var(--text)' }}>
                <span style={{ color: 'var(--green-mid)', flexShrink: 0 }}>✓</span> {p}
              </div>
            ))}
          </Card>
        </div>
        <div>
          <SectionLabel>Considerations</SectionLabel>
          <Card>
            {cons.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, padding: '6px 0', color: 'var(--text)' }}>
                <span style={{ color: 'var(--red-mid)', flexShrink: 0 }}>–</span> {c}
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Target scores */}
      <SectionLabel>Target section scores</SectionLabel>
      <Card>
        {sections.map((s, i) => (
          <div key={s} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 0', fontSize: 13,
            borderBottom: i < sections.length - 1 ? '0.5px solid var(--border)' : 'none',
          }}>
            <span style={{ textTransform: 'capitalize', color: 'var(--text)' }}>{s}</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {targets[s].current
                ? <><strong style={{ color: 'var(--text)' }}>{targets[s].current}</strong> / target {targets[s].score}+</>
                : `Target: ${targets[s].score}+`
              }
            </span>
          </div>
        ))}
      </Card>

      {/* Practice tests */}
      <SectionLabel>Practice test log</SectionLabel>
      {practiceTests.length === 0 ? (
        <Empty message="No practice tests logged yet — add scores in src/data/act.js" />
      ) : (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)' }}>
                {['Date', 'English', 'Math', 'Reading', 'Science', 'Composite'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 16px', fontSize: 11,
                    fontWeight: 500, color: 'var(--text-secondary)',
                    borderBottom: '0.5px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {practiceTests.map((t, i) => (
                <tr key={i} style={{ borderBottom: i < practiceTests.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '10px 16px' }}>{t.date}</td>
                  <td style={{ padding: '10px 16px' }}>{t.english}</td>
                  <td style={{ padding: '10px 16px' }}>{t.math}</td>
                  <td style={{ padding: '10px 16px' }}>{t.reading}</td>
                  <td style={{ padding: '10px 16px' }}>{t.science}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 500 }}>{t.composite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
