const User = require('../models/User.js');

const register = async (req, res, next) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    next(new Error('Please provide email, password and user type'));
    return;
  }

  if (userType !== 'customer' && userType !== 'chef') {
    next(new Error("User type is either 'customer' or 'chef'"));
    return;
  }

  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('Email already in use');
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const user = await User.create({ email, password, userType });
    const token = user.createJWT();
    res.status(201).json({
      user: {
        email: user.email,
        userType: user.userType,
      },
      token,
    });
  } catch (err) {
    next(err);
    return;
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new Error('Please provide email and password'));
    return;
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Please check again email or password.');
    }

    try {
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new Error('Email or password is not correct. Please try again.');
      } else {
        const token = user.createJWT();
        user.password = undefined;
        res.status(200).json({ user, token });
      }
    } catch (err) {
      next(err);
      return;
    }
  } catch (err) {
    next(err);
    return;
  }
};

module.exports = { register, login };
