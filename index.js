const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'https://allrounderscoreboard.onrender.com/score?id=106673';

let latestData = { status: "Waiting for update..." };

async function updateJSON() {
  try {
    const res = await fetch(API_URL);
    latestData = await res.json();
    console.log('Updated:', new Date().toLocaleTimeString());
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

setInterval(updateJSON, 3000);
updateJSON();

app.get('/', (req, res) => {
  res.send('Live Cricket JSON API ✅');
});

app.get('/score.json', (req, res) => {
  res.json(latestData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
