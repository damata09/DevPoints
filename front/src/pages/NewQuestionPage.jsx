import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../services/questionService';
import '../styles/main.css';

const NewQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('devpoints_currentUser'));
      if (!user) {
        alert('Você precisa estar logado para publicar uma pergunta!');
        navigate('/login');
        return;
      }

      const questionData = {
        title,
        body,
        tags: tags.split(',').map((tag) => tag.trim())
      };

      const res = await createQuestion(questionData);
      alert('Pergunta publicada com sucesso!');
      navigate(`/questions/${res.id}`); // Redireciona pra visualização da pergunta criada
    } catch (err) {
      alert('Erro ao publicar a pergunta. Tente novamente.');
    }
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
              placeholder="Descreva sua dúvida com clareza"
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
              placeholder="Explique o problema, mostre código, diga o que já tentou..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags" className="form-label">Tags (separadas por vírgula)</label>
            <input
              type="text"
              id="tags"
              className="form-input terminal-effect"
              placeholder="react, javascript, api"
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