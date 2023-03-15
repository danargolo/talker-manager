const express = require('express');
const { readTalkers } = require('./fsUtils/fsReadFile');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const ZERO = 0;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalkers();

  if (talkers.length === ZERO) { res.status(HTTP_OK_STATUS).json([]); }

  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
