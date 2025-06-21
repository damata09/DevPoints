import React, { useState, useEffect } from 'react';
import '../styles/main.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    avatar: 'https://i.pravatar.cc/150?img=3',
    username: '',
    email: '',
    bio: '',
    skills: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('devpoints_currentUser'));
    if (user) {
      setProfile({
        avatar: user.avatar,
        username: user.username,
        email: user.email,
        bio: user.bio || '',
        skills: (user.skills || []).join(', ')
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem('devpoints_users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('devpoints_currentUser'));

    // Verifica conflitos
    if (
      allUsers.some(
        (u) => (u.email === profile.email || u.username === profile.username) && u.id !== currentUser.id
      )
    ) {
      alert('E-mail ou nome de usuário já estão em uso.');
      return;
    }

    const updatedUser = {
      ...currentUser,
      ...profile,
      skills: profile.skills.split(',').map((s) => s.trim())
    };

    // Atualiza localStorage
    const index = allUsers.findIndex((u) => u.id === currentUser.id);
    allUsers[index] = updatedUser;

    localStorage.setItem('devpoints_users', JSON.stringify(allUsers));
    localStorage.setItem('devpoints_currentUser', JSON.stringify(updatedUser));
    alert('Perfil atualizado com sucesso!');
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