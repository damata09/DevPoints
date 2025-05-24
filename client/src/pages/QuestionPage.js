import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Grid, Paper, TextField, Chip, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Search as SearchIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  questionCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  tag: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

const QuestionsPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/api/questions');
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/questions?search=${searchTerm}`);
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" component="h1">
          Perguntas
        </Typography>
        {authState.isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => history.push('/questions/new')}
          >
            Nova Pergunta
          </Button>
        )}
      </div>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar perguntas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: '8px', color: 'rgba(0, 0, 0, 0.54)' }} />,
          }}
        />
      </form>

      {loading ? (
        <Typography>Carregando...</Typography>
      ) : filteredQuestions.length === 0 ? (
        <Typography>Nenhuma pergunta encontrada</Typography>
      ) : (
        filteredQuestions.map((question) => (
          <Paper
            key={question.id}
            className={classes.questionCard}
            onClick={() => history.push(`/questions/${question.id}`)}
          >
            <Typography variant="h6" component="h2">
              {question.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {question.body.length > 150
                ? `${question.body.substring(0, 150)}...`
                : question.body}
            </Typography>
            <div>
              {question.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  className={classes.tag}
                  size="small"
                  avatar={<Avatar>{tag[0].toUpperCase()}</Avatar>}
                />
              ))}
            </div>
            <div className={classes.stats}>
              <Typography variant="caption">
                {question.answers} respostas
              </Typography>
              <Typography variant="caption">
                {question.views} visualizações
              </Typography>
              <Typography variant="caption">
                Postado por {question.user.username}
              </Typography>
            </div>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default QuestionsPage;