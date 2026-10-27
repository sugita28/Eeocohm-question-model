import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { QUESTIONS, CHAPTERS, STATS } from '../data/questions';
import { useGame } from '../context/GameContext';
import QuestionModal from '../components/QuestionModal';

function XpBar() {
  const { xp, level, levelName, levelProgress, nextThreshold } = useGame();
  return (
    <div className="xp-bar-section">
      <div className="xp-avatar">🎓</div>
      <div className="xp-info">
        <div className="xp-level">Level {level} · {levelName}</div>
        <div className="xp-bar-bg">
          <div className="xp-bar-fill" style={{ width: `${levelProgress}%` }} />
        </div>
        <div className="xp-text">{xp} XP · {nextThreshold - xp} XP to next level</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--accent-gold)' }}>{xp}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL XP</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [selectedQ, setSelectedQ] = useState(null);
  const { bookmarks } = useGame();

  // Featured questions: most marks, most recent
  const featured = useMemo(() => {
    return [...QUESTIONS]
      .sort((a, b) => b.marks - a.marks || b.year - a.year)
      .slice(0, 6);
  }, []);

  const statCards = [
    { label: 'Total Questions', value: QUESTIONS.length, color: 'var(--accent-purple)' },
    { label: 'Chapters', value: CHAPTERS.length, color: 'var(--accent-teal)' },
    { label: 'Years Covered', value: '5', color: 'var(--accent-pink)' },
    { label: 'Bookmarked', value: bookmarks.length, color: 'var(--accent-gold)' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="page-container">
          <div className="hero-badge">
            📚 NEB Class 12 Computer Science · 2078–2082 BS
          </div>
          <h1>
            Master NEB CS with<br />
            <span className="gradient-text">Gamified Learning</span>
          </h1>
          <p className="hero-subtitle">
            30+ past exam questions, model answers, interactive flashcards, and
            AI-powered predictions — all in one place.
          </p>
          <div className="hero-cta">
            <Link to="/questions" className="btn btn-primary">
              📚 Browse Questions
            </Link>
            <Link to="/flashcards" className="btn btn-secondary">
              🃏 Start Flashcards
            </Link>
          </div>
        </div>
      </section>

      <div className="page-container">
        {/* XP Bar */}
        <XpBar />

        {/* Stats */}
        <div className="stats-row">
          {statCards.map(s => (
            <div key={s.label} className="stat-card" style={{ '--color': s.color }}>
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chapters */}
        <h2 className="section-title">📖 Chapters</h2>
        <p className="section-subtitle">7 chapters aligned with NEB syllabus — tap to filter questions</p>
        <div className="chapter-grid">
          {CHAPTERS.map(ch => {
            const chQs = QUESTIONS.filter(q => q.chapterId === ch.id);
            const pct = Math.round((ch.questionCount / 22) * 100);
            return (
              <Link
                key={ch.id}
                to={`/questions?chapter=${ch.id}`}
                className="chapter-card"
                style={{ '--ch-color': ch.color }}
              >
                <div className="chapter-card-header">
                  <div className="chapter-icon" style={{ '--ch-color': ch.color }}>
                    {ch.icon}
                  </div>
                  <span className="chapter-q-count">{ch.questionCount} Qs</span>
                </div>
                <div className="chapter-name">{ch.name}</div>
                <div className="chapter-short">{ch.short}</div>
                <div className="chapter-progress-bar">
                  <div
                    className="chapter-progress-fill"
                    style={{ width: `${pct}%`, background: ch.color }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Questions */}
        <h2 className="section-title">🔥 High-Value Questions</h2>
        <p className="section-subtitle">Top-mark questions from recent NEB papers</p>
        <div className="questions-grid">
          {featured.map(q => {
            const ch = CHAPTERS.find(c => c.id === q.chapterId);
            return (
              <div key={q.id} className="question-card" onClick={() => setSelectedQ(q)} role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedQ(q)}>
                <div className="question-card-header">
                  <span className={`q-badge ${q.type}`}>{q.type.toUpperCase()}</span>
                  <span className="q-badge year">{q.year}</span>
                  <span className="q-badge marks">⭐ {q.marks}m</span>
                  {q.isCode && <span className="q-badge code">{'</>'}</span>}
                  <span style={{ marginLeft: 'auto', fontSize: 14, color: ch?.color }}>{ch?.icon}</span>
                </div>
                <div className="question-text">{q.question}</div>
                <div className="question-meta">
                  <span className="question-topic" style={{ color: ch?.color }}>{ch?.short}</span>
                  <span className="question-topic">· {q.topic}</span>
                  {q.subtopic && <span className="question-topic" style={{ opacity: 0.6 }}>· {q.subtopic}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,111,247,0.12), rgba(240,98,146,0.08))',
          border: '1px solid var(--border-bright)',
          borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center', marginBottom: 60
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🃏</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Ready to ace the exam?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Practice with flashcards, earn XP, and track your progress.
          </p>
          <Link to="/flashcards" className="btn btn-primary">
            Start Flashcard Mode
          </Link>
        </div>
      </div>

      {selectedQ && <QuestionModal question={selectedQ} onClose={() => setSelectedQ(null)} />}
    </main>
  );
}
