const User = require("../models/user.model");
const Playlist = require("../models/playlist.model");
const mongoose = require("mongoose");
const FollowersUser = require("../models/follower.user.model");
const PlaylistFollower = require("../models/follower.playlist.model");

module.exports.home = (req, res, next) => {
  spotifyApi
    .getRecommendations({
      min_popularity: 90
    })
    .then(
      function (data) {
        let recommendations = data.body;
        res.render ("home",{recommendations} )
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};

module.exports.otherUser = async (req, res, next) => {
    try {
      const oneUser = await User.findById(req.params.id);
      const currentIsFollowerPlaylists = await PlaylistFollower.find({
        user: req.user.id,
      });
      const currentIsFollower = await FollowersUser.find({
        user: req.user.id,
      });
      const userAndPlaylists = [];
        const playlists = await Playlist.find({ user: oneUser.id });
        const playlistsData = playlists.map((i, index) => {
          const isFollowing = currentIsFollowerPlaylists.some(
            (f) => f.playlist.toString() === i.id.toString()
          );
          return { playlist: i, isFollowing };
        }).filter((f) => f !== null);
        const isFollowingUser =
          currentIsFollower &&
          currentIsFollower.some(
            (i) => i.otherUser.toString() === oneUser.id.toString()
          );
        const followers = await FollowersUser.find({ otherUser: oneUser.id });
        userAndPlaylists.push({
          numPlaylist: playlists && playlists.length,
          playlists: playlistsData,
          user: oneUser,
          followers: followers && followers.length,
          isFollowingUser: isFollowingUser,
        });
      if (userAndPlaylists.length > 0) {
        res.render("users/otherUser", {
          user: userAndPlaylists[0] })
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.error(error);
      res.redirect("/");
    }
};
// REGISTER
module.exports.register = (req, res, next) => res.render("users/register");

module.exports.doRegister = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.render("users/register", {
          user: req.body,
          errors: {
            username: "Username already exists",
          },
        });
      } else {
        return User.create({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatarURL: req.file
            ? req.file.path
            : `https://i.pravatar.cc/150?u=${req.body.email}`, // multer middleware is filling this field
        }).then(() => {
          req.flash("data", JSON.stringify({ info: "Please login in" }));
          res.redirect("/login");
        });
      }
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/register", { user: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};
// LOGIN / LOGOUT
module.exports.login = (req, res, next) => res.render("users/login");

module.exports.doLogin = (req, res, next) => {
  function renderInvalidUsername() {
    res.render("users/login", {
      user: req.body,
      errors: {
        password: "Invalid username or password",
      },
    });
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return user.checkPassword(req.body.password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.redirect("/profile");
          } else {
            renderInvalidUsername();
          }
        });
      } else {
        renderInvalidUsername();
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

// PROFILE
module.exports.profile = (req, res, next) => {
  res.render("users/profile", { user: req.user });
};

module.exports.edit = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.render("users/edit", { user });
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.render("users/edit", {
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
        res.render("users/edit", { user: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};

module.exports.doEditAvatar = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
        req.user.avatarURL= req.file
            ? req.file.path
            : `https://res.cloudinary.com/dznwlaen6/image/upload/v1695029184/beatBreeze/user-no-cover_r7y0t6.jpg`; // multer middleware is filling this field
        return req.user.save().then(() => {
          res.redirect("/profile");
        });
      })
    .catch((error) => {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/edit", { user: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};

// DELETE
module.exports.delete = (req, res, next) => {
  // DELETE PLAYLIST
  Playlist.find({ user: req.user.id })
    .then((playlists) => {
      playlists.map((playlis) => {
        Playlist.findByIdAndDelete(playlis.id)
          .then(() => {})
          .catch(next);
      });
    })
    .catch(next);
  // DELETE USER
  User.findByIdAndDelete(req.user.id)
    .then(() => {
      res.redirect(`/`);
    })
    .catch(next);
};
