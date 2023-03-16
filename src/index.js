const express = require('express');
const { authEMail } = require('./middlewares/authEmail');
const { authPassword } = require('./middlewares/authPassword');
const { readTalkers } = require('./utils/fsReadFile');
const { generateToken } = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';
const ZERO = 0;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();

  if (talkers.length === ZERO) { return res.status(HTTP_OK_STATUS).json([]); }

  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkers();

  const { id: requestId } = req.params;

  const data = talkers.find((talker) => talker.id === +requestId);

  if (!data) { 
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(HTTP_OK_STATUS).json(data);
});

app.post('/login', authEMail, authPassword, (req, res) => {
  const token = generateToken();

  return res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
