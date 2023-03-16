const HTTP_INVALID_STATUS = 400;

const authEMail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;

  if (!email) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  
  next();
};

module.exports = {
  authEMail,
};