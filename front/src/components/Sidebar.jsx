import React from 'react';

const Sidebar = () => {
  const tags = ['javascript', 'react', 'nodejs', 'python', 'docker', 'typescript', 'mongodb', 'postgresql', 'git', 'api'];
  const ranking = [
    { name: '@dev_master', points: 5248 },
    { name: '@code_wizard', points: 4876 },
    { name: '@byte_me', points: 4521 },
  ];

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">TAGS POPULARES</h3>
      <div className="tags-container">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <h3 className="sidebar-title" style={{ marginTop: '2rem' }}>LEADERBOARD</h3>
      <div className="leaderboard">
        {ranking.map((user, index) => (
          <div key={index} className="leaderboard-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{index + 1}. {user.name}</span>
            <span>{user.points} pts</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;