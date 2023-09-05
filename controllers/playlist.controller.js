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

module.exports.edit = (req, res, next) => {
  Playlist.findById(req.user.id)
    .then((user) => {
      res.render("music/editPlaylist", { user });
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  Playlist.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.render("music/editPlaylist", {
          user: req.body,
          errors: {
            username: "Username already exists",
          },
        });
      } else {
        req.user.password = req.body.password;
        req.user.username = req.body.username;
        req.user.email = req.body.email;
        return req.user.save().then(() => {
          req.flash("data", JSON.stringify({ info: "Please login in" }));
          res.redirect("/profile");
        });
      }
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("music/editPlaylist", { user: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};

module.exports.addTrack = (req, res, next) => {
  console.log("Body", req.body)
  console.log("Params", req.params)
  // Playlist.create({
  //   name: req.body.name,
  //   tracks: [],
  //   user: req.user.id,
  // })
  //   .then(() => res.redirect("/profile"))
  //   .catch((error) => {
  //     next(error);
  //   });
};

// DELETE
module.exports.delete = (req, res, next) => {
  Playlist.findByIdAndDelete(req.user.id)
    .then(() => {
      res.redirect(`/profile`);
    })
    .catch(next);
};