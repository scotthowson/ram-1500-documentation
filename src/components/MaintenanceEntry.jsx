import React, { useState } from 'react';
const orangePrimary = '#ff6b35';       // your main orange
const orangeLight = '#ff8a5b';         // lighter orange
const orangeGlow = 'rgba(255, 107, 53, 0.5)'; // glow for box shadows

const styles = {
  details: {
    margin: '1.5rem 0',
    borderRadius: '12px',
    padding: '1.5rem 1.75rem',
    background: 'linear-gradient(135deg, #1f2937, #111827)', // dark gradient
    color: '#f9fafb',
    boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  detailsOpen: {
    boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
  },
  summary: {
    fontWeight: '700',
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    userSelect: 'none',
    paddingBottom: '0.25rem',
    borderBottom: '2px solid transparent',
    transition: 'border-color 0.3s ease, color 0.3s ease',
  },
  summaryHover: {
    borderBottomColor: orangePrimary,
    color: orangeLight,
  },
  emoji: {
    fontSize: '1.5rem',
    color: orangePrimary,
  },
  toggleIcon: {
    marginLeft: 'auto',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: orangeLight,
    transition: 'transform 0.3s ease',
  },
  toggleIconOpen: {
    transform: 'rotate(90deg)',
  },
  content: {
    marginTop: '1rem',
    lineHeight: '1.6',
    fontSize: '1.1rem',
    color: '#e5e7eb',
    maxHeight: '1000px',
    transition: 'max-height 0.4s ease, opacity 0.4s ease',
    opacity: 1,
  },
  tagsContainer: {
    marginTop: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: '#d1d5db',
  },
  tagLabel: {
    fontWeight: '700',
    color: orangeLight,
    marginRight: '0.75rem',
    letterSpacing: '0.1em',
  },
  tag: {
    backgroundColor: '#374151',
    borderRadius: '9999px',
    padding: '0.3rem 0.9rem',
    fontFamily: "'Fira Mono', monospace",
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    userSelect: 'text',
    boxShadow: `inset 0 0 5px ${orangeGlow}`,
    transition: 'background-color 0.3s ease',
  },
  tagHover: {
    backgroundColor: orangePrimary,
    color: '#1f2937',
    boxShadow: 'none',
  },
};

export default function MaintenanceEntry({ date, title, tags = [], children }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [tagHoverIndex, setTagHoverIndex] = useState(null);

  return (
    <details
      open={open}
      onToggle={() => setOpen(!open)}
      style={{
        ...styles.details,
        ...(open ? styles.detailsOpen : {}),
      }}
    >
      <summary
        style={{
          ...styles.summary,
          ...(hover ? styles.summaryHover : {}),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span role="img" aria-label="calendar" style={styles.emoji}>
          📅
        </span>
        <span>{date} — {title}</span>
        <span
          style={{
            ...styles.toggleIcon,
            ...(open ? styles.toggleIconOpen : {}),
          }}
        >
          ▶
        </span>
      </summary>

      <div style={styles.content}>{children}</div>

      {tags.length > 0 && (
        <div style={styles.tagsContainer}>
          <strong style={styles.tagLabel}>Tags:</strong>
          {tags.map((tag, i) => (
            <span
              key={tag}
              style={{
                ...styles.tag,
                ...(tagHoverIndex === i ? styles.tagHover : {}),
              }}
              onMouseEnter={() => setTagHoverIndex(i)}
              onMouseLeave={() => setTagHoverIndex(null)}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </details>
  );
}
