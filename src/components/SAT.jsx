import React, { useState, useEffect } from 'react'
import { Metric, Card, SectionLabel, ProgressRow, Empty, daysUntil } from './ui.jsx'
import { supabase } from '../supabase.js'
import { satData } from '../data/sat.js'

export default function SAT() {
  const [tests, setTests] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ test_date: '', test_name: '', verbal: '', math: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const days = daysUntil('2026-08-22')

  useEffect(() => { fetchTests() }, [])

  async function fetchTests() {
    const { data } = await supabase.from('sat_tests').select('*').order('test_date', { ascending: false })
    if (data) setTests(data)
  }

  async function addTest() {
    if (!form.test_date) return
    setSaving(true)
    await supabase.from('sat_tests').insert([{
      test_date: form.test_date,
      test_name: form.test_name || 'Practice Test',
      verbal: form.verbal ? parseInt(form.verbal) : null,
      math: form.math ? parseInt(form.math) : null,
      notes: form.notes,
    }])
    setForm({ test_date: '', test_name: '', verbal: '', math: '', notes: '' })
    setShowForm(false)
    setSaving(false)
    fetchTests()
  }

  async function deleteTest(id) {
    await supabase.from('sat_tests').delete().eq('id', id)
    fetchTests()
  }

  const latest = tests[0]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>SAT Prep</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Target: August 22, 2026</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <Metric label="Current verbal" value={latest?.verbal ?? satData.scores.verbal.current} sub={latest ? new Date(latest.test_date).toLocaleDateString() : satData.scores.verbal.label} />
        <Metric label="Target verbal"  value={satData.scores.verbal.target} sub="Bluebook practice range" />
        <Metric label="Days until test" value={days} sub="Aug 22, 2026" />
        <Metric label="Current math"   value={latest?.math ?? '—'} sub={latest ? 'Latest test' : 'Not yet logged'} />
      </div>

      <SectionLabel>Priority focus areas</SectionLabel>
      <Card>
        {satData.focusAreas.map((area, i) => (
          <div key={i} style={{ marginBottom: i < satData.focusAreas.length - 1 ? 10 : 0 }}>
            <ProgressRow label={area.name} pct={area.pct} status={area.status} />
          </div>
        ))}
      </Card>

      <SectionLabel>Study schedule</SectionLabel>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['Week', 'Dates', 'Focus'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {satData.studySchedule.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < satData.studySchedule.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', width: 60 }}>{row.week}</td>
                <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', width: 120 }}>{row.dates}</td>
                <td style={{ padding: '10px 16px' }}>{row.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <SectionLabel>Practice test log</SectionLabel>
        <button onClick={() => setShowForm(!showForm)} style={{
          fontSize: 12, padding: '6px 14px', borderRadius: 6, border: '0.5px solid var(--border)',
          background: showForm ? 'var(--bg-secondary)' : 'var(--blue)', color: showForm ? 'var(--text)' : 'white',
          cursor: 'pointer', fontWeight: 500, marginBottom: 12,
        }}>
          {showForm ? 'Cancel' : '+ Add Test'}
        </button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            {[
              { key: 'test_date', label: 'Date', type: 'date' },
              { key: 'test_name', label: 'Test name', type: 'text', placeholder: 'Bluebook #1' },
              { key: 'verbal', label: 'Verbal', type: 'number', placeholder: '680' },
              { key: 'math', label: 'Math', type: 'number', placeholder: '720' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '0.5px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Notes</div>
            <input type="text" placeholder="How did it go?" value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '0.5px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </div>
          <button onClick={addTest} disabled={saving} style={{
            padding: '8px 20px', background: 'var(--blue)', color: 'white', border: 'none',
            borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            {saving ? 'Saving...' : 'Save Test'}
          </button>
        </Card>
      )}

      {tests.length === 0 ? (
        <Empty message="No practice tests logged yet — click + Add Test to log your first Bluebook score" />
      ) : (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)' }}>
                {['Date', 'Test', 'Verbal', 'Math', 'Total', 'Notes', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < tests.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '10px 16px' }}>{new Date(t.test_date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 16px' }}>{t.test_name}</td>
                  <td style={{ padding: '10px 16px' }}>{t.verbal ?? '—'}</td>
                  <td style={{ padding: '10px 16px' }}>{t.math ?? '—'}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 500 }}>{t.verbal && t.math ? t.verbal + t.math : '—'}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>{t.notes}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <button onClick={() => deleteTest(t.id)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14 }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
