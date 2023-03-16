const HTTP_INVALID_STATUS = 400;

const authWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/i;

  if (!watchedAt) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: `O campo "watchedAt" é obrigatório`,
    });
  }

  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = {
  authWatchedAt,
};