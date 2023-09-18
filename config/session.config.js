const expressSession = require ("express-session");
const mongoStore = require ("connect-mongo");
const mongoose = require ("mongoose");
const User = require ("../models/user.model");

module.exports.session = expressSession({
    secret: process.env.SESSION_SECRET || 'super-secret (change it)',
    // proxy: process.env.SESSION_SECURE === 'true',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: mongoose.connection._connectionString,
      ttl: 14 * 24 * 60 * 60 // 14 days expiration
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.SESSION_SECURE === 'true'
    }
  })
  module.exports.loadSessionUser = (req, res, next) => {
    const userId = req.session.userId;
    if (userId) {
      User.findById(userId)
        .populate('playlists')
        .populate('followers')
        .then((user) => {
          req.user = user;
          res.locals.currentUser = user;
          next();
        })
        .catch((error) => next(error));
    } else {
      next();
    }
  }