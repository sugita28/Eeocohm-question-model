import { Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import QuestionsPage from './pages/QuestionsPage';
import FlashcardsPage from './pages/FlashcardsPage';
import TrendsPage from './pages/TrendsPage';

function Footer() {
  return (
    <footer className="footer">
      <p>
        🎯 <strong>NEB CS Quest</strong> — Class 12 Computer Science Question Bank
      </p>
      <p style={{ marginTop: 6 }}>
        Questions sourced from NEB past papers 2078–2082 BS (2021–2025 AD) ·
        Built for students preparing for NEB board exams
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <GameProvider>
      <div className="app-layout">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/trends" element={<TrendsPage />} />
        </Routes>
        <Footer />
      </div>
    </GameProvider>
  );
}
