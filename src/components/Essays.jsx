import React, { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../supabase.js'

const statusConfig = {
  'not-started': { label: 'Not Started', bg: '#fcebeb', color: '#a32d2d' },
  'in-progress': { label: 'In Progress', bg: '#faeeda', color: '#854f0b' },
  'done':        { label: 'Done',        bg: '#eaf3de', color: '#3b6d11' },
}

const DEFAULT_ESSAYS = [
  { name: 'Common App Personal Statement', prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. Tell your story. (650 words)', word_limit: 650, due: 'Aug 1 (goal)', status: 'not-started', content: '' },
  { name: 'Boston College — Why BC?',      prompt: 'Please tell us why you are interested in attending Boston College. (400 words)', word_limit: 400, due: 'Nov 1', status: 'not-started', content: '' },
  { name: 'Wake Forest — Why Wake Forest?', prompt: 'What excites you most about the possibility of attending Wake Forest? (200 words)', word_limit: 200, due: 'Nov 1', status: 'not-started', content: '' },
  { name: 'Notre Dame — Why Notre Dame?',   prompt: 'Describe how Notre Dame\'s mission and identity appeals to you. (200 words)', word_limit: 200, due: 'Jan 1', status: 'not-started', content: '' },
  { name: 'Vanderbilt — Why Vanderbilt?',   prompt: 'Vanderbilt offers a community that is both intellectually stimulating and socially engaged. Please describe how your interests, experiences, and goals align with what Vanderbilt offers. (300 words)', word_limit: 300, due: 'Jan 1', status: 'not-started', content: '' },
  { name: 'Duke — Why Duke?',               prompt: 'What is your sense of Duke as a university and a community, and why do you see it as a good match for you? (250 words)', word_limit: 250, due: 'Jan 2', status: 'not-started', content: '' },
  { name: 'UVA — Why UVA?',                 prompt: 'What about your own experiences, beliefs, or background will contribute to the diversity UVA values? (250 words)', word_limit: 250, due: 'Jan 1', status: 'not-started', content: '' },
  { name: 'Michigan — Why Michigan?',       prompt: 'Describe the unique qualities that attract you to the specific undergraduate College or School (including preferred admission and dual degree programs) to which you are applying at the University of Michigan. (550 words)', word_limit: 550, due: 'Feb 1', status: 'not-started', content: '' },
  { name: 'Villanova — Why Villanova?',     prompt: 'Why do you want to attend Villanova University? (250 words)', word_limit: 250, due: 'Nov 1', status: 'not-started', content: '' },
  { name: 'SMU — Why SMU?',                 prompt: 'Why are you interested in attending SMU? (100 words)', word_limit: 100, due: 'Nov 1', status: 'not-started', content: '' },
  { name: 'TCU — Why TCU?',                 prompt: 'Why do you want to attend TCU? (250 words)', word_limit: 250, due: 'Nov 1', status: 'not-started', content: '' },
  { name: 'Holy Cross — Why Holy Cross?',   prompt: 'Why are you interested in Holy Cross? (250 words)', word_limit: 250, due: 'Nov 15', status: 'not-started', content: '' },
]

function wordCount(text) {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).length
}

export default function Essays() {
  const [essays, setEssays]       = useState([])
  const [selected, setSelected]   = useState(null)
  const [saving, setSaving]       = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [loading, setLoading]     = useState(true)
  const saveTimer = useRef(null)

  useEffect(() => { fetchEssays() }, [])

  async function fetchEssays() {
    const { data } = await supabase.from('essays').select('*').order('sort_order')
    if (data && data.length > 0) {
      setEssays(data)
      setSelected(data[0])
    } else {
      // Seed essays if none exist
      const toInsert = DEFAULT_ESSAYS.map((e, i) => ({ ...e, sort_order: i + 1 }))
      const { data: inserted } = await supabase.from('essays').insert(toInsert).select()
      if (inserted) { setEssays(inserted); setSelected(inserted[0]) }
    }
    setLoading(false)
  }

  const autoSave = useCallback((essay) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      await supabase.from('essays').update({
        content: essay.content,
        status: essay.status,
      }).eq('id', essay.id)
      setSaving(false)
      setLastSaved(new Date())
    }, 1000)
  }, [])

  function updateSelected(field, value) {
    const updated = { ...selected, [field]: value }
    setSelected(updated)
    setEssays(prev => prev.map(e => e.id === updated.id ? updated : e))
    autoSave(updated)
  }

  const wc = selected ? wordCount(selected.content) : 0
  const limit = selected?.word_limit ?? 650
  const pct = Math.min((wc / limit) * 100, 100)
  const overLimit = wc > limit

  if (loading) return <div style={{ padding: 40, color: 'var(--text-secondary)', fontSize: 13 }}>Loading essays...</div>

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px - 64px)', gap: 0, margin: '-32px -24px', overflow: 'hidden' }}>

      {/* Sidebar */}
      <div style={{
        width: 260, flexShrink: 0, borderRight: '0.5px solid var(--border)',
        background: 'var(--bg-secondary)', overflowY: 'auto', padding: '16px 0',
      }}>
        <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-secondary)', padding: '0 16px', marginBottom: 10 }}>
          Essays
        </div>
        {essays.map(e => {
          const wc = wordCount(e.content)
          const isActive = selected?.id === e.id
          const sc = statusConfig[e.status] || statusConfig['not-started']
          return (
            <div key={e.id} onClick={() => setSelected(e)} style={{
              padding: '10px 16px', cursor: 'pointer', borderLeft: isActive ? '2px solid var(--blue)' : '2px solid transparent',
              background: isActive ? 'var(--bg)' : 'transparent', transition: 'all 0.1s',
            }}>
              <div style={{ fontSize: 12, fontWeight: isActive ? 500 : 400, color: 'var(--text)', lineHeight: 1.4, marginBottom: 4 }}>{e.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 500, background: sc.bg, color: sc.color }}>{sc.label}</span>
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{wc}/{e.word_limit ?? '—'}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Editor */}
      {selected && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>

          {/* Editor toolbar */}
          <div style={{
            padding: '12px 24px', borderBottom: '0.5px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 2 }}>{selected.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Due: {selected.due}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Status selector */}
              <select value={selected.status} onChange={e => updateSelected('status', e.target.value)} style={{
                fontSize: 12, padding: '5px 10px', borderRadius: 6, border: '0.5px solid var(--border)',
                background: 'var(--bg)', color: 'var(--text)', fontFamily: 'inherit', cursor: 'pointer',
              }}>
                {Object.entries(statusConfig).map(([val, { label }]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              {/* Save indicator */}
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                {saving ? 'Saving...' : lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
              </div>
            </div>
          </div>

          {/* Prompt */}
          <div style={{ padding: '16px 24px', background: '#f8f9fa', borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Prompt</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{selected.prompt}</div>
          </div>

          {/* Text area */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <textarea
              value={selected.content || ''}
              onChange={e => updateSelected('content', e.target.value)}
              placeholder="Start writing here..."
              style={{
                flex: 1, width: '100%', padding: '24px', border: 'none', outline: 'none', resize: 'none',
                fontSize: 15, lineHeight: 1.8, fontFamily: 'Georgia, serif', color: 'var(--text)',
                background: 'var(--bg)',
              }}
            />
          </div>

          {/* Word count bar */}
          <div style={{
            padding: '10px 24px', borderTop: '0.5px solid var(--border)', flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg)',
          }}>
            <div style={{ flex: 1, height: 4, background: 'var(--bg-secondary)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99, transition: 'width 0.2s',
                width: `${pct}%`,
                background: overLimit ? '#e24b4a' : pct > 85 ? '#ef9f27' : '#1a73e8',
              }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: overLimit ? '#a32d2d' : 'var(--text-secondary)', minWidth: 80, textAlign: 'right' }}>
              {wc} / {limit} words {overLimit ? '⚠ over limit' : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
