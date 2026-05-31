import React, { useState, useEffect } from 'react'
import { Card, SectionLabel } from './ui.jsx'
import { supabase } from '../supabase.js'

export default function Home({ onNavigate }) {
  const [checklist, setChecklist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChecklist()
  }, [])

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

      <SectionLabel>Master checklist — {done}/{checklist.length} complete</SectionLabel>
      <div style={{ height: 4, background: 'var(--bg-secondary)', borderRadius: 99, marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 99, background: 'var(--blue)', width: `${checklist.length ? (done / checklist.length) * 100 : 0}%`, transition: 'width 0.3s' }} />
      </div>

      <Card style={{ padding: '4px 20px' }}>
        {loading ? (
          <div style={{ padding: '20px 0', color: 'var(--text-secondary)', fontSize: 13 }}>Loading...</div>
        ) : checklist.map((item, i) => (
          <div key={item.id} onClick={() => toggleCheck(item)} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', cursor: 'pointer',
            borderBottom: i < checklist.length - 1 ? '0.5px solid var(--border)' : 'none',
          }}>
            <div style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1,
              border: item.done ? 'none' : '0.5px solid #ccc',
              background: item.done ? 'var(--blue)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {item.done && <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: item.done ? 'var(--text-secondary)' : 'var(--text)', textDecoration: item.done ? 'line-through' : 'none', lineHeight: 1.5 }}>
              {item.text}
            </span>
          </div>
        ))}
      </Card>
    </div>
  )
}
