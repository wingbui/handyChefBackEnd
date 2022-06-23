const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name'],
    minlength: 1,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
    minlength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  userType: {
    type: String,
    required: [true, 'Please provide user type'],
  },
  chefService: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChefService',
  },
  favoriteChefs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'ChefService',
    },
  ],
  preferredCuisine: [{ type: String }],
  pushNotificationToken: {
    type: String,
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, 'secret', {
    expiresIn: '30d',
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
