import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/main.css';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('devpoints_currentUser'));

  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1rem' }}>
            Olá, {user ? user.username : 'visitante'}! 👋
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            Bem-vindo(a) ao DevPoints — uma plataforma para aprender, compartilhar e evoluir.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="ask-btn" onClick={() => navigate('/ask')}>
              ➕ Nova Pergunta
            </button>
            <button className="ask-btn" onClick={() => navigate('/questions')}>
              📋 Ver Perguntas
            </button>
            <button className="ask-btn" onClick={() => navigate('/profile')}>
              👤 Meu Perfil
            </button>
            <button className="ask-btn" onClick={() => navigate('/leaderboard')}>
              🏆 Ranking
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;