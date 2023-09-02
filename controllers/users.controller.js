const User = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.home = (req, res) => {
  res.render("home", {});
};

module.exports.register = (req, res, next) => res.render("users/register"); 

module.exports.doRegister = (req, res, next) => {
  User.create(req.body) 
    .then((user) => res.redirect("users/register"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/register", { user: req.body, errors: error.errors }) 
        
      } else {
        next(error); 
      }
    })
}