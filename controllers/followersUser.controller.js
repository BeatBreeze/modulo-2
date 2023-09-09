const FollowersUser = require("../models/follower.user.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Playlist = require("../models/playlist.model");

module.exports.doFollowingUser = (req, res, next) => {
  FollowersUser.create({
    user: req.user.id,
    otherUser: req.params.id,
  })
    .then(() => res.redirect("back"))
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

module.exports.searchUser = async (req, res, next) => {
  try {
    const searchRegex = new RegExp(req.query.searchUser, "i");
    const otherUsers = await User.find({ username: searchRegex });
    const usersAndPlaylists = [];
    for (const oneUser of otherUsers) {
      const playlists = await Playlist.find({ user: oneUser.id });
      usersAndPlaylists.push({ playlists, user: oneUser });
    }

    if (usersAndPlaylists.length > 0) {
      
    res.render("users/userList", { users: usersAndPlaylists, followersUser: req.user.followers });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
// DELETE
module.exports.delete = (req, res, next) => {
  FollowersUser.findByIdAndDelete(req.param.id)
    .then(() => {
      res.redirect(`back`);
    })
    .catch(next);
};
