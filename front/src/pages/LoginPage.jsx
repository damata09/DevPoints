import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css'; // reutiliza o estilo que você já tem

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica temporária de autenticação mock
    const storedUsers = JSON.parse(localStorage.getItem('devpoints_users')) || [];
    const user = storedUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('devpoints_currentUser', JSON.stringify(user));
      alert(`Bem-vindo, ${user.username}!`);
      navigate('/');
    } else {
      alert('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="modal active" style={{ position: 'relative', top: 0 }}>
      <div className="modal-content">
        <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1.5rem' }}>Acesse sua conta</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">E-mail</label>
            <input
              type="email"
              id="login-email"
              className="form-input terminal-effect"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Senha</label>
            <input
              type="password"
              id="login-password"
              className="form-input terminal-effect"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">ENTRAR</button>
          <p className="login-switch">
            Não tem conta? <a href="/register">Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;