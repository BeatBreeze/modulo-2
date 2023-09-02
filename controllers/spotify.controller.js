const SpotifyWebApi = require("spotify-web-api-node");

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

module.exports.search = (req, res) => {
  let Artists;
  let Tracks;
  let Albums;
  // - ARTISTS
  spotifyApi
    .searchArtists(req.query.search)
    .then((artists) => {
      Artists = artists.body.artists.items;
    })
    // - TRACKS
    .then(() => {
      spotifyApi.searchTracks(req.query.search).then((tracks) => {
        Tracks = tracks.body.tracks.items;
      });
    })
    // - ALBUMS
    .then(() => {
      spotifyApi.searchAlbums(req.query.search).then((albums) => {
        Albums = albums.body.albums.items;
        res.render("music/search", {
          artists: { Artists: Artists, Tracks: Tracks, Albums: Albums },
        });
      });
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
};

module.exports.albums = (req, res) => {
  spotifyApi
    .getArtistAlbums(req.params.id)
    .then((data) => {
      const httpHeader = res.req.rawHeaders.find((header) =>
        header.startsWith("http")
      );
      res.render("music/albums", {
        albums: data.body.items,
        artist: data.body.items[0].artists[0].name,
        httpHeader: httpHeader,
      });
    })
    .catch((err) =>
      console.log("The error while searching albums occurred: ", err)
    );
};

module.exports.tracks = (req, res) => {
  spotifyApi
    .getAlbumTracks(req.params.id)
    .then((tracks) => {
      res.render("music/tracks", { tracks: tracks.body.items });
    })
    .catch((err) =>
      console.log("The error while searching albums occurred: ", err)
    );
};

module.exports.genres = (req, res) => {
  spotifyApi.getAvailableGenreSeeds().then(
    function (data) {
      let genreSeeds = data.body;
      console.log(genreSeeds);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};

module.exports.oneGenres = (req, res) => {
  console.log("Genre", req.params.id);
  spotifyApi
    .getRecommendations({
      min_energy: 0.4,
      seed_genres: [req.params.id],
      min_popularity: 50,
    })
    .then(
      function (data) {
        let recommendations = data.body;
        console.log(recommendations);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};