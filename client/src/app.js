import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthContextProvider from '../../front/src/context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import HomePage from '../../front/src/pages/HomePage';
import LoginPage from '../../front/src/pages/LoginPage';
import RegisterPage from '../../front/src/pages/RegisterPage';
import QuestionsPage from '../../front/src/pages/QuestionsPage';
import QuestionDetailPage from '../../front/src/pages/QuestionDetailPage';
import ProfilePage from '../../front/src/pages/ProfilePage';
import LeaderboardPage from '../../front/src/pages/LeaderboardPage';
import RewardsPage from '../../front/src/pages/RewardsPage';
import NotFoundPage from '../../front/src/pages/NotFoundPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/questions/:id" element={<QuestionDetailPage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/rewards" element={<PrivateRoute><RewardsPage /></PrivateRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
    
  );
}

export default App;