import React from 'react';

const LeaderboardPage = () => {
  const mockUsers = [
    { username: '@dev_master', points: 5248 },
    { username: '@code_wizard', points: 4876 },
    { username: '@byte_me', points: 4521 },
  ];

  return (
    <div className="container" style={{ flexDirection: 'column' }}>
      <h1 style={{ color: 'var(--neon-blue)', marginBottom: '1rem' }}>Ranking de Usuários</h1>
      <div className="leaderboard">
        {mockUsers.map((user, index) => (
          <div key={index} className="question-card" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{index + 1}. {user.username}</span>
            <span>{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;