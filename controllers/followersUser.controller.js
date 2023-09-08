const FollowersUser = require("../models/follower.user.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");

//module.exports.create = (req, res, next) => res.render("music/newPlaylist");

module.exports.doFollowingUser = (req, res, next) => {
  FollowersUser.create({
    user: req.user.username,
    otherUser: req.body.username
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
module.exports.searchUser = (req,res,next) => {
    User.find({ username: new RegExp(req.query.searchUser, "i")}) // eq /naiim
      .then((users) => {
        if(users.length > 0) {
          res.render("users/userList", {users: users});
        }else {
          res.redirect("/");
        }
      })
      .catch ((err) => {
        console.error(err);
        res.redirect("/");
      })
} 
