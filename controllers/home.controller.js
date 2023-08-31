const User = require ("../models/user.model");
const mongoose = require ("mongoose");

module.exports.home = (req, res) => {
    res.render("home", {});
  };