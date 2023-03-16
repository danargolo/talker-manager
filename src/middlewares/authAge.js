const HTTP_INVALID_STATUS = 400;
const MINIMUM_AGE = 18;

const authAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < MINIMUM_AGE ||  !Number.isInteger(age)) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  
  next();
};

module.exports = {
  authAge,
};