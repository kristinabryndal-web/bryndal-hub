import React, { useState, useEffect } from 'react'
import { practiceQuestions, categories } from '../data/actPractice.js'

const categoryColors = {
  'Functions':                      { bg: '#1a2a4a', color: '#7aaeff' },
  'Integrating Essential Skills':   { bg: '#1a3a1a', color: '#6ddb8a' },
  'Number & Quantity':              { bg: '#2a1f00', color: '#f0b429' },
  'Statistics & Probability':       { bg: '#2d1a4d', color: '#c49af5' },
  'Conventions of Standard English':{ bg: '#2e1212', color: '#f07070' },
}

export default function Practice() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentIndex, setCurrentIndex]         = useState(0)
  const [chosen, setChosen]                     = useState(null)
  const [showExplanation, setShowExplanation]   = useState(false)
  const [score, setScore]                       = useState({ correct: 0, total: 0 })
  const [sessionResults, setSessionResults]     = useState([])

  const filtered = selectedCategory === 'All'
    ? practiceQuestions
    : practiceQuestions.filter(q => q.category === selectedCategory)

  const q = filtered[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
    setChosen(null)
    setShowExplanation(false)
  }, [selectedCategory])

  function handleChoice(letter) {
    if (chosen) return
    setChosen(letter)
    const correct = letter === q.answer
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    setSessionResults(r => [...r, { id: q.id, category: q.category, correct }])
  }

  function next() {
    setCurrentIndex(i => (i + 1) % filtered.length)
    setChosen(null)
    setShowExplanation(false)
  }

  function reset() {
    setCurrentIndex(0)
    setChosen(null)
    setShowExplanation(false)
    setScore({ correct: 0, total: 0 })
    setSessionResults([])
  }

  const cc = categoryColors[q?.category] || { bg: '#2a2a2e', color: '#aaa' }
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : null

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>Practice Questions</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {score.total > 0 && (
            <span style={{ fontSize: 13, color: pct >= 70 ? 'var(--green-mid)' : 'var(--red-mid)', fontWeight: 600 }}>
              {score.correct}/{score.total} correct ({pct}%)
            </span>
          )}
          <button onClick={reset} style={{
            fontSize: 12, padding: '5px 12px', borderRadius: 6,
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text-secondary)', cursor: 'pointer',
          }}>Reset</button>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {['All', ...categories].map(cat => {
          const c = categoryColors[cat] || { bg: 'var(--border-hover)', color: 'var(--text)' }
          const active = selectedCategory === cat
          return (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              fontSize: 11, padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontWeight: 500, transition: 'all 0.15s',
              background: active ? (cat === 'All' ? 'var(--blue)' : c.bg) : 'var(--bg-card)',
              color: active ? (cat === 'All' ? '#fff' : c.color) : 'var(--text-secondary)',
              outline: active ? `1px solid ${cat === 'All' ? 'var(--blue)' : c.color}` : '1px solid var(--border)',
            }}>
              {cat === 'All' ? `All (${practiceQuestions.length})` : `${cat.split(' ')[0]}… (${practiceQuestions.filter(q => q.category === cat).length})`}
            </button>
          )
        })}
      </div>

      {/* Question card */}
      {q && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>

          {/* Question header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600, background: cc.bg, color: cc.color }}>{q.category}</span>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{q.difficulty}</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{currentIndex + 1} / {filtered.length}</span>
          </div>

          {/* Question body */}
          <div style={{ padding: '24px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', lineHeight: 1.7, marginBottom: 24, whiteSpace: 'pre-line' }}>
              {q.question}
            </div>

            {/* Answer choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.choices.map(choice => {
                const letter = choice[0]
                const isChosen  = chosen === letter
                const isCorrect = letter === q.answer
                const revealed  = !!chosen

                let bg = 'var(--bg)'
                let border = '1px solid var(--border)'
                let color = 'var(--text)'

                if (revealed && isCorrect) {
                  bg = '#0f2318'; border = '1px solid var(--green-mid)'; color = 'var(--green-mid)'
                } else if (revealed && isChosen && !isCorrect) {
                  bg = '#2e1212'; border = '1px solid var(--red-mid)'; color = 'var(--red-mid)'
                } else if (!revealed) {
                  bg = 'var(--bg)'
                }

                return (
                  <button key={letter} onClick={() => handleChoice(letter)} style={{
                    textAlign: 'left', padding: '12px 16px', borderRadius: 8,
                    border, background: bg, color, cursor: revealed ? 'default' : 'pointer',
                    fontSize: 14, lineHeight: 1.5, fontFamily: 'inherit', transition: 'all 0.15s',
                  }}>
                    {choice}
                    {revealed && isCorrect && <span style={{ marginLeft: 8, fontSize: 12 }}>✓</span>}
                    {revealed && isChosen && !isCorrect && <span style={{ marginLeft: 8, fontSize: 12 }}>✗</span>}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {chosen && (
              <div style={{ marginTop: 20 }}>
                <button onClick={() => setShowExplanation(s => !s)} style={{
                  fontSize: 12, padding: '6px 14px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'transparent',
                  color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: showExplanation ? 12 : 0,
                }}>
                  {showExplanation ? 'Hide' : 'Show'} explanation
                </button>
                {showExplanation && (
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {q.explanation}
                  </div>
                )}
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                  <button onClick={next} style={{
                    fontSize: 13, padding: '8px 24px', borderRadius: 8,
                    border: 'none', background: 'var(--blue)', color: 'white',
                    cursor: 'pointer', fontWeight: 600,
                  }}>
                    {currentIndex + 1 === filtered.length ? 'Restart →' : 'Next →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Session breakdown */}
      {sessionResults.length > 0 && (
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sessionResults.map((r, i) => (
            <div key={i} title={r.category} style={{
              width: 24, height: 24, borderRadius: 4, fontSize: 11, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: r.correct ? '#0f2318' : '#2e1212',
              color: r.correct ? 'var(--green-mid)' : 'var(--red-mid)',
              border: `1px solid ${r.correct ? 'var(--green-mid)' : 'var(--red-mid)'}`,
            }}>
              {r.correct ? '✓' : '✗'}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
