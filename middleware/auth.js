const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    next(
      new Error(
        'Hey this is a protected api endpoint, you are not authenticated put in the Bearer token in the authorization header please'
      )
    );
    return;
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const result = jwt.verify(token, 'secret');
    const user = await User.findById(result.userId);
    req.user = user;
    next();
  } catch (err) {
    next(
      new Error('Hi, the token you passed in is invalid, check the token again')
    );
  }
};

const restrictedTo = (userType) => {
  return (req, res, next) => {
    if (req.user.userType !== userType) {
      next(
        new Error(
          `Dear ${req.user.userType}, only ${userType} can access this api endpoint.`
        )
      );
      return;
    }
    next();
  };
};

module.exports = { authenticateUser, restrictedTo };
