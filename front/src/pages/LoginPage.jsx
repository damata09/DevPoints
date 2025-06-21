import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/main.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('devpoints_currentUser', JSON.stringify(res.user));
      alert(`Bem-vindo, ${res.user.username}!`);
      navigate('/');
    } catch (err) {
      alert('Login inválido!');
    }
  };

  return (
    <div className="modal active" style={{ position: 'relative', top: 0 }}>
      <div className="modal-content">
        <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1.5rem' }}>
          Acesse sua conta
        </h2>
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