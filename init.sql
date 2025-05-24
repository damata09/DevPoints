-- Tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    bio TEXT,
    skills TEXT[],
    current_projects TEXT[],
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de badges
CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

-- Tabela de relação usuário-badges
CREATE TABLE user_badges (
    user_id INTEGER REFERENCES users(id),
    badge_id INTEGER REFERENCES badges(id),
    awarded_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, badge_id)
);

-- Tabela de perguntas
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    tags TEXT[],
    views INTEGER DEFAULT 0,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de respostas
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    question_id INTEGER REFERENCES questions(id),
    user_id INTEGER REFERENCES users(id),
    is_accepted BOOLEAN DEFAULT FALSE,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de recompensas
CREATE TABLE rewards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cost INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'course', 'certificate', 'mentorship', etc.
    data JSONB -- Detalhes específicos da recompensa
);

-- Tabela de resgates
CREATE TABLE redemptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    reward_id INTEGER REFERENCES rewards(id),
    redeemed_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- Tabela de leaderboard
CREATE TABLE leaderboard (
    user_id INTEGER REFERENCES users(id),
    score INTEGER DEFAULT 0,
    week INTEGER,
    month INTEGER,
    year INTEGER,
    PRIMARY KEY (user_id, week, month, year)
);

-- Índices para melhorar performance
CREATE INDEX idx_questions_tags ON questions USING GIN(tags);
CREATE INDEX idx_questions_user ON questions(user_id);
CREATE INDEX idx_answers_question ON answers(question_id);