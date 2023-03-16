const HTTP_INVALID_STATUS = 400;
const NAME_LENGTH = 3;

const authName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < NAME_LENGTH) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  
  next();
};

module.exports = {
  authName,
};