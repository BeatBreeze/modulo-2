const Playlist = require("../models/playlist.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => res.render("music/newPlaylist");

module.exports.doCreate = (req, res, next) => {
  Playlist.create({
    name: req.body.name,
    tracks: [],
    user: req.user.id,
  })
    .then(() => res.redirect("/profile"))
    .catch((error) => {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   const errors = Object.keys(error.errors).reduce((errors, attr) => {
      //     errors[attr] = error.errors[attr].message
      //     return errors;
      //   }, {})

      //   req.flash('data', JSON.stringify({ playlist: req.body, errors: errors }));
      //   res.redirect('/profile');
      // } else {
      next(error);
      // }
    });
};
