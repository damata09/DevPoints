import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';
import { getAllQuestions } from '../services/questionService';
import '../styles/main.css';
console.log('>>> Renderizou QuestionPage');
const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
        alert('Não foi possível carregar as perguntas. Tente novamente mais tarde.');
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <button className="ask-btn" onClick={() => navigate('/ask')}>
            NOVA PERGUNTA
          </button>

          <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1rem' }}>
            Todas as perguntas
          </h2>

          {questions.length === 0 ? (
            <div className="question-card" style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--neon-blue)' }}>Nenhuma pergunta encontrada</h3>
              <p>Seja o primeiro a publicar uma!</p>
            </div>
          ) : (
            questions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default QuestionPage;