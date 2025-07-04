import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import '../styles/main.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/150'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      localStorage.setItem('token', res.token);
      localStorage.setItem('devpoints_currentUser', JSON.stringify(res.user));
      alert(`Conta criada com sucesso, ${res.user.username}!`);
      navigate('/');
    } catch (err) {
      alert('Erro ao registrar. Verifique os dados ou tente outro e-mail/usuário.');
    }
  };

  return (
    <div className="modal active" style={{ position: 'relative', top: 0 }}>
      <div className="modal-content">
        <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1.5rem' }}>Criar nova conta</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nome de usuário</label>
            <input
              type="text"
              id="username"
              className="form-input terminal-effect"
              placeholder="@seudominio"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              className="form-input terminal-effect"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              id="password"
              className="form-input terminal-effect"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatar" className="form-label">Avatar (URL)</label>
            <input
              type="text"
              id="avatar"
              className="form-input terminal-effect"
              value={form.avatar}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">CRIAR CONTA</button>
          <p className="login-switch">
            Já tem conta? <a href="/login">Faça login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;