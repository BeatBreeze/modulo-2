require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const SpotifyWebApi = require('spotify-web-api-node');

require("./config/db.config");
require("./config/hbs.config");

const app = express();
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_SPOTIFY_ID,
  clientSecret: process.env.CLIENT_SPOTIFY_SECRET
});
// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(logger("dev"));



const router = require("./config/routes.config");
app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Ready!");
});
