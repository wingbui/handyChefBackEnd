const User = require('../models/User.js');

const register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new Error('Please provide both email and password'));
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
    const user = await User.create({ email, password });
    const token = user.createJWT();
    res.status(201).json({
      user: {
        email: user.email,
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
    next(new Error('Please provide both email and password'));
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
