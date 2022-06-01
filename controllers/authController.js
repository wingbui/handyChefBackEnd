const User = require('../models/User.js');

const register = async (req, res, next) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    next(new Error('Please provide email, password and user type'));
  }

  if (userType !== 'customer' && userType !== 'chef') {
    next(new Error("User type is either 'customer' or 'chef'"));
  }

  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('Email already in use');
    }
  } catch (err) {
    next(err);
  }

  try {
    const user = await User.create({ email, password, userType });
    const token = user.createJWT();
    res.status(201).json({
      user: {
        email: user.email,
        userType: user.userType
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new Error('Please provide email and password'));
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    try {
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new Error('Email or password is not correct. Please try again.');
      }
    } catch (err) {
      next(err);
    }

    const token = user.createJWT();
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
