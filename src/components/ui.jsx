import React from 'react'

// ── Badge ──────────────────────────────────────────────
const badgeStyles = {
  'not-started': { bg: 'var(--red-light)',   color: 'var(--red-mid)' },
  'in-progress': { bg: 'var(--amber-light)', color: 'var(--amber-mid)' },
  'done':        { bg: 'var(--green-light)', color: 'var(--green-mid)' },
  'weak':        { bg: 'var(--red-light)',   color: 'var(--red-mid)' },
  'review':      { bg: 'var(--amber-light)', color: 'var(--amber-mid)' },
  'good':        { bg: 'var(--green-light)', color: 'var(--green-mid)' },
  'ED':          { bg: 'var(--blue-light)',  color: 'var(--blue-mid)' },
  'EA':          { bg: 'var(--green-light)', color: 'var(--green-mid)' },
  'Early':       { bg: 'var(--green-light)', color: 'var(--green-mid)' },
  'Regular':     { bg: '#f1f1f1',            color: '#555' },
  'deciding':    { bg: 'var(--amber-light)', color: 'var(--amber-mid)' },
  'yes':         { bg: 'var(--green-light)', color: 'var(--green-mid)' },
  'no':          { bg: '#f1f1f1',            color: '#555' },
}

const badgeLabels = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  'done':        'Done',
  'weak':        'Weak',
  'review':      'Review',
  'good':        'Good',
  'deciding':    'Deciding',
  'yes':         'Yes',
  'no':          'No',
}

export function Badge({ type, label }) {
  const s = badgeStyles[type] || { bg: '#f1f1f1', color: '#555' }
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, padding: '3px 10px',
      borderRadius: 'var(--radius-sm)', fontWeight: 500,
      background: s.bg, color: s.color,
    }}>
      {label || badgeLabels[type] || type}
    </span>
  )
}

// ── Metric card ─────────────────────────────────────────
export function Metric({ label, value, sub }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)',
      padding: '14px 16px', border: '0.5px solid var(--border)',
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)' }}>{value ?? '—'}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

// ── Card ────────────────────────────────────────────────
export function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--bg)', border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '18px 20px',
      marginBottom: 12, ...style,
    }}>
      {children}
    </div>
  )
}

// ── Section label ───────────────────────────────────────
export function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
      letterSpacing: '0.8px', color: 'var(--text-secondary)', marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

// ── Progress bar row ────────────────────────────────────
const progressColors = { weak: '#e24b4a', review: '#ef9f27', good: '#63a022', default: 'var(--blue)' }

export function ProgressRow({ label, pct, status }) {
  const color = progressColors[status] || progressColors.default
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{ fontSize: 13, color: 'var(--text)', minWidth: 200 }}>{label}</div>
      <div style={{ flex: 1, height: 6, background: 'var(--bg-secondary)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.4s' }} />
      </div>
      <div style={{ minWidth: 90, textAlign: 'right' }}><Badge type={status} /></div>
    </div>
  )
}

// ── Days counter ────────────────────────────────────────
export function daysUntil(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / 86400000)
  return diff > 0 ? diff : 0
}

// ── Empty state ─────────────────────────────────────────
export function Empty({ message }) {
  return (
    <div style={{
      fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center',
      padding: '28px 20px', background: 'var(--bg)',
      border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)',
      marginBottom: 12,
    }}>
      {message}
    </div>
  )
}
