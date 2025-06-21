import React from 'react';

const QuestionCard = ({ question }) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <h3 className="question-title">{question.title}</h3>
        <div className="question-stats">
          <div className="stat">⏱ {question.timeAgo}</div>
          <div className="stat">👁 {question.views} visualizações</div>
        </div>
      </div>
      <p className="question-body">{question.body}</p>
      <div className="question-footer">
        <div className="user-info">
          <img src={question.user.avatar} alt="User" className="avatar" style={{ width: '30px', height: '30px' }} />
          <span className="username">{question.user.username}</span>
        </div>
        <div className="question-stats">
          <div className="stat">💬 {question.answers.length} respostas</div>
          <div className="stat">⭐ {question.points} pontos</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;