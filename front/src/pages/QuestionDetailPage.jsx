import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getQuestionById, submitAnswer } from '../services/questionService';
import '../styles/main.css';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState('');
  const user = JSON.parse(localStorage.getItem('devpoints_currentUser'));

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestionById(id);
        setQuestion(data);
      } catch (err) {
        alert('Erro ao carregar a pergunta.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    try {
      if (!newAnswer.trim()) return;

      const data = {
        body: newAnswer
      };

      const updated = await submitAnswer(id, data);
      setQuestion(updated);
      setNewAnswer('');
    } catch (err) {
      alert('Erro ao enviar resposta.');
    }
  };

  if (loading) {
    return <div className="container"><p>Carregando pergunta...</p></div>;
  }

  if (!question) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--futuristic-pink)' }}>Pergunta não encontrada</h2>
        <p>Verifique o link ou volte para a lista de perguntas.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container" style={{ flexDirection: 'column' }}>
        <div className="question-card">
          <h2 className="question-title">{question.title}</h2>
          <p className="question-body">{question.body}</p>
          <div className="question-footer">
            <div className="user-info">
              <img src={question.user.avatar} alt="avatar" className="avatar" />
              <span className="username">{question.user.username}</span>
            </div>
            <div className="question-stats">
              <span className="stat">👁 {question.views} visualizações</span>
              <span className="stat">⭐ {question.points} pontos</span>
            </div>
          </div>
        </div>

        <div className="answers-section">
          <h4 className="answers-title">RESPOSTAS</h4>
          {question.answers && question.answers.length > 0 ? (
            question.answers.map((a) => (
              <div key={a.id} className="answer-card">
                <div className="answer-header">
                  <div className="user-info">
                    <img src={a.user.avatar} alt="avatar" className="avatar" style={{ width: 25, height: 25 }} />
                    <span className="username">{a.user.username}</span>
                  </div>
                  <span className="stat">🕒 {a.timeAgo}</span>
                </div>
                <p className="answer-body">{a.body}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'rgba(252, 252, 252, 0.7)' }}>Nenhuma resposta ainda.</p>
          )}

          {user && (
            <form onSubmit={handleSubmitAnswer} style={{ marginTop: '1.5rem' }}>
              <textarea
                className="form-input form-textarea terminal-effect"
                placeholder="Digite sua resposta aqui..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
                ENVIAR RESPOSTA
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionDetailPage;