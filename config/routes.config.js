const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const spotify = require("../controllers/spotify.controller");
const playlist = require("../controllers/playlist.controller");
const secure = require("../middlewares/secure.mid");
const followers = require("../controllers/followersUser.controller");
const upload = require("../config/multer.config");
const followersPlaylist = require("../controllers/followerPlaylists.controller");

router.get("/register", users.register);
router.post("/register", upload.single("avatarURL"), users.doRegister);
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.post("/logout", secure.isAuthenticated, users.logout);

router.get("/", spotify.home);
router.get("/profile", secure.isAuthenticated, users.profile);
router.get("/profile/edit", secure.isAuthenticated, users.edit);
router.post("/profile", secure.isAuthenticated, users.doEdit);
router.post("/profile/delete", secure.isAuthenticated, users.delete);
router.get("/user/:id", secure.isAuthenticated, users.otherUser);

router.get("/searchUser", secure.isAuthenticated, followers.searchUser);
router.post("/addFollowers/:id", secure.isAuthenticated, followers.doFollowingUser);
router.post("/addFollowers/:id/delete", secure.isAuthenticated, followers.delete);

router.post("/addPlaylistFollower/:id", secure.isAuthenticated, followersPlaylist.doFollowingPlaylist);
router.post("/addPlaylistFollower/:id/delete", secure.isAuthenticated, followersPlaylist.delete);

// PLAYLIST
router.get("/playlist", secure.isAuthenticated, playlist.create);
router.post("/playlist", secure.isAuthenticated, upload.single("imgPlaylist"), playlist.doCreate);
router.get("/playlist/edit", secure.isAuthenticated, playlist.edit);
router.post("/playlist", secure.isAuthenticated, playlist.doEdit);
router.post("/playlist/addTrack/:idPlaylist/:id", secure.isAuthenticated, playlist.addTrack);
router.post("/playlist/:id/delete", secure.isAuthenticated, playlist.delete);
router.get("/playlist/:id", secure.isAuthenticated, playlist.list);

router.get("/search", spotify.search);
router.get("/albums/:id", spotify.tracks);
router.get("/albums/:id/tracks", spotify.tracks);

router.get("/genres", spotify.genres);
router.get("/genres/:id", spotify.oneGenres);
router.get("/artist/:id", spotify.oneArtist);

module.exports = router;
