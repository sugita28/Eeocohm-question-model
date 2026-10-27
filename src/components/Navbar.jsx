import { Link, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function Navbar() {
  const location = useLocation();
  const { xp, level, levelName } = useGame();

  const links = [
    { to: '/', label: '🏠 Home' },
    { to: '/questions', label: '📚 Question Bank' },
    { to: '/flashcards', label: '🃏 Flashcards' },
    { to: '/trends', label: '📊 Insights' },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo" aria-label="NEB CS Quest Home">
          <div className="nav-logo-icon">🎯</div>
          <span className="nav-logo-text">NEB CS Quest</span>
        </Link>

        <ul className="nav-links" role="list">
          {links.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-xp-badge" title={`${levelName} — ${xp} XP total`}>
          ⚡ {xp} XP
          <span style={{
            background: 'rgba(255,213,79,0.2)',
            border: '1px solid rgba(255,213,79,0.3)',
            padding: '1px 6px',
            borderRadius: 99,
            fontSize: 10,
            fontWeight: 800,
          }}>
            Lv.{level}
          </span>
        </div>
      </div>
    </nav>
  );
}
