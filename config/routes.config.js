const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const spotify = require("../controllers/spotify.controller");


router.get("/register", users.register);
router.post("/register", users.doRegister);
// router.get('/login', users.login);
// router.post('/login', users.doLogin);
// router.get('/profile', secure.isAuthenticated, users.profile);

router.get("/", users.home);
// router.get("/users/:id", secure.isAuthenticated, users.detail);
// router.get("/users/:id/edit", secure.isAuthenticated, users.edit);
// router.post("/users/:id", secure.isAuthenticated, users.doEdit);
// router.post("/users/:id/delete", secure.isAuthenticated, users.delete);

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