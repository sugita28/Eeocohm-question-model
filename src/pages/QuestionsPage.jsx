import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QUESTIONS, CHAPTERS } from '../data/questions';
import { useGame } from '../context/GameContext';
import QuestionModal from '../components/QuestionModal';

const DIFFICULTY_COLORS = {
  easy:   'var(--accent-green)',
  medium: 'var(--accent-gold)',
  hard:   'var(--accent-pink)',
};

const TYPE_LABELS = { mcq: 'MCQ', short: 'Short', long: 'Long', programming: 'Code' };

export default function QuestionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookmarks } = useGame();

  const params = new URLSearchParams(location.search);
  const initChapter = params.get('chapter') ? parseInt(params.get('chapter')) : 'all';

  const [search, setSearch]       = useState('');
  const [chapter, setChapter]     = useState(initChapter);
  const [typeFilter, setType]     = useState('all');
  const [yearFilter, setYear]     = useState('all');
  const [marksFilter, setMarks]   = useState('all');
  const [showBookmarked, setBookmarked] = useState(false);
  const [selectedQ, setSelectedQ] = useState(null);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const ch = p.get('chapter');
    if (ch) setChapter(parseInt(ch));
  }, [location.search]);

  const years = useMemo(() => [...new Set(QUESTIONS.map(q => q.year))].sort((a,b) => b - a), []);

  const filtered = useMemo(() => {
    return QUESTIONS.filter(q => {
      if (search) {
        const s = search.toLowerCase();
        if (!q.question.toLowerCase().includes(s) &&
            !q.topic.toLowerCase().includes(s) &&
            !(q.tags || []).some(t => t.includes(s))) return false;
      }
      if (chapter !== 'all' && q.chapterId !== chapter) return false;
      if (typeFilter !== 'all' && q.type !== typeFilter) return false;
      if (yearFilter !== 'all' && q.year !== parseInt(yearFilter)) return false;
      if (marksFilter !== 'all') {
        const m = parseInt(marksFilter);
        if (m === 1 && q.marks !== 1) return false;
        if (m === 5 && q.marks !== 5) return false;
        if (m === 8 && q.marks < 8) return false;
      }
      if (showBookmarked && !bookmarks.includes(q.id)) return false;
      return true;
    });
  }, [search, chapter, typeFilter, yearFilter, marksFilter, showBookmarked, bookmarks]);

  const resetFilters = () => {
    setSearch(''); setChapter('all'); setType('all');
    setYear('all'); setMarks('all'); setBookmarked(false);
    navigate('/questions');
  };

  const hasFilters = search || chapter !== 'all' || typeFilter !== 'all' ||
    yearFilter !== 'all' || marksFilter !== 'all' || showBookmarked;

  return (
    <main>
      <div className="page-container" style={{ paddingTop: 40 }}>
        <h1 className="section-title">📚 Question Bank</h1>
        <p className="section-subtitle">
          {QUESTIONS.length} questions from NEB past papers 2078–2082 BS
        </p>

        {/* Search & Filters */}
        <div className="search-filter-bar">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input
              id="question-search"
              type="search"
              className="search-input"
              placeholder="Search by topic, keyword, or tag…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search questions"
            />
          </div>

          <select
            id="chapter-filter"
            className="filter-select"
            value={chapter}
            onChange={e => setChapter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            aria-label="Filter by chapter"
          >
            <option value="all">All Chapters</option>
            {CHAPTERS.map(ch => (
              <option key={ch.id} value={ch.id}>{ch.icon} {ch.short}</option>
            ))}
          </select>

          <select
            id="type-filter"
            className="filter-select"
            value={typeFilter}
            onChange={e => setType(e.target.value)}
            aria-label="Filter by question type"
          >
            <option value="all">All Types</option>
            <option value="mcq">MCQ (1m)</option>
            <option value="short">Short Answer</option>
            <option value="long">Long Answer</option>
          </select>

          <select
            id="year-filter"
            className="filter-select"
            value={yearFilter}
            onChange={e => setYear(e.target.value)}
            aria-label="Filter by year"
          >
            <option value="all">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select
            id="marks-filter"
            className="filter-select"
            value={marksFilter}
            onChange={e => setMarks(e.target.value)}
            aria-label="Filter by marks"
          >
            <option value="all">All Marks</option>
            <option value="1">1 Mark</option>
            <option value="5">5 Marks</option>
            <option value="8">8+ Marks</option>
          </select>
        </div>

        {/* Quick filter chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <button
            className={`filter-chip ${showBookmarked ? 'active' : ''}`}
            onClick={() => setBookmarked(p => !p)}
            aria-pressed={showBookmarked}
          >
            ★ Bookmarked ({bookmarks.length})
          </button>
          {CHAPTERS.map(ch => (
            <button
              key={ch.id}
              className={`filter-chip ${chapter === ch.id ? 'active' : ''}`}
              onClick={() => setChapter(chapter === ch.id ? 'all' : ch.id)}
              style={{ '--accent-purple': ch.color }}
            >
              {ch.icon} {ch.short}
            </button>
          ))}
          {hasFilters && (
            <button className="filter-chip" onClick={resetFilters} style={{ color: 'var(--accent-pink)', borderColor: 'rgba(240,98,146,0.3)' }}>
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> of {QUESTIONS.length} questions
          {chapter !== 'all' && (
            <span style={{ marginLeft: 8, color: CHAPTERS.find(c=>c.id===chapter)?.color }}>
              · {CHAPTERS.find(c=>c.id===chapter)?.name}
            </span>
          )}
        </div>

        {/* Questions List */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No questions found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn btn-secondary" style={{ marginTop: 20 }} onClick={resetFilters}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="questions-grid fade-in">
            {filtered.map(q => {
              const ch = CHAPTERS.find(c => c.id === q.chapterId);
              const isBookmarked = bookmarks.includes(q.id);
              return (
                <div
                  key={q.id}
                  className="question-card"
                  onClick={() => setSelectedQ(q)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedQ(q)}
                  aria-label={`Question: ${q.question}`}
                >
                  <div className="question-card-header">
                    <span className={`q-badge ${q.type}`}>{q.type.toUpperCase()}</span>
                    <span className="q-badge year">📅 {q.year}</span>
                    <span className="q-badge marks">⭐ {q.marks}m</span>
                    {q.isCode && <span className="q-badge code">{'</>'} Code</span>}
                    <span style={{
                      marginLeft: 'auto', fontSize: 11, fontWeight: 700,
                      color: DIFFICULTY_COLORS[q.difficulty]
                    }}>
                      {q.difficulty?.toUpperCase()}
                    </span>
                    {isBookmarked && (
                      <span style={{ fontSize: 14, color: 'var(--accent-gold)' }}>★</span>
                    )}
                  </div>
                  <div className="question-text">{q.question}</div>
                  <div className="question-meta">
                    <span style={{ fontSize: 12, color: ch?.color, fontWeight: 600 }}>
                      {ch?.icon} {ch?.short}
                    </span>
                    <span className="question-topic">· {q.topic}</span>
                    {q.subtopic && <span className="question-topic" style={{ opacity: 0.6 }}>· {q.subtopic}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedQ && <QuestionModal question={selectedQ} onClose={() => setSelectedQ(null)} />}
    </main>
  );
}
