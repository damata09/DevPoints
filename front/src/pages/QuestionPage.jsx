import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';
import '../styles/main.css';

const QuestionsPage = () => {
  const questions = JSON.parse(localStorage.getItem('devpoints_questions')) || [];

  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1rem' }}>Todas as perguntas</h2>
          {questions.length === 0 ? (
            <div className="question-card" style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--neon-blue)' }}>Nenhuma pergunta encontrada</h3>
              <p>Seja o primeiro a publicar uma!</p>
            </div>
          ) : (
            questions.map((q) => <QuestionCard key={q.id} question={q} />)
          )}
        </main>
      </div>
    </>
  );
};

export default QuestionsPage;