const HTTP_UNAUTHORIZED_STATUS = 401;
const TOKEN_LENGTH = 16;

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== TOKEN_LENGTH) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token inválido',
    });
  }
  
  next();
};

module.exports = {
  authToken,
};