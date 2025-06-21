import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const NewQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('devpoints_currentUser'));
    if (!currentUser) {
      alert('Você precisa estar logado para publicar uma pergunta!');
      navigate('/login');
      return;
    }

    const question = {
      id: Date.now(),
      title,
      body,
      tags: tags.split(',').map((t) => t.trim()),
      user: currentUser,
      timeAgo: 'agora mesmo',
      views: 0,
      points: 0,
      answers: []
    };

    const allQuestions = JSON.parse(localStorage.getItem('devpoints_questions')) || [];
    allQuestions.unshift(question);
    localStorage.setItem('devpoints_questions', JSON.stringify(allQuestions));

    alert('Pergunta publicada com sucesso!');
    navigate('/questions');
  };

  return (
    <div className="modal active" style={{ position: 'relative', top: 0 }}>
      <div className="modal-content">
        <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1.5rem' }}>Nova Pergunta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              id="title"
              className="form-input terminal-effect"
              placeholder="Seja específico (ex: 'Erro ao compilar React com Webpack')"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body" className="form-label">Detalhes</label>
            <textarea
              id="body"
              className="form-input form-textarea terminal-effect"
              placeholder="Descreva seu problema em detalhes. Inclua código, mensagens de erro e o que já tentou."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input
              type="text"
              id="tags"
              className="form-input terminal-effect"
              placeholder="javascript, react, nodejs"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">PUBLICAR PERGUNTA</button>
        </form>
      </div>
    </div>
  );
};

export default NewQuestionPage;