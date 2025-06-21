import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateProfile } from '../services/userService';
import '../styles/main.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    avatar: '',
    username: '',
    email: '',
    bio: '',
    skills: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getCurrentUser();
        setProfile({
          avatar: user.avatar || '',
          username: user.username || '',
          email: user.email || '',
          bio: user.bio || '',
          skills: (user.skills || []).join(', ')
        });
      } catch (err) {
        alert('Erro ao carregar perfil. Verifique sua conexão.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = {
        ...profile,
        skills: profile.skills.split(',').map((s) => s.trim())
      };

      const res = await updateProfile(updated);
      localStorage.setItem('devpoints_currentUser', JSON.stringify(res)); // opcional: sincronizar local
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  return (
    <div className="modal active" style={{ position: 'relative', top: 0 }}>
      <div className="modal-content">
        <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1.5rem' }}>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ textAlign: 'center' }}>
            <img
              src={profile.avatar}
              alt="Avatar"
              className="avatar"
              style={{ width: '80px', height: '80px', marginBottom: '1rem', cursor: 'pointer' }}
              onClick={() => {
                const newUrl = prompt('URL do novo avatar:', profile.avatar);
                if (newUrl) setProfile({ ...profile, avatar: newUrl });
              }}
            />
            <input
              type="text"
              id="avatar"
              className="form-input terminal-effect"
              placeholder="URL do avatar"
              value={profile.avatar}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nome de usuário</label>
            <input
              type="text"
              id="username"
              className="form-input terminal-effect"
              value={profile.username}
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
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              id="bio"
              className="form-input form-textarea terminal-effect"
              value={profile.bio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills" className="form-label">Habilidades (separadas por vírgula)</label>
            <input
              type="text"
              id="skills"
              className="form-input terminal-effect"
              value={profile.skills}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">SALVAR ALTERAÇÕES</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;