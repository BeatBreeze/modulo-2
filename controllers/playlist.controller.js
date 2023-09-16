const SpotifyWebApi = require("spotify-web-api-node");
const Playlist = require("../models/playlist.model");
const mongoose = require("mongoose");
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_SPOTIFY_ID,
  clientSecret: process.env.CLIENT_SPOTIFY_SECRET,
});

spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch((err) =>
    console.log("The error while searching artists occurred: ", err)
  );

module.exports.create = (req, res, next) => res.render("music/newPlaylist");

module.exports.doCreate = (req, res, next) => {
  Playlist.create({
    tracks: [],
    user: req.user.id,
    imgPlaylist: req.file
      ? req.file.path
      : `https://i.pravatar.cc/150?u=${req.body.email}`, // multer middleware is filling this field
    name: req.body.name,
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
        res.render("music/editPlaylist", {
          user: req.body,
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};

module.exports.addTrack = (req, res, next) => {
  let tracks = [];
  Playlist.findById(req.params.idPlaylist)
    .then((playlist) => {
      playlist.tracks.map((idTrack) =>
        idTrack === req.params.id ? null : tracks.push(idTrack)
      );
      tracks.push(req.params.id);
    })
    .then(() =>
      Playlist.findByIdAndUpdate(req.params.idPlaylist, {
        tracks: tracks,
      })
        .then(() => res.redirect("/profile"))
        .catch((error) => {
          next(error);
        })
    )
    .catch((error) => {
      next(error);
    });
};

module.exports.list = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    const trackPromises = playlist.tracks.map(async (i) => {
      const response = await spotifyApi.getTrack(i);
      return response.body;
    });
    const trackInfo = await Promise.all(trackPromises);
    res.render("music/playlists", {
      tracks: trackInfo,
      Info: playlist,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
module.exports.delete = (req, res, next) => {
  Playlist.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect(`/profile`);
    })
    .catch(next);
};
