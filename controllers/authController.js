const User = require('../models/User.js');

const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    userType,
    profileImage,
    billingAddress,
    shippingAddress,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !userType) {
    next(
      new Error(
        'Please provide your fist name, last name, email, password and user type'
      )
    );
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
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      userType,
      profileImage,
      billingAddress,
      shippingAddress,
    });
    const token = user.createJWT();
    res.status(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        profileImage: user.profileImage,
        billingAddress: user.billingAddress,
        shippingAddress: user.shippingAddress,
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

// will work on this later on
const updateUser = async () => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
  } catch (error) {}
};
module.exports = { register, login, updateUser };
