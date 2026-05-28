import React from 'react'
import { Metric, Card, SectionLabel, Badge, ProgressRow } from './ui.jsx'
import { collegeData } from '../data/colleges.js'

const essayPct = { 'not-started': 0, 'in-progress': 50, 'done': 100 }

const chanceConfig = {
  'likely':     { label: '✦ Likely',     bg: '#eaf3de', color: '#3b6d11' },
  'good':       { label: '◈ Good',       bg: '#e6f1fb', color: '#185fa5' },
  'possible':   { label: '◇ Possible',   bg: '#faeeda', color: '#854f0b' },
  'reach':      { label: '△ Reach',      bg: '#fcebeb', color: '#a32d2d' },
  'long-reach': { label: '▽ Long Reach', bg: '#f5e6fb', color: '#6b2d8b' },
}

function ChanceBadge({ type }) {
  const c = chanceConfig[type] || { label: type, bg: '#f1f1f1', color: '#555' }
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, padding: '3px 10px',
      borderRadius: 6, fontWeight: 500, background: c.bg, color: c.color,
      whiteSpace: 'nowrap',
    }}>
      {c.label}
    </span>
  )
}

export default function Colleges() {
  const { student, school, schools, essays } = collegeData
  const essaysDone = essays.filter(e => e.status === 'done').length

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>College Tracker</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{student} · {school}</div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <Metric label="Schools on list"  value={schools.length} />
        <Metric label="Essays written"   value={`${essaysDone} / ${essays.length}`} />
        <Metric label="ED strategy"      value="Boston College" sub="~30% acceptance boost" />
        <Metric label="Next deadline"    value="Nov 1" sub="BC ED / Wake / Villanova / TCU" />
      </div>

      {/* School table */}
      <SectionLabel>School list</SectionLabel>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {[
                { label: 'School',    w: '20%' },
                { label: 'Strategy', w: '9%' },
                { label: 'SAT range', w: '12%' },
                { label: 'Deadline', w: '9%' },
                { label: 'Chase\'s Chances', w: '13%' },
                { label: 'Interview', w: '22%' },
                { label: 'Status',   w: '12%' },
              ].map(({ label, w }) => (
                <th key={label} style={{
                  textAlign: 'left', padding: '10px 14px', fontSize: 11,
                  fontWeight: 500, color: 'var(--text-secondary)',
                  borderBottom: '0.5px solid var(--border)', width: w,
                }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schools.map((s, i) => (
              <tr key={i} style={{ borderBottom: i < schools.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                <td style={{ padding: '10px 14px', fontWeight: i === 0 ? 500 : 400 }}>{s.name}</td>
                <td style={{ padding: '10px 14px' }}><Badge type={s.strategy} /></td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{s.satRange}</td>
                <td style={{ padding: '10px 14px' }}>{s.deadline}</td>
                <td style={{ padding: '10px 14px' }}>
                  <div><ChanceBadge type={s.chance} /></div>
                  {s.chanceNote && <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>{s.chanceNote}</div>}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  {s.interview
                    ? <span style={{ color: 'var(--red-mid)', fontSize: 12 }}>⚠ {s.interview}</span>
                    : <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                  }
                </td>
                <td style={{ padding: '10px 14px' }}><Badge type={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Essays */}
      <SectionLabel>Essays</SectionLabel>
      <Card>
        {essays.map((e, i) => (
          <div key={i} style={{ marginBottom: i < essays.length - 1 ? 12 : 0 }}>
            <ProgressRow
              label={e.name + (e.due ? ` — due ${e.due}` : '')}
              pct={essayPct[e.status] ?? 0}
              status={e.status === 'not-started' ? 'weak' : e.status === 'in-progress' ? 'review' : 'good'}
            />
          </div>
        ))}
      </Card>

      {/* Notes */}
      <SectionLabel>Notes & highlights</SectionLabel>
      <Card>
        {schools.filter(s => s.notes).map((s, i) => (
          <div key={i} style={{
            fontSize: 13, padding: '8px 0',
            borderBottom: i < schools.filter(x => x.notes).length - 1 ? '0.5px solid var(--border)' : 'none',
          }}>
            <strong>{s.name}:</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{s.notes}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
