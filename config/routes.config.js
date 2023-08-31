const express = require ("express");
const router = express.Router ();
const homes = require('../controllers/home.controller');

router.get("/", homes.home);

module.exports = router;