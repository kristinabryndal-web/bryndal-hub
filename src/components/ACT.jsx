import React, { useState, useEffect } from 'react'
import { Metric, Card, SectionLabel, Badge, Empty, daysUntil } from './ui.jsx'
import { supabase } from '../supabase.js'
import { actData } from '../data/act.js'
import Practice from './Practice.jsx'
import { PracticeQuiz } from './PracticeQuiz.jsx'
import { actConventions } from '../data/practiceQuestions.js'
import TopicDrills from './TopicDrills.jsx'
import DashSets from './DashSets.jsx'

export default function ACT() {
  const [tests, setTests] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ test_date: '', english: '', math: '', reading: '', science: '', composite: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const regDays = daysUntil('2026-06-06')

  useEffect(() => { fetchTests() }, [])

  async function fetchTests() {
    const { data } = await supabase.from('act_tests').select('*').order('test_date', { ascending: false })
    if (data) setTests(data)
  }

  async function addTest() {
    if (!form.test_date) return
    setSaving(true)
    await supabase.from('act_tests').insert([{
      test_date: form.test_date,
      english:   form.english   ? parseInt(form.english)   : null,
      math:      form.math      ? parseInt(form.math)      : null,
      reading:   form.reading   ? parseInt(form.reading)   : null,
      science:   form.science   ? parseInt(form.science)   : null,
      composite: form.composite ? parseInt(form.composite) : null,
      notes: form.notes,
    }])
    setForm({ test_date: '', english: '', math: '', reading: '', science: '', composite: '', notes: '' })
    setShowForm(false)
    setSaving(false)
    fetchTests()
  }

  async function deleteTest(id) {
    await supabase.from('act_tests').delete().eq('id', id)
    fetchTests()
  }

  const latest = tests[0]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>ACT Prep</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Potential test date: July 11, 2026 — registration closes ~June 6</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <Metric label="Decision" value={<Badge type={actData.decision} />} />
        <Metric label="Target composite" value={`${actData.targets.composite.score}+`} />
        <Metric label="Days to register" value={regDays} sub="~June 6 deadline" />
        <Metric label="Latest composite" value={latest?.composite ?? '—'} sub={latest ? new Date(latest.test_date).toLocaleDateString() : 'Not yet logged'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <SectionLabel>Reasons to sit the ACT</SectionLabel>
          <Card>
            {actData.pros.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, padding: '6px 0' }}>
                <span style={{ color: 'var(--green-mid)', flexShrink: 0 }}>✓</span> {p}
              </div>
            ))}
          </Card>
        </div>
        <div>
          <SectionLabel>Considerations</SectionLabel>
          <Card>
            {actData.cons.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, padding: '6px 0' }}>
                <span style={{ color: 'var(--red-mid)', flexShrink: 0 }}>–</span> {c}
              </div>
            ))}
          </Card>
        </div>
      </div>

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 10 }}>
            {[
              { key: 'test_date',  label: 'Date',      type: 'date'   },
              { key: 'english',    label: 'English',   type: 'number', placeholder: '34' },
              { key: 'math',       label: 'Math',      type: 'number', placeholder: '34' },
              { key: 'reading',    label: 'Reading',   type: 'number', placeholder: '33' },
              { key: 'science',    label: 'Science',   type: 'number', placeholder: '34' },
              { key: 'composite',  label: 'Composite', type: 'number', placeholder: '34' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '0.5px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
              </div>
            ))}
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
        <Empty message="No practice tests logged yet — click + Add Test to log your first ACT score" />
      ) : (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)' }}>
                {['Date', 'English', 'Math', 'Reading', 'Science', 'Composite', 'Notes', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < tests.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '10px 16px' }}>{new Date(t.test_date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 16px' }}>{t.english ?? '—'}</td>
                  <td style={{ padding: '10px 16px' }}>{t.math ?? '—'}</td>
                  <td style={{ padding: '10px 16px' }}>{t.reading ?? '—'}</td>
                  <td style={{ padding: '10px 16px' }}>{t.science ?? '—'}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 500 }}>{t.composite ?? '—'}</td>
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

      <div style={{ marginTop: 32 }}>
        <Practice />
      </div>

      <div style={{ marginTop: 32 }}>
        <PracticeQuiz
          title="English Conventions — Passage Practice"
          subtitle="ACT-style passage questions targeting grammar and usage"
          questions={actConventions}
        />
      </div>

      <div style={{ marginTop: 32 }}>
        <TopicDrills />
      </div>

      <div style={{ marginTop: 32 }}>
        <DashSets />
      </div>
    </div>
  )
}
