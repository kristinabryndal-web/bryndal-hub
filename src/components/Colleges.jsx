import React, { useState, useEffect } from 'react'
import { Metric, Card, SectionLabel, Badge, ProgressRow } from './ui.jsx'
import { supabase } from '../supabase.js'

const essayPct = { 'not-started': 0, 'in-progress': 50, 'done': 100 }

const chanceConfig = {
  'likely':     { label: '✦ Likely',     bg: '#eaf3de', color: '#3b6d11' },
  'good':       { label: '◈ Good',       bg: '#e6f1fb', color: '#185fa5' },
  'possible':   { label: '◇ Possible',   bg: '#faeeda', color: '#854f0b' },
  'reach':      { label: '△ Reach',      bg: '#fcebeb', color: '#a32d2d' },
  'long-reach': { label: '▽ Long Reach', bg: '#f5e6fb', color: '#6b2d8b' },
}

const statusOptions = ['not-started', 'in-progress', 'done']
const essayStatusOptions = ['not-started', 'in-progress', 'done']

function ChanceBadge({ type }) {
  const c = chanceConfig[type] || { label: type, bg: '#f1f1f1', color: '#555' }
  return (
    <span style={{ display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 6, fontWeight: 500, background: c.bg, color: c.color, whiteSpace: 'nowrap' }}>
      {c.label}
    </span>
  )
}

function StatusSelect({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      fontSize: 11, padding: '3px 8px', borderRadius: 6, border: '0.5px solid var(--border)',
      background: 'var(--bg)', color: 'var(--text)', fontFamily: 'inherit', cursor: 'pointer',
    }}>
      {statusOptions.map(s => <option key={s} value={s}>{s.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}</option>)}
    </select>
  )
}

export default function Colleges() {
  const [schools, setSchools]   = useState([])
  const [essays, setEssays]     = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([fetchSchools(), fetchEssays()]).then(() => setLoading(false))
  }, [])

  async function fetchSchools() {
    const { data } = await supabase.from('schools').select('*').order('sort_order')
    if (data) setSchools(data)
  }

  async function fetchEssays() {
    const { data } = await supabase.from('essays').select('*').order('sort_order')
    if (data) setEssays(data)
  }

  async function updateSchoolStatus(id, status) {
    setSchools(prev => prev.map(s => s.id === id ? { ...s, status } : s))
    await supabase.from('schools').update({ status }).eq('id', id)
  }

  async function updateEssayStatus(id, status) {
    setEssays(prev => prev.map(e => e.id === id ? { ...e, status } : e))
    await supabase.from('essays').update({ status }).eq('id', id)
  }

  const essaysDone = essays.filter(e => e.status === 'done').length

  if (loading) return <div style={{ padding: 40, color: 'var(--text-secondary)', fontSize: 13 }}>Loading...</div>

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>College Tracker</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Chase Bryndal · Benet Academy, Class of 2027</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <Metric label="Schools on list"  value={schools.length} />
        <Metric label="Essays written"   value={`${essaysDone} / ${essays.length}`} />
        <Metric label="ED strategy"      value="Boston College" sub="~30% acceptance boost" />
        <Metric label="Next deadline"    value="Nov 1" sub="BC ED / Wake / Villanova / TCU" />
      </div>

      <SectionLabel>School list</SectionLabel>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {[
                { label: 'School',          w: '18%' },
                { label: 'Strategy',        w: '9%'  },
                { label: 'SAT range',       w: '11%' },
                { label: 'Deadline',        w: '9%'  },
                { label: "Chase's Chances", w: '13%' },
                { label: 'Interview',       w: '20%' },
                { label: 'Status',          w: '14%' },
              ].map(({ label, w }) => (
                <th key={label} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)', width: w }}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schools.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: i < schools.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                <td style={{ padding: '10px 14px', fontWeight: i === 0 ? 500 : 400 }}>{s.name}</td>
                <td style={{ padding: '10px 14px' }}><Badge type={s.strategy} /></td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{s.sat_range}</td>
                <td style={{ padding: '10px 14px' }}>{s.deadline}</td>
                <td style={{ padding: '10px 14px' }}>
                  <ChanceBadge type={s.chance} />
                  {s.chance_note && <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>{s.chance_note}</div>}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  {s.interview
                    ? <span style={{ color: 'var(--red-mid)', fontSize: 11 }}>⚠ {s.interview}</span>
                    : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <StatusSelect value={s.status} onChange={val => updateSchoolStatus(s.id, val)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <SectionLabel>Essays</SectionLabel>
      <Card>
        {essays.map((e, i) => (
          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < essays.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
            <div style={{ flex: 1 }}>
              <ProgressRow
                label={e.name + (e.due ? ` — due ${e.due}` : '')}
                pct={essayPct[e.status] ?? 0}
                status={e.status === 'not-started' ? 'weak' : e.status === 'in-progress' ? 'review' : 'good'}
              />
            </div>
            <select value={e.status} onChange={ev => updateEssayStatus(e.id, ev.target.value)} style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 6, border: '0.5px solid var(--border)',
              background: 'var(--bg)', color: 'var(--text)', fontFamily: 'inherit', cursor: 'pointer', flexShrink: 0,
            }}>
              {essayStatusOptions.map(s => <option key={s} value={s}>{s.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}</option>)}
            </select>
          </div>
        ))}
      </Card>

      <SectionLabel>Notes & highlights</SectionLabel>
      <Card>
        {schools.filter(s => s.notes).map((s, i, arr) => (
          <div key={s.id} style={{ fontSize: 13, padding: '8px 0', borderBottom: i < arr.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
            <strong>{s.name}:</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{s.notes}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
