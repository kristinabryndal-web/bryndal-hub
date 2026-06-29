import React, { useState, useEffect, useRef, useCallback } from 'react'
import { practiceTests, sectionMeta, getChoices, lookupScaled } from '../data/practiceTests.js'

const STORAGE_KEY = 'bryndal_test_history'

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

// ── Helpers ────────────────────────────────────────────────────────────────

function ScaledBadge({ score }) {
  const color = score >= 34 ? '#7dda7d' : score >= 30 ? '#4f8ef7' : score >= 24 ? '#f0b429' : '#f08080'
  const bg    = score >= 34 ? '#0f2318' : score >= 30 ? '#1a2a4a' : score >= 24 ? '#2a1f00' : '#3d0f0f'
  return (
    <span style={{ fontSize: 28, fontWeight: 700, color, background: bg, padding: '4px 14px', borderRadius: 8 }}>
      {score}
    </span>
  )
}

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ── Screen: Select Test ────────────────────────────────────────────────────

function SelectTest({ onSelect }) {
  const history = loadHistory()
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Full Practice Tests</div>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
        Take a timed section, enter your answers, and get an instant scaled score.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {practiceTests.map(t => {
          const attempts = history.filter(h => h.testId === t.id)
          return (
            <div key={t.id}
              onClick={() => onSelect(t)}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
                padding: '20px 22px', cursor: 'pointer', transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>Form {t.id}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t.date}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {Object.entries(t.sections).map(([sec, sd]) => {
                  const m = sectionMeta[sec]
                  return (
                    <span key={sec} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: m.bg, color: m.color, fontWeight: 500 }}>
                      {m.label} {sd.count}Q
                    </span>
                  )
                })}
              </div>
              {attempts.length > 0 ? (
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {attempts.length} attempt{attempts.length !== 1 ? 's' : ''} — best:{' '}
                  {['english','math','reading','science'].map(sec => {
                    const best = Math.max(...attempts.filter(a => a.section === sec).map(a => a.scaled), 0)
                    if (!best) return null
                    return <span key={sec} style={{ marginRight: 6 }}>{sectionMeta[sec].label} {best}</span>
                  })}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Not attempted yet</div>
              )}
            </div>
          )
        })}
      </div>

      {history.length > 0 && <HistoryTable history={history} />}
    </div>
  )
}

// ── Screen: Select Section ─────────────────────────────────────────────────

function SelectSection({ test, onSelect, onBack }) {
  const history = loadHistory().filter(h => h.testId === test.id)

  return (
    <div>
      <button onClick={onBack} style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, padding: 0 }}>
        ← All Tests
      </button>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Form {test.id} — {test.date}</div>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>Choose a section to practice</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {Object.entries(test.sections).map(([sec, sd]) => {
          const m = sectionMeta[sec]
          const past = history.filter(h => h.section === sec)
          const best = past.length ? Math.max(...past.map(h => h.scaled)) : null
          return (
            <div key={sec}
              onClick={() => onSelect(sec)}
              style={{
                background: 'var(--bg-card)', border: `1px solid var(--border)`, borderRadius: 12,
                padding: '18px 20px', cursor: 'pointer', transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = m.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: m.color, background: m.bg, display: 'inline-block', padding: '2px 8px', borderRadius: 20, marginBottom: 10 }}>
                {m.label.toUpperCase()}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{sd.count}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>questions · {sd.minutes} min</div>
              {best ? (
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Best scaled score: <span style={{ color: m.color, fontWeight: 600 }}>{best}</span>
                  {past.length > 1 && <span style={{ color: 'var(--text-tertiary)' }}> ({past.length} attempts)</span>}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Not attempted</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Screen: Taking the Test ────────────────────────────────────────────────

function TakingTest({ test, section, onSubmit, onBack }) {
  const sd = test.sections[section]
  const m = sectionMeta[section]
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(sd.minutes * 60)
  const [timerActive, setTimerActive] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const intervalRef = useRef(null)

  const answered = Object.keys(answers).length
  const total = sd.count

  useEffect(() => {
    if (timerActive && !submitted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            handleSubmit(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [timerActive, submitted])

  function handleSubmit(auto = false) {
    clearInterval(intervalRef.current)
    setSubmitted(true)
    onSubmit(answers)
  }

  const timerColor = timeLeft <= 120 ? '#f08080' : timeLeft <= 300 ? '#f0b429' : 'var(--text-secondary)'

  return (
    <div>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'sticky', top: 58, background: 'var(--bg-secondary)', padding: '10px 0', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onBack} style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>← Back</button>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Form {test.id} · {m.label}</span>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{answered}/{total} answered</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'monospace', color: timerColor }}>
            {formatTime(timeLeft)}
          </span>
          {!timerActive ? (
            <button onClick={() => setTimerActive(true)} style={{ fontSize: 13, padding: '6px 16px', borderRadius: 8, background: 'var(--blue)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              Start Timer
            </button>
          ) : (
            <button onClick={() => handleSubmit(false)} style={{ fontSize: 13, padding: '6px 16px', borderRadius: 8, background: '#2d1a4d', color: '#c49af5', border: '1px solid #c49af5', cursor: 'pointer', fontWeight: 600 }}>
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Tip */}
      {!timerActive && (
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
          Open the <strong style={{ color: 'var(--text)' }}>Form {test.id} {m.label} PDF</strong> alongside this window, then hit <strong style={{ color: 'var(--text)' }}>Start Timer</strong> when you're ready. Enter each answer as you go.
        </div>
      )}

      {/* Answer grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
        {Array.from({ length: total }, (_, i) => i + 1).map(qNum => {
          const choices = getChoices(section, qNum)
          const chosen = answers[qNum]
          return (
            <div key={qNum} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: chosen ? 'var(--bg-card)' : 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '8px 12px',
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', width: 24, flexShrink: 0, textAlign: 'right' }}>{qNum}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {choices.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setAnswers(a => ({ ...a, [qNum]: chosen === letter ? undefined : letter }))}
                    style={{
                      width: 32, height: 32, borderRadius: 6, fontSize: 12, fontWeight: 600,
                      border: chosen === letter ? 'none' : '1px solid var(--border)',
                      background: chosen === letter ? m.color : 'transparent',
                      color: chosen === letter ? '#000' : 'var(--text-secondary)',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.1s',
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit button (bottom) */}
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => handleSubmit(false)} style={{
          fontSize: 14, padding: '10px 32px', borderRadius: 10,
          background: 'var(--blue)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600,
        }}>
          Submit Answers ({answered}/{total} filled in)
        </button>
      </div>
    </div>
  )
}

// ── Screen: Results ────────────────────────────────────────────────────────

function Results({ test, section, userAnswers, onRetake, onBack }) {
  const sd = test.sections[section]
  const m = sectionMeta[section]

  const results = Array.from({ length: sd.count }, (_, i) => i + 1).map(qNum => {
    const correct = sd.answers[qNum]
    const chosen  = userAnswers[qNum]
    return { qNum, correct: correct || '?', chosen: chosen || '—', isCorrect: chosen && chosen === correct, skipped: !chosen }
  })

  const raw    = results.filter(r => r.isCorrect).length
  const scaled = lookupScaled(section, raw)
  const missed = results.filter(r => !r.isCorrect && !r.skipped)
  const skipped = results.filter(r => r.skipped)

  return (
    <div>
      <button onClick={onBack} style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, padding: 0 }}>
        ← All Tests
      </button>

      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
        Form {test.id} · {m.label} Results
      </div>

      {/* Score cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Scaled Score', value: <ScaledBadge score={scaled} />, sub: 'out of 36' },
          { label: 'Raw Score',    value: <span style={{ fontSize: 28, fontWeight: 700 }}>{raw}</span>, sub: `out of ${sd.count}` },
          { label: 'Correct',      value: <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--green-mid)' }}>{raw}</span>, sub: `${Math.round(raw / sd.count * 100)}%` },
          { label: 'Missed',       value: <span style={{ fontSize: 28, fontWeight: 700, color: missed.length ? 'var(--red-mid)' : 'var(--green-mid)' }}>{missed.length}</span>, sub: skipped.length ? `+ ${skipped.length} skipped` : 'questions wrong' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{label}</div>
            <div style={{ marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Answer-by-answer review */}
      <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Question Review
      </div>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
          {results.map(r => (
            <div key={r.qNum} style={{
              padding: '10px 8px', textAlign: 'center', borderRight: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)',
              background: r.isCorrect ? '#0f2318' : r.skipped ? 'var(--bg)' : '#2e1212',
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 3 }}>Q{r.qNum}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: r.isCorrect ? 'var(--green-mid)' : r.skipped ? 'var(--text-tertiary)' : 'var(--red-mid)' }}>
                {r.chosen}
              </div>
              {!r.isCorrect && !r.skipped && (
                <div style={{ fontSize: 10, color: 'var(--green-mid)', marginTop: 2 }}>→ {r.correct}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Missed questions detail */}
      {missed.length > 0 && (
        <>
          <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Questions to Review ({missed.length})
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
            {missed.map((r, i) => (
              <div key={r.qNum} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '10px 16px',
                borderBottom: i < missed.length - 1 ? '0.5px solid var(--border)' : 'none',
              }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', width: 50, flexShrink: 0 }}>Q {r.qNum}</span>
                <span style={{ fontSize: 13, color: 'var(--red-mid)', fontWeight: 600, width: 40 }}>You: {r.chosen}</span>
                <span style={{ fontSize: 13, color: 'var(--green-mid)', fontWeight: 600, width: 60 }}>✓ {r.correct}</span>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Find Q{r.qNum} in the Form {test.id} {m.label} PDF to review</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onRetake} style={{ fontSize: 13, padding: '8px 20px', borderRadius: 8, background: 'var(--blue)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          Retake This Section
        </button>
        <button onClick={onBack} style={{ fontSize: 13, padding: '8px 20px', borderRadius: 8, background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)', cursor: 'pointer' }}>
          All Tests
        </button>
      </div>
    </div>
  )
}

// ── History Table ──────────────────────────────────────────────────────────

function HistoryTable({ history }) {
  if (!history.length) return null
  const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
        Score History
      </div>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['Date', 'Form', 'Section', 'Raw', 'Scaled', 'Correct %'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 14px', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => {
              const m = sectionMeta[r.section]
              return (
                <tr key={i} style={{ borderBottom: i < sorted.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '8px 14px', color: 'var(--text-secondary)' }}>{new Date(r.date).toLocaleDateString()}</td>
                  <td style={{ padding: '8px 14px' }}>Form {r.testId}</td>
                  <td style={{ padding: '8px 14px' }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: m.bg, color: m.color, fontWeight: 500 }}>{m.label}</span>
                  </td>
                  <td style={{ padding: '8px 14px' }}>{r.raw} / {r.total}</td>
                  <td style={{ padding: '8px 14px', fontWeight: 700, color: r.scaled >= 34 ? 'var(--green-mid)' : r.scaled >= 30 ? 'var(--blue)' : 'var(--text)' }}>{r.scaled}</td>
                  <td style={{ padding: '8px 14px', color: 'var(--text-secondary)' }}>{Math.round(r.raw / r.total * 100)}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function TestMode() {
  const [screen, setScreen] = useState('select-test') // select-test | select-section | taking | results
  const [selectedTest, setSelectedTest]       = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)
  const [userAnswers, setUserAnswers]         = useState({})

  function handleSubmit(answers) {
    const sd     = selectedTest.sections[selectedSection]
    const raw    = Object.entries(answers).filter(([q, a]) => sd.answers[Number(q)] === a).length
    const scaled = lookupScaled(selectedSection, raw)
    const record = {
      testId: selectedTest.id, section: selectedSection,
      raw, total: sd.count, scaled,
      date: new Date().toISOString(), answers,
    }
    const history = loadHistory()
    saveHistory([record, ...history])
    setUserAnswers(answers)
    setScreen('results')
  }

  if (screen === 'taking') {
    return (
      <TakingTest
        test={selectedTest}
        section={selectedSection}
        onSubmit={handleSubmit}
        onBack={() => setScreen('select-section')}
      />
    )
  }

  if (screen === 'results') {
    return (
      <Results
        test={selectedTest}
        section={selectedSection}
        userAnswers={userAnswers}
        onRetake={() => { setUserAnswers({}); setScreen('taking') }}
        onBack={() => { setSelectedTest(null); setScreen('select-test') }}
      />
    )
  }

  if (screen === 'select-section' && selectedTest) {
    return (
      <SelectSection
        test={selectedTest}
        onSelect={sec => { setSelectedSection(sec); setUserAnswers({}); setScreen('taking') }}
        onBack={() => { setSelectedTest(null); setScreen('select-test') }}
      />
    )
  }

  return (
    <SelectTest
      onSelect={t => { setSelectedTest(t); setScreen('select-section') }}
    />
  )
}
