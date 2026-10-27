import { useEffect, useRef } from 'react';
import { QUESTIONS, CHAPTERS } from '../data/questions';

const PREDICTIONS = [
  {
    topic: 'C Programming Fundamentals',
    chapter: 'Programming II',
    confidence: 90,
    level: 'high',
    desc: 'Loops, arrays, functions, and pointers appear every year. Expect at least 2-3 questions (8-10 marks each).',
    tags: ['C', 'arrays', 'loops', 'pointers'],
  },
  {
    topic: 'SQL Queries & Database Design',
    chapter: 'DBMS Concepts',
    confidence: 85,
    level: 'high',
    desc: 'SQL DDL/DML commands, normalization, and keys are perennial favorites across all exam formats.',
    tags: ['SQL', 'normalization', 'keys'],
  },
  {
    topic: 'JavaScript / PHP Web Tasks',
    chapter: 'Web Technology II',
    confidence: 70,
    level: 'med',
    desc: 'Web tech coding tasks have appeared in 3 of the last 4 papers (2079–2082). Expect function writing or form handling.',
    tags: ['JavaScript', 'PHP', 'DOM', 'form'],
  },
  {
    topic: 'SDLC Models',
    chapter: 'Software Process',
    confidence: 75,
    level: 'med',
    desc: 'Waterfall vs Agile comparison or phase explanation appears almost every year as a short answer.',
    tags: ['SDLC', 'waterfall', 'agile'],
  },
  {
    topic: 'AI, IoT & Cloud Computing',
    chapter: 'Recent ICT Trends',
    confidence: 65,
    level: 'med',
    desc: 'Emerging tech questions (AI applications, IaaS/PaaS/SaaS) featured in 2079, 2080, 2081, 2082.',
    tags: ['AI', 'IoT', 'cloud'],
  },
  {
    topic: 'OOP Concepts & C++ Classes',
    chapter: 'OOP Concepts',
    confidence: 50,
    level: 'low',
    desc: 'Fewer past questions (only 7 recorded) but constructors and four pillars are popular short-answer topics.',
    tags: ['OOP', 'C++', 'constructor'],
  },
];

const YEAR_DATA = [
  { year: 2078, mcq: 0, short: 5, long: 5, total: 10 },
  { year: 2079, mcq: 9, short: 4, long: 3, total: 16 },
  { year: 2080, mcq: 5, short: 5, long: 2, total: 12 },
  { year: 2081, mcq: 5, short: 5, long: 3, total: 13 },
  { year: 2082, mcq: 5, short: 6, long: 3, total: 14 },
];

function AnimatedBar({ value, max, color, delay = 0 }) {
  const barRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.width = `${(value / max) * 100}%`;
      }
    }, 200 + delay);
    return () => clearTimeout(timer);
  }, [value, max, delay]);
  return (
    <div className="bar-track">
      <div
        ref={barRef}
        className="bar-fill"
        style={{ width: 0, background: color }}
      >
        {value > 3 && <span>{value}Q</span>}
      </div>
    </div>
  );
}

export default function TrendsPage() {
  const maxQ = Math.max(...CHAPTERS.map(c => c.questionCount));

  return (
    <main>
      <div className="page-container" style={{ paddingTop: 40 }}>
        <h1 className="section-title">📊 Exam Insights & Predictions</h1>
        <p className="section-subtitle">
          Data-driven analysis of NEB past papers 2078–2082 BS with confidence-ranked predictions
        </p>

        {/* Chapter Frequency Chart */}
        <div className="trends-section">
          <div className="chart-container">
            <div className="chart-title">📈 Question Frequency by Chapter (2078–2082 BS)</div>
            <div className="bar-chart">
              {CHAPTERS.map((ch, i) => (
                <div key={ch.id} className="bar-row">
                  <div className="bar-label">{ch.icon} {ch.short}</div>
                  <AnimatedBar value={ch.questionCount} max={maxQ} color={ch.color} delay={i * 80} />
                  <div className="bar-count">{ch.questionCount}</div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20, padding: '14px 16px',
              background: 'rgba(124,111,247,0.07)',
              border: '1px solid var(--border-bright)',
              borderRadius: 'var(--radius-sm)', fontSize: 13,
              color: 'var(--text-secondary)', lineHeight: 1.6
            }}>
              💡 <strong style={{ color: 'var(--text-primary)' }}>Key insight:</strong>{' '}
              Programming II dominates with 22 questions (~29% of all questions).
              Web Tech II and DBMS are tied at 14 each. OOP is the least-tested chapter (7 Qs).
            </div>
          </div>
        </div>

        {/* Year-over-year question type breakdown */}
        <div className="trends-section">
          <h2 className="section-title">📅 Year-over-Year Question Mix</h2>
          <p className="section-subtitle">How exam format has evolved — note the shift toward MCQs from 2079 onward</p>
          <div className="chart-container">
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%', borderCollapse: 'collapse', fontSize: 14,
                minWidth: 500
              }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid var(--border)', fontWeight: 700 }}>Year (BS)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '2px solid var(--border)', color: 'var(--accent-teal)' }}>MCQ (1m)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '2px solid var(--border)', color: 'var(--accent-purple)' }}>Short (5m)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '2px solid var(--border)', color: 'var(--accent-pink)' }}>Long (8-10m)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '2px solid var(--border)', color: 'var(--accent-gold)' }}>Total Qs</th>
                  </tr>
                </thead>
                <tbody>
                  {YEAR_DATA.map((row, i) => (
                    <tr key={row.year} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700, borderBottom: '1px solid var(--border)' }}>
                        {row.year} BS
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border)', color: 'var(--accent-teal)' }}>
                        {row.mcq || '—'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border)', color: 'var(--accent-purple)' }}>
                        {row.short}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border)', color: 'var(--accent-pink)' }}>
                        {row.long}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
              ⚠️ Note: 2078 had no MCQ section — all long-answer programming questions (10m each).
              MCQs were introduced in 2079 and have been consistent since.
            </div>
          </div>
        </div>

        {/* Predictions */}
        <h2 className="section-title">🔮 Predictions for Next Exam</h2>
        <p className="section-subtitle">Based on frequency analysis of 30+ past questions with confidence ratings</p>
        <div className="predictions-grid">
          {PREDICTIONS.map((p, i) => (
            <div key={i} className="prediction-card">
              <div className="prediction-confidence">
                <span className={`confidence-label confidence-${p.level}`}>
                  {p.level === 'high' ? '🔴 High' : p.level === 'med' ? '🟡 Medium' : '🔵 Lower'} Confidence
                </span>
                <span className={`confidence-pct confidence-${p.level}`}>{p.confidence}%</span>
              </div>
              <div className="confidence-bar">
                <div
                  className="confidence-bar-fill"
                  style={{
                    width: `${p.confidence}%`,
                    background: p.level === 'high' ? 'var(--accent-green)' :
                                p.level === 'med' ? 'var(--accent-gold)' : 'var(--accent-teal)'
                  }}
                />
              </div>
              <div className="prediction-topic">{p.topic}</div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8
              }}>
                {p.chapter}
              </div>
              <div className="prediction-desc">{p.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 12 }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 99,
                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                    color: 'var(--text-muted)', fontWeight: 600
                  }}>#{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mark distribution */}
        <div className="trends-section">
          <h2 className="section-title">⭐ Mark Distribution</h2>
          <p className="section-subtitle">How total exam marks are typically distributed across question types</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 60 }}>
            {[
              { label: 'MCQ Questions', marks: '9–10 marks', pct: 9, color: 'var(--accent-teal)', desc: '9 × 1 mark questions (2079 onward)' },
              { label: 'Short Answer', marks: '25–30 marks', pct: 30, color: 'var(--accent-purple)', desc: '5–6 × 5 mark questions, theory + small code' },
              { label: 'Long / Programming', marks: '20–24 marks', pct: 24, color: 'var(--accent-pink)', desc: '2–3 × 8-10 mark full programs / essays' },
            ].map(item => (
              <div key={item.label} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: 22
              }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: item.color, marginBottom: 4 }}>
                  {item.marks}
                </div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Study tips */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,111,247,0.12), rgba(38,198,218,0.08))',
          border: '1px solid var(--border-bright)',
          borderRadius: 'var(--radius-lg)', padding: 32, marginBottom: 60
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>🎯 Top Study Tips for NEB CS</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['⚙️', 'Master C Programming', 'Chapter 4 is 29% of all questions. Practice loops, arrays, functions, pointers, struct, and file I/O daily.'],
              ['🗄️', 'Learn SQL by writing code', 'Don\'t just memorize — write CREATE, INSERT, SELECT, JOIN queries by hand. Use DBMS concepts for theory.'],
              ['🌐', 'Practice JS & PHP snippets', 'Web tech coding tasks are predictable — even/odd checker, factorial, form handling, DOM manipulation.'],
              ['📊', 'Know SDLC cold', 'Waterfall vs Agile comparison is an easy 5 marks. Memorize phases and advantages/disadvantages of each model.'],
              ['🚀', 'Study ICT Trends broadly', 'AI, Cloud (IaaS/PaaS/SaaS), IoT, Cybersecurity — know definitions and 5 real examples of each.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
