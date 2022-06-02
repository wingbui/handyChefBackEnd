const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    throw new Error(
      'Hey my friend, this is a protected api endpoint, you are not authenticated yet so do not access this api, put in the Bearer token in the authorization header please'
    );
  }

  const result = authorizationHeader.split(' ')[1];
  req.user = { userId: result.userId };

  try {
    const result = jwt.verify(token, 'secret');
    console.log(result);
    next();
  } catch (err) {
    throw new Error(
      'Hi, the token you passed in is invalid, check the token again'
    );
  }
};

module.exports = { authenticateUser };
