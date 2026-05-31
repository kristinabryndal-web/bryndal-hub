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
  'Regular':     { bg: '#2a2a2e',            color: '#888' },
  'RD':          { bg: '#2a2a2e',            color: '#888' },
  'deciding':    { bg: 'var(--amber-light)', color: 'var(--amber-mid)' },
  'yes':         { bg: 'var(--green-light)', color: 'var(--green-mid)' },
  'no':          { bg: '#2a2a2e',            color: '#888' },
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
  const s = badgeStyles[type] || { bg: '#2a2a2e', color: '#888' }
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
      background: 'var(--bg-card)', borderRadius: 'var(--radius-md)',
      padding: '16px 18px', border: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.5px' }}>{value ?? '—'}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

// ── Card ────────────────────────────────────────────────
export function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
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
      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '1px', color: 'var(--text-tertiary)', marginBottom: 12, marginTop: 8,
    }}>
      {children}
    </div>
  )
}

// ── Progress bar row ────────────────────────────────────
const progressColors = { weak: '#e24b4a', review: '#ef9f27', good: '#4ade80', default: 'var(--blue)' }

export function ProgressRow({ label, pct, status }) {
  const color = progressColors[status] || progressColors.default
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{ fontSize: 13, color: 'var(--text)', minWidth: 200 }}>{label}</div>
      <div style={{ flex: 1, height: 5, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
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
      padding: '32px 20px', background: 'var(--bg-card)',
      border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
      marginBottom: 12,
    }}>
      {message}
    </div>
  )
}
