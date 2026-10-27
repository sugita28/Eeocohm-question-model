import { useState, useMemo, useRef } from 'react';
import { QUESTIONS, CHAPTERS } from '../data/questions';
import { useGame } from '../context/GameContext';
import { renderMarkdown } from '../utils/markdown';

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '[Code block]')
    .replace(/\|.+\|/g, '')
    .replace(/[*#`]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 300);
}

export default function FlashcardsPage() {
  const { addXp } = useGame();

  const [chapterFilter, setChapterFilter] = useState('all');
  const [typeFilter, setTypeFilter]       = useState('all');
  const [deck, setDeck]                   = useState(null);
  const [cardIndex, setCardIndex]         = useState(0);
  const [flipped, setFlipped]             = useState(false);
  const [knewIt, setKnewIt]               = useState(0);
  const [stillLearning, setStillLearning] = useState(0);
  const [done, setDone]                   = useState(false);
  const [xpGained, setXpGained]           = useState(0);
  const cardRef = useRef(null);

  const allQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      if (chapterFilter !== 'all' && q.chapterId !== parseInt(chapterFilter)) return false;
      if (typeFilter !== 'all' && q.type !== typeFilter) return false;
      return true;
    });
  }, [chapterFilter, typeFilter]);

  const startDeck = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCardIndex(0);
    setFlipped(false);
    setKnewIt(0);
    setStillLearning(0);
    setDone(false);
    setXpGained(0);
  };

  const flipCard = () => setFlipped(p => !p);

  const handleResult = (knew) => {
    const xpForThis = knew ? 20 : 5;
    setXpGained(p => p + xpForThis);
    addXp(xpForThis);
    if (knew) setKnewIt(p => p + 1);
    else setStillLearning(p => p + 1);

    if (cardIndex + 1 >= deck.length) {
      setDone(true);
    } else {
      setCardIndex(p => p + 1);
      setFlipped(false);
    }
  };

  const currentCard = deck ? deck[cardIndex] : null;
  const currentChapter = currentCard ? CHAPTERS.find(c => c.id === currentCard.chapterId) : null;
  const progress = deck ? Math.round((cardIndex / deck.length) * 100) : 0;

  // ── Setup screen ──
  if (!deck) {
    return (
      <main>
        <div className="page-container" style={{ paddingTop: 48 }}>
          <h1 className="section-title">🃏 Flashcard Mode</h1>
          <p className="section-subtitle">
            Flip cards to reveal answers. Earn XP for every card you know!
          </p>

          {/* Config */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: 32, maxWidth: 560, marginBottom: 40
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Customize Your Deck</h2>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: 8 }}>
                CHAPTER
              </label>
              <select
                id="flashcard-chapter"
                className="filter-select"
                style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
                value={chapterFilter}
                onChange={e => setChapterFilter(e.target.value)}
              >
                <option value="all">All Chapters ({allQuestions.length} cards)</option>
                {CHAPTERS.map(ch => (
                  <option key={ch.id} value={ch.id}>
                    {ch.icon} {ch.name} ({QUESTIONS.filter(q => q.chapterId === ch.id).length} cards)
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: 8 }}>
                QUESTION TYPE
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[['all', 'All'], ['mcq', 'MCQ'], ['short', 'Short'], ['long', 'Long']].map(([v, l]) => (
                  <button
                    key={v}
                    className={`filter-chip ${typeFilter === v ? 'active' : ''}`}
                    onClick={() => setTypeFilter(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(124,111,247,0.08)', border: '1px solid var(--border-bright)',
              borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <span style={{ fontSize: 28 }}>📦</span>
              <div>
                <div style={{ fontWeight: 700 }}>{allQuestions.length} cards in this deck</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  Earn up to {allQuestions.length * 20} XP if you know them all!
                </div>
              </div>
            </div>

            <button
              id="start-flashcards-btn"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              onClick={startDeck}
              disabled={allQuestions.length === 0}
            >
              🚀 Start Flashcards
            </button>
          </div>

          {/* How it works */}
          <div style={{ maxWidth: 560 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-secondary)' }}>
              HOW IT WORKS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['1', '🎴', 'Flip the card', 'Click the card to reveal the model answer'],
                ['2', '✅', 'Knew it?', 'Get 20 XP if you already knew the answer'],
                ['3', '📖', 'Still learning?', 'Get 5 XP — keep going, you\'re making progress!'],
                ['4', '⚡', 'Earn XP', 'Level up and track your mastery over time'],
              ].map(([n, icon, title, desc]) => (
                <div key={n} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  padding: '14px 16px', background: 'var(--bg-card)',
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-md)'
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Done screen ──
  if (done) {
    const total = deck.length;
    const pct = Math.round((knewIt / total) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '🎯' : '💪';
    return (
      <main>
        <div className="page-container">
          <div className="flashcard-complete">
            <div className="flashcard-complete-emoji">{emoji}</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              Deck Complete!
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
              You went through all {total} cards
            </p>
            <div className="flashcard-score">{pct}%</div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>accuracy</p>
            <div className="xp-earned">⚡ +{xpGained} XP earned!</div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: '16px 0 32px', fontSize: 15 }}>
              <span style={{ color: 'var(--accent-green)' }}>✅ Knew it: {knewIt}</span>
              <span style={{ color: 'var(--accent-pink)' }}>📖 Learning: {stillLearning}</span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={startDeck}>🔄 Shuffle & Replay</button>
              <button className="btn btn-secondary" onClick={() => setDeck(null)}>⚙️ Change Deck</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Card screen ──
  return (
    <main>
      <div className="page-container" style={{ paddingTop: 40 }}>
        <div className="flashcard-mode">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 640, marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
              Card {cardIndex + 1} of {deck.length}
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
              <span style={{ color: 'var(--accent-green)' }}>✅ {knewIt}</span>
              <span style={{ color: 'var(--accent-pink)' }}>📖 {stillLearning}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flashcard-progress" style={{ width: '100%', maxWidth: 640 }}>
            <div className="flashcard-progress-bar" style={{ flex: 1 }}>
              <div className="flashcard-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>{progress}%</span>
          </div>

          {/* Card */}
          <div className="flashcard-scene" onClick={flipCard} ref={cardRef} role="button"
            tabIndex={0} onKeyDown={e => e.key === 'Enter' && flipCard()}
            aria-label={flipped ? 'Answer side' : 'Question side — click to flip'}
          >
            <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
              {/* Front */}
              <div className="flashcard-face flashcard-front">
                <div className="flashcard-hint">
                  {currentCard.type === 'mcq' ? '🔘 MCQ QUESTION' : '❓ QUESTION'} — Click to reveal answer
                </div>
                <div className="flashcard-question">{currentCard.question}</div>
                {currentCard.type === 'mcq' && currentCard.options && (
                  <div style={{ marginTop: 16, width: '100%' }}>
                    {currentCard.options.map((opt, i) => (
                      <div key={i} style={{
                        padding: '8px 14px', margin: '4px 0',
                        background: 'rgba(255,255,255,0.05)', borderRadius: 8,
                        fontSize: 13, textAlign: 'left'
                      }}>
                        {['A','B','C','D'][i]}. {opt}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flashcard-chapter-tag">
                  {currentChapter?.icon} {currentChapter?.short}
                  <span style={{ marginLeft: 8, opacity: 0.7 }}>· {currentCard.marks}m</span>
                </div>
              </div>

              {/* Back */}
              <div className="flashcard-face flashcard-back">
                <div className="flashcard-hint">✅ MODEL ANSWER</div>
                <div
                  className="flashcard-answer md-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(stripMarkdown(currentCard.answer)) }}
                />
              </div>
            </div>
          </div>

          {/* Result buttons */}
          {flipped && (
            <div className="flashcard-result-btns fade-in">
              <button className="btn-still-learning" onClick={() => handleResult(false)}>
                📖 Still Learning (+5 XP)
              </button>
              <button className="btn-knew-it" onClick={() => handleResult(true)}>
                ✅ Knew It! (+20 XP)
              </button>
            </div>
          )}

          {/* Navigation hint */}
          {!flipped && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>
              💡 Click or press Enter to flip the card
            </p>
          )}

          {/* Skip */}
          <button
            className="btn btn-ghost"
            style={{ marginTop: 16 }}
            onClick={() => handleResult(false)}
          >
            Skip →
          </button>
        </div>
      </div>
    </main>
  );
}
