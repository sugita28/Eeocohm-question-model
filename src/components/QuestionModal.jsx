import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { QUESTIONS, CHAPTERS } from '../data/questions';
import { renderMarkdown } from '../utils/markdown';

const LETTERS = ['A', 'B', 'C', 'D'];

function AnswerDisplay({ answer }) {
  const html = renderMarkdown(answer);
  return (
    <div
      className="answer-content md-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function QuestionModal({ question, onClose }) {
  const { addXp, toggleBookmark, bookmarks, markViewed } = useGame();
  const [revealed, setRevealed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [xpAdded, setXpAdded] = useState(false);

  const chapter = CHAPTERS.find(c => c.id === question.chapterId);
  const isBookmarked = bookmarks.includes(question.id);

  useEffect(() => {
    markViewed(question.id);
    // Trap scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [question.id, markViewed]);

  const handleReveal = () => {
    setRevealed(true);
    if (!xpAdded) {
      addXp(5);
      setXpAdded(true);
    }
  };

  const handleMcqOption = (idx) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
    setRevealed(true);
    if (!xpAdded) {
      addXp(idx === question.correctOption ? 15 : 3);
      setXpAdded(true);
    }
  };

  const typeColor = question.type === 'mcq' ? 'teal' : question.type === 'short' ? 'purple' : 'pink';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              <span className={`q-badge ${question.type}`}>{question.type.toUpperCase()}</span>
              <span className="q-badge year">📅 {question.year}</span>
              <span className="q-badge marks">⭐ {question.marks} mark{question.marks > 1 ? 's' : ''}</span>
              {question.isCode && <span className="q-badge code">{'</>'} Code</span>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              <span style={{ color: chapter?.color }}>{chapter?.icon} {chapter?.name}</span>
              {' · '}
              <span>{question.topic}</span>
              {question.subtopic && <span style={{ opacity: 0.7 }}> › {question.subtopic}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button
              className="modal-close"
              onClick={() => toggleBookmark(question.id)}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              aria-label="Bookmark"
              style={{ color: isBookmarked ? 'var(--accent-gold)' : undefined }}
            >
              {isBookmarked ? '★' : '☆'}
            </button>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-question">{question.question}</div>

          {/* MCQ Options */}
          {question.type === 'mcq' && question.options && (
            <div className="mcq-options">
              {question.options.map((opt, idx) => {
                let cls = 'mcq-option';
                if (answered) {
                  if (idx === question.correctOption) cls += ' correct';
                  else if (idx === selectedOption) cls += ' wrong';
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleMcqOption(idx)}>
                    <span className="mcq-letter">{LETTERS[idx]}</span>
                    <span>{opt}</span>
                    {answered && idx === question.correctOption && (
                      <span style={{ marginLeft: 'auto', color: 'var(--accent-green)' }}>✓</span>
                    )}
                    {answered && idx === selectedOption && idx !== question.correctOption && (
                      <span style={{ marginLeft: 'auto', color: 'var(--accent-pink)' }}>✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Reveal button for non-MCQ */}
          {question.type !== 'mcq' && !revealed && (
            <button className="reveal-answer-btn" onClick={handleReveal}>
              💡 Reveal Model Answer (+5 XP)
            </button>
          )}

          {/* Answer */}
          {revealed && (
            <div className="answer-section">
              <div className="answer-label">✅ Model Answer</div>
              {xpAdded && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,213,79,0.12)', border: '1px solid rgba(255,213,79,0.3)',
                  padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700,
                  color: 'var(--accent-gold)', marginBottom: 12
                }}>
                  ⚡ XP earned!
                </div>
              )}
              <AnswerDisplay answer={question.answer} />
            </div>
          )}

          {/* Tags */}
          {question.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
              {question.tags.map(tag => (
                <span key={tag} style={{
                  padding: '2px 10px', borderRadius: 99,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  fontSize: 11, color: 'var(--text-muted)', fontWeight: 600
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
