import React, { useState, useEffect, useRef } from 'react'
import { Metric, Card, SectionLabel, Badge, ProgressRow } from './ui.jsx'
import { supabase } from '../supabase.js'

const essayPct = { 'not-started': 0, 'in-progress': 50, 'done': 100 }

const chanceConfig = {
  'likely':     { label: '✦ Likely',     bg: '#1a4d1a', color: '#7dda7d' },
  'good':       { label: '◈ Good',       bg: '#1a3a1a', color: '#b8e090' },
  'possible':   { label: '◇ Possible',   bg: '#2a1f00', color: '#f0b429' },
  'reach':      { label: '△ Reach',      bg: '#2d1a4d', color: '#c49af5' },
  'long-reach': { label: '▽ Long Reach', bg: '#3d0f0f', color: '#f08080' },
}

const chanceOptions = ['likely', 'good', 'possible', 'reach', 'long-reach']
const strategyOptions = ['ED', 'EA', 'RD', 'ED2']
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

// Inline editable cell — shows text normally, becomes an input on click
function EditCell({ value, onChange, type = 'text', style = {} }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value ?? '')
  const ref = useRef()

  useEffect(() => { if (editing) ref.current?.focus() }, [editing])

  function commit() {
    setEditing(false)
    if (draft !== value) onChange(draft)
  }

  if (editing) {
    return (
      <input
        ref={ref}
        type={type}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value ?? ''); setEditing(false) } }}
        style={{ width: '100%', padding: '3px 6px', fontSize: 13, borderRadius: 4, border: '1px solid var(--blue)', fontFamily: 'inherit', outline: 'none', ...style }}
      />
    )
  }

  return (
    <span
      onClick={() => { setDraft(value ?? ''); setEditing(true) }}
      title="Click to edit"
      style={{ cursor: 'text', display: 'block', minHeight: 20, borderRadius: 4, padding: '1px 2px', transition: 'background 0.1s', ...style }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {value || <span style={{ color: 'var(--text-tertiary)' }}>—</span>}
    </span>
  )
}

// Select cell for fixed-option fields
function SelectCell({ value, options, onChange, renderValue }) {
  return (
    <select
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      style={{ fontSize: 11, padding: '2px 6px', borderRadius: 6, border: '0.5px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'inherit', cursor: 'pointer' }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export default function Colleges() {
  const [schools, setSchools]     = useState([])
  const [essays, setEssays]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [expandedNotes, setExpandedNotes] = useState(null)

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

  async function updateSchool(id, field, value) {
    setSchools(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
    await supabase.from('schools').update({ [field]: value }).eq('id', id)
  }

  async function updateEssayStatus(id, status) {
    setEssays(prev => prev.map(e => e.id === id ? { ...e, status } : e))
    await supabase.from('essays').update({ status }).eq('id', id)
  }

  async function addSchool() {
    const sort_order = schools.length + 1
    const { data } = await supabase.from('schools').insert([{
      name: 'New School', strategy: 'RD', sat_range: '', deadline: '', chance: 'possible',
      interview: '', status: 'not-started', notes: '', sort_order,
    }]).select()
    if (data) setSchools(prev => [...prev, data[0]])
  }

  async function deleteSchool(id) {
    setSchools(prev => prev.filter(s => s.id !== id))
    await supabase.from('schools').delete().eq('id', id)
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <SectionLabel>School list</SectionLabel>
        <button onClick={addSchool} style={{
          fontSize: 12, padding: '5px 12px', borderRadius: 6, border: '0.5px solid var(--border)',
          background: 'var(--blue)', color: 'white', cursor: 'pointer', fontWeight: 500,
        }}>+ Add School</button>
      </div>

      <Card style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 1200, borderCollapse: 'collapse', fontSize: 13, tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {[
                { label: 'School',          w: 180 },
                { label: 'Strategy',        w: 80  },
                { label: 'SAT range',       w: 110 },
                { label: 'Deadline',        w: 90  },
                { label: "Chase's Chances", w: 130 },
                { label: 'Interview',       w: 80  },
                { label: 'Notes',           w: 320 },
                { label: 'Status',          w: 130 },
                { label: '',                w: 44  },
              ].map(({ label, w }) => (
                <th key={label} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)', width: w }}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schools.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: i < schools.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                <td style={{ padding: '12px 16px', fontWeight: i === 0 ? 500 : 400 }}>
                  <EditCell value={s.name} onChange={v => updateSchool(s.id, 'name', v)} />
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <SelectCell value={s.strategy} options={strategyOptions} onChange={v => updateSchool(s.id, 'strategy', v)} />
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                  <EditCell value={s.sat_range} onChange={v => updateSchool(s.id, 'sat_range', v)} />
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <EditCell value={s.deadline} onChange={v => updateSchool(s.id, 'deadline', v)} />
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <select
                    value={s.chance ?? ''}
                    onChange={e => updateSchool(s.id, 'chance', e.target.value)}
                    style={{
                      fontSize: 11, padding: '3px 10px', borderRadius: 6, fontWeight: 500,
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                      background: chanceConfig[s.chance]?.bg || '#f1f1f1',
                      color: chanceConfig[s.chance]?.color || '#555',
                    }}
                  >
                    {chanceOptions.map(o => <option key={o} value={o}>{chanceConfig[o]?.label || o}</option>)}
                  </select>
                  {s.chance_note && <div title={s.chance_note} style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.chance_note}</div>}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={!!s.interview}
                    title={typeof s.interview === 'string' && s.interview.length > 1 ? s.interview : 'Interview required'}
                    onChange={e => updateSchool(s.id, 'interview', e.target.checked ? 'Yes' : '')}
                    style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--blue)' }}
                  />
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <EditCell
                    value={s.notes}
                    onChange={v => updateSchool(s.id, 'notes', v)}
                    style={{ color: 'var(--text-secondary)', fontSize: 12 }}
                  />
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <StatusSelect value={s.status} onChange={val => updateSchool(s.id, 'status', val)} />
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <button onClick={() => deleteSchool(s.id)} title="Remove school" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>✕</button>
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
    </div>
  )
}
