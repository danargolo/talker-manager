const HTTP_INVALID_STATUS = 400;

const authTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: `O campo "talk" é obrigatório`,
    });
  }
  next();
};

module.exports = {
  authTalk,
};