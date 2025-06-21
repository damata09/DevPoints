import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';
import '../styles/main.css';

const HomePage = () => {
  const navigate = useNavigate();
  const mockQuestions = []; // Depois você pode alimentar com dados reais ou contexto

  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <button className="ask-btn" onClick={() => navigate('/ask')}>
            NOVA PERGUNTA
          </button>
          <div id="questions-feed">
            {mockQuestions.length === 0 ? (
              <div className="question-card" style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'var(--neon-blue)' }}>Nenhuma pergunta encontrada</h3>
                <p>Seja o primeiro a fazer uma pergunta!</p>
              </div>
            ) : (
              mockQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;