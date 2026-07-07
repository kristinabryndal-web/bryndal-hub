import React, { useState } from 'react'
import { Card, SectionLabel } from './ui.jsx'

// ── Single quiz question ────────────────────────────────
function QuizQuestion({ q, index, total, onAnswered }) {
  const [picked, setPicked] = useState(null)

  function pick(ci) {
    if (picked !== null) return
    setPicked(ci)
    onAnswered(ci === q.correct)
  }

  return (
    <Card>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8 }}>
        Question {index + 1} / {total}
      </div>

      {q.passage && (
        <div style={{
          fontSize: 13.5, color: 'var(--text-secondary)', background: 'var(--bg-secondary)',
          borderLeft: '3px solid var(--border-hover)', padding: '10px 12px', marginBottom: 12,
          borderRadius: '0 6px 6px 0', lineHeight: 1.5,
        }}>
          {q.passage}
        </div>
      )}

      <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>
        {q.question}
      </div>

      {q.image && (
        <div style={{ marginBottom: 12, textAlign: 'center' }}>
          <img
            src={q.image}
            alt="Figure for this question"
            style={{
              maxWidth: '100%', height: 'auto', borderRadius: 6,
              border: '1px solid var(--border)', background: 'white', padding: 8,
            }}
          />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {q.choices.map((choice, ci) => {
          let bg = 'var(--bg-secondary)'
          let border = 'var(--border)'
          let color = 'var(--text)'
          let weight = 400

          if (picked !== null) {
            if (ci === q.correct) {
              bg = 'var(--green-light)'; border = 'var(--green-mid)'; color = 'var(--green-mid)'; weight = 600
            } else if (ci === picked) {
              bg = 'var(--red-light)'; border = 'var(--red-mid)'; color = 'var(--red-mid)'; weight = 600
            }
          }

          return (
            <button
              key={ci}
              onClick={() => pick(ci)}
              disabled={picked !== null}
              style={{
                textAlign: 'left', fontSize: 14, padding: '9px 12px', borderRadius: 6,
                border: `1px solid ${border}`, background: bg, color,
                fontWeight: weight, fontFamily: 'inherit', cursor: picked === null ? 'pointer' : 'default',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              {String.fromCharCode(65 + ci)}. {choice}
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div style={{
          marginTop: 10, fontSize: 13.5, color: 'var(--text-secondary)',
          background: 'var(--bg-secondary)', borderRadius: 6, padding: '10px 12px', lineHeight: 1.5,
        }}>
          {q.explain}
        </div>
      )}
    </Card>
  )
}

// ── Quiz set: score header + list of questions ──────────
export function PracticeQuiz({ title, subtitle, questions }) {
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  function handleAnswered(isCorrect) {
    setAnsweredCount(c => c + 1)
    if (isCorrect) setCorrectCount(c => c + 1)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
          {correctCount} / {questions.length}
        </div>
      </div>
      {subtitle && (
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>{subtitle}</div>
      )}
      {questions.map((q, i) => (
        <QuizQuestion key={i} q={q} index={i} total={questions.length} onAnswered={handleAnswered} />
      ))}
    </div>
  )
}
