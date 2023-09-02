const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const spotify = require("../controllers/spotify.controller");
const playlist = require("../controllers/playlist.controller");
const secure = require ("../middlewares/secure.mid");


router.get("/register", users.register);
router.post("/register", users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.post("/logout", secure.isAuthenticated, users.logout);

router.get("/", users.home);
router.get("/profile", secure.isAuthenticated, users.profile);
router.get('/playlist', secure.isAuthenticated, playlist.create);
router.post('/playlist', secure.isAuthenticated, playlist.doCreate);
// router.get("/profile/:id/edit", secure.isAuthenticated, users.edit);
// router.post("/profile/:id", secure.isAuthenticated, users.doEdit);

router.get("/search", spotify.search);
router.get("/albums/:id", spotify.albums);
router.get("/albums/:id/tracks", spotify.tracks);

router.get("/genres", spotify.genres); // Todos los generos
router.get("/genres/:id", spotify.oneGenres); // Genero especifico
// router.get("/artists", spotify.artists); // Todos los artista
// router.get("/artist/:id", spotify.oneArtist); // Genero especifico

// Seguir otros usuarios si da la vida
// router.get("/users", users.list);


module.exports = router;