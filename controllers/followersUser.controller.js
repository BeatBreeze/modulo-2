const FollowersUser = require("../models/follower.user.model");
const User = require("../models/user.model");
const Playlist = require("../models/playlist.model");
const PlaylistFollower = require("../models/follower.playlist.model");

module.exports.doFollowingUser = (req, res, next) => {
  FollowersUser.create({
    user: req.user.id,
    otherUser: req.params.id,
  })
    .then(() => res.redirect("back"))
    .catch((error) => {
      next(error);
    });
};

module.exports.searchUser = async (req, res, next) => {
  try {
    const searchRegex = new RegExp(req.query.searchUser, "i");
    const allFindUsers = await User.find({ username: searchRegex });
    const currentIsFollowerPlaylists = await PlaylistFollower.find({
      user: req.user.id,
    });
    const currentIsFollower = await FollowersUser.find({
      user: req.user.id,
    });
    const usersAndPlaylists = [];
    for (const oneUser of allFindUsers) {
      const playlists = await Playlist.find({ user: oneUser.id });
      const playlistsData = playlists.map((i, index) => {
        const isFollowing = currentIsFollowerPlaylists.some(
          (f) => f.playlist.toString() === i.id.toString()
        );
        return index <= 1
          ? { playlist: i, isFollowing }
          : null;
      }).filter((f) => f !== null);
      const isFollowingUser =
        currentIsFollower &&
        currentIsFollower.some(
          (i) => i.otherUser.toString() === oneUser.id.toString()
        );
      const followers = await FollowersUser.find({ otherUser: oneUser.id });
      usersAndPlaylists.push({
        numPlaylist: playlists && playlists.length,
        playlists: playlistsData,
        user: oneUser,
        followers: followers && followers.length,
        isFollowingUser: isFollowingUser,
      });
    }
    if (usersAndPlaylists.length > 0) {
      res.render("users/userList", {
        users: usersAndPlaylists.filter((i) => i.user.id !== req.user.id),
      });
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
  FollowersUser.findOneAndDelete({
    user: req.user.id,
    otherUser: req.params.id,
  })
    .then(() => {
      res.redirect(`back`);
    })
    .catch(next);
};
