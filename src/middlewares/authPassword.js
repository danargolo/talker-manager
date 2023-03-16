const HTTP_INVALID_STATUS = 400;
const PASSWORD_LENGTH = 6;

const authPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < PASSWORD_LENGTH) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  
  next();
};

module.exports = {
  authPassword,
};