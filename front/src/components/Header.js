import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="navbar">
        <a href="/" className="logo">DevPoints</a>
        <div className="nav-links">
          <a href="#" className="active">Explorar</a>
          <a href="#">Tags</a>
          <a href="#">Ranking</a>
          <a href="#">Blog</a>
        </div>
        <div className="user-panel">
          <div className="points-badge">
            <span style={{ fontWeight: 'bold' }}>⭐</span>
            <span id="user-points">0</span>
          </div>
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Avatar"
            className="avatar"
            id="user-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;