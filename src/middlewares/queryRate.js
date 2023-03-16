const HTTP_INVALID_STATUS = 400;
const MIN_RATE = 1;
const MAX_RATE = 5;
const ZERO = 0;

const checkRate = (rate) => !Number.isInteger(rate) || rate < MIN_RATE || rate > MAX_RATE;

const queryRate = (req, res, next) => {
  const { rate } = req.query;
  
  if (!rate && +rate !== ZERO) {
    return res.status(HTTP_INVALID_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (checkRate(+rate)) { 
      return res.status(HTTP_INVALID_STATUS).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
  }
  next();
};

module.exports = {
  queryRate,
};