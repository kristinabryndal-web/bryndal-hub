import React, { useState, useEffect, useRef } from 'react'
import { Card, SectionLabel } from './ui.jsx'
import { supabase } from '../supabase.js'

function InlineEdit({ value, onChange }) {
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
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value ?? ''); setEditing(false) } }}
        style={{ fontSize: 13, fontFamily: 'inherit', border: '1px solid var(--blue)', borderRadius: 4, padding: '1px 6px', outline: 'none', width: '100%', lineHeight: 1.5 }}
      />
    )
  }

  return (
    <span
      onClick={e => { e.stopPropagation(); setDraft(value ?? ''); setEditing(true) }}
      title="Click to edit"
      style={{ cursor: 'text', display: 'block', flex: 1, lineHeight: 1.5 }}
    >
      {value}
    </span>
  )
}

export default function Home({ onNavigate }) {
  const [checklist, setChecklist] = useState([])
  const [loading, setLoading] = useState(true)
  const [newText, setNewText] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => { fetchChecklist() }, [])

  async function fetchChecklist() {
    const { data } = await supabase.from('checklist').select('*').order('sort_order')
    if (data) setChecklist(data)
    setLoading(false)
  }

  async function toggleCheck(item) {
    const updated = !item.done
    setChecklist(prev => prev.map(c => c.id === item.id ? { ...c, done: updated } : c))
    await supabase.from('checklist').update({ done: updated }).eq('id', item.id)
  }

  async function updateText(id, text) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, text } : c))
    await supabase.from('checklist').update({ text }).eq('id', id)
  }

  async function deleteItem(id) {
    setChecklist(prev => prev.filter(c => c.id !== id))
    await supabase.from('checklist').delete().eq('id', id)
  }

  async function addItem() {
    if (!newText.trim()) return
    const sort_order = checklist.length + 1
    const { data } = await supabase.from('checklist').insert([{ text: newText.trim(), done: false, sort_order }]).select()
    if (data) setChecklist(prev => [...prev, data[0]])
    setNewText('')
    setAdding(false)
  }

  const done = checklist.filter(c => c.done).length

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Welcome back, Kristina</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Chase's college admissions dashboard — class of 2027</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 32 }}>
        {[
          { page: 'sat',      icon: '✏️', title: 'SAT Prep',        desc: 'Scores, weak areas, study schedule', tag: 'Aug 22, 2026',       tagColor: '#e6f1fb', tagText: '#185fa5' },
          { page: 'act',      icon: '📝', title: 'ACT Prep',        desc: 'Decide, prep, and track scores',     tag: 'Jul 11, 2026',        tagColor: '#e6f1fb', tagText: '#185fa5' },
          { page: 'colleges', icon: '🎓', title: 'College Tracker', desc: 'Schools, deadlines, essays',         tag: 'Essays not started',  tagColor: '#fcebeb', tagText: '#a32d2d' },
        ].map(({ page, icon, title, desc, tag, tagColor, tagText }) => (
          <div key={page} onClick={() => onNavigate(page)} style={{
            background: 'var(--bg)', border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: 20, cursor: 'pointer', transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{desc}</div>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, fontWeight: 500, background: tagColor, color: tagText }}>{tag}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <SectionLabel>Master checklist — {done}/{checklist.length} complete</SectionLabel>
        <button onClick={() => setAdding(true)} style={{
          fontSize: 12, padding: '5px 12px', borderRadius: 6, border: '0.5px solid var(--border)',
          background: 'var(--blue)', color: 'white', cursor: 'pointer', fontWeight: 500,
        }}>+ Add item</button>
      </div>

      <div style={{ height: 4, background: 'var(--bg-secondary)', borderRadius: 99, marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 99, background: 'var(--blue)', width: `${checklist.length ? (done / checklist.length) * 100 : 0}%`, transition: 'width 0.3s' }} />
      </div>

      <Card style={{ padding: '4px 20px' }}>
        {loading ? (
          <div style={{ padding: '20px 0', color: 'var(--text-secondary)', fontSize: 13 }}>Loading...</div>
        ) : checklist.map((item, i) => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
            borderBottom: i < checklist.length - 1 || adding ? '0.5px solid var(--border)' : 'none',
          }}>
            <div onClick={() => toggleCheck(item)} style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 2, cursor: 'pointer',
              border: item.done ? 'none' : '0.5px solid #ccc',
              background: item.done ? 'var(--blue)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {item.done && <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: item.done ? 'var(--text-secondary)' : 'var(--text)', textDecoration: item.done ? 'line-through' : 'none', flex: 1 }}>
              <InlineEdit value={item.text} onChange={v => updateText(item.id, v)} />
            </span>
            <button onClick={() => deleteItem(item.id)} title="Delete" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14, padding: '0 2px', flexShrink: 0, marginTop: 1 }}>✕</button>
          </div>
        ))}

        {adding && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, border: '0.5px solid #ccc', flexShrink: 0 }} />
            <input
              autoFocus
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addItem(); if (e.key === 'Escape') { setAdding(false); setNewText('') } }}
              placeholder="New checklist item..."
              style={{ flex: 1, fontSize: 13, border: '1px solid var(--blue)', borderRadius: 4, padding: '3px 8px', fontFamily: 'inherit', outline: 'none' }}
            />
            <button onClick={addItem} style={{ fontSize: 12, padding: '4px 10px', background: 'var(--blue)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>Add</button>
            <button onClick={() => { setAdding(false); setNewText('') }} style={{ fontSize: 12, padding: '4px 10px', background: 'none', border: '0.5px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
          </div>
        )}
      </Card>
    </div>
  )
}
