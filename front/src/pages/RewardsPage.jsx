import React from 'react';

const RewardsPage = () => {
  const rewards = [
    { name: 'Camiseta DevPoints', cost: 500 },
    { name: 'Sticker Pack', cost: 200 },
    { name: 'Curso React Pro', cost: 1200 },
  ];

  return (
    <div className="container" style={{ flexDirection: 'column' }}>
      <h1 style={{ color: 'var(--cyber-yellow)', marginBottom: '1rem' }}>Recompensas</h1>
      <div className="main-content">
        {rewards.map((item, index) => (
          <div key={index} className="question-card">
            <h3>{item.name}</h3>
            <p style={{ color: 'var(--matrix-green)' }}>{item.cost} pontos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;