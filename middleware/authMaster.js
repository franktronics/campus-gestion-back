const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'})

const TOKENKEY = process.env.DB_TOKEN

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, TOKENKEY);
    const masterId = decodedToken.masterId;

    if (req.query.id !== masterId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};