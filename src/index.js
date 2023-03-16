const express = require('express');
const { authAge } = require('./middlewares/authAge');
const { authEMail } = require('./middlewares/authEmail');
const { authName } = require('./middlewares/authName');
const { authPassword } = require('./middlewares/authPassword');
const { authRate } = require('./middlewares/authRate');
const { authTalk } = require('./middlewares/authTalk');
const { authToken } = require('./middlewares/authToken');
const { authWatchedAt } = require('./middlewares/authWatchedAt');
const { readTalkers } = require('./utils/fsReadTalkers');
const { writeTalkers } = require('./utils/fsWriteTalkers');
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

app.post('/talker',
  authToken,
  authName,
  authAge,
  authTalk,
  authWatchedAt,
  authRate,
  async (req, res) => {
  const { name, age, talk: { rate, watchedAt } } = req.body;
  const talkers = await readTalkers();
  const lastId = talkers.at(-1).id;

  const newTalker = {
    name,
    age,
    id: lastId + 1,
    talk: { watchedAt, rate },
  };
  talkers.push(newTalker);
  
  writeTalkers(talkers);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id',
  authToken,
  authName,
  authAge,
  authTalk,
  authWatchedAt,
  authRate,
  async (req, res) => {
  const talkers = await readTalkers();
  const { name, age, talk } = req.body;
  const { id: requestId } = req.params;
  
  const data = talkers.find((talker) => talker.id === +requestId);

  if (!data) { 
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  data.name = name;
  data.age = age;
  data.talk = talk;

  writeTalkers(talkers);
  return res.status(HTTP_OK_STATUS).json(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
