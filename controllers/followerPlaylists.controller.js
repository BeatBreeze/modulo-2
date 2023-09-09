const PlaylistFollower = require("../models/follower.playlist.model");

module.exports.doFollowingPlaylist = (req, res, next) => {
    PlaylistFollower.create({
    user: req.user.id,
    playlist: req.params.id,
  })
    .then(() => res.redirect("back"))
    .catch((error) => {
      next(error);
    });
};

// DELETE
module.exports.delete = (req, res, next) => {
    PlaylistFollower.findByIdAndDelete(req.param.id)
    .then(() => {
      res.redirect(`back`);
    })
    .catch(next);
};
