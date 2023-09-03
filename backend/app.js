const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa el módulo 'cors'
const app = express();

// Habilita CORS
app.use(cors());

// Servir archivos estáticos desde la carpeta "frontend"
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/genres', async (req, res) => {
  try {
    const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=es-ES';
    const genreOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmFmYWY2ZjVjYTgwMWUwMTdmZDg5OTE0YzViYWViNyIsInN1YiI6IjYwOTAzMWQwODcxYjM0MDA2ZDU0NWNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iD-x5QpZMkTJi9xIxnxFi_tZJyQEqh0wT5qvEm9R_uQ'
      }
    };

    const genreResponse = await fetch(genreUrl, genreOptions);
    const genreData = await genreResponse.json();

    res.json(genreData.genres);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmFmYWY2ZjVjYTgwMWUwMTdmZDg5OTE0YzViYWViNyIsInN1YiI6IjYwOTAzMWQwODcxYjM0MDA2ZDU0NWNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iD-x5QpZMkTJi9xIxnxFi_tZJyQEqh0wT5qvEm9R_uQ'
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();

    res.json(data.results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=es-ES`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmFmYWY2ZjVjYTgwMWUwMTdmZDg5OTE0YzViYWViNyIsInN1YiI6IjYwOTAzMWQwODcxYjM0MDA2ZDU0NWNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iD-x5QpZMkTJi9xIxnxFi_tZJyQEqh0wT5qvEm9R_uQ'
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/countries', (req, res) => {
  const url = 'https://api.themoviedb.org/3/configuration/countries?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmFmYWY2ZjVjYTgwMWUwMTdmZDg5OTE0YzViYWViNyIsInN1YiI6IjYwOTAzMWQwODcxYjM0MDA2ZDU0NWNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iD-x5QpZMkTJi9xIxnxFi_tZJyQEqh0wT5qvEm9R_uQ'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: 'Error en la solicitud' }));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});