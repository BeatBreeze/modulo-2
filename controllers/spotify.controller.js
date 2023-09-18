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
    .getAlbum(req.params.id)
    .then((album) => {
      const httpHeader = res.req.rawHeaders.find((header) =>
        header.startsWith("http")
      );
      res.render("music/tracks", {
        tracks: album.body.tracks.items,
        AlbumInfo: album.body,
        httpHeader: httpHeader,
      });
    })
    .catch((err) =>
      console.log("The error while searching albums occurred: ", err)
    );
};
/*Géneros musicales*/
module.exports.genres = (req, res) => {
  spotifyApi.getAvailableGenreSeeds().then(
    function (data) {
      let genreSeeds = data.body.genres;
      res.render("music/genres",{genreSeeds:genreSeeds});
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};
/*Búsqueda por un Género*/
module.exports.oneGenres = (req, res) => {
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

module.exports.oneArtist = (req, res) => {
  const httpHeader = res.req.rawHeaders.find((header) =>
    header.startsWith("http")
  );
  let Artists;
  spotifyApi
    .getArtist(req.params.id)
    .then(function (artist) {
      Artists = artist.body;
    })
    .then(() => {
      spotifyApi.getArtistAlbums(req.params.id).then((albums) => {
        res.render("music/artists", {
          Info: { Artists: Artists, Albums: albums.body.items },
          httpHeader: httpHeader,
        });
      });
    })
    .catch((err) =>
      console.log("The error while searching artist occurred: ", err)
    );
};
/*Géneros más populares*/
module.exports.home = (req, res) => {
 let charts;
 let strongest;
 let instrumentals;
 let workouts;
//Charts//
 spotifyApi
 .getRecommendations({
  seed_genres: "chill,techno,house,metal,hardstyle",
  min_popularity: 75,
  limit: 10
 })
 .then((data) => {
  charts = data.body.tracks
 })
 //strongest//
 .then(() => {
  spotifyApi.getRecommendations({
    seed_genres:"hardstyle",
      min_tempo: 150,
      popularity: 55,
      limit: 9
  })
  .then((data) => {
  strongest= data.body.tracks;
  });
  //RoofTop vibes//
  spotifyApi.getRecommendations({
    seed_genres:"chill",
    min_tempo:100,
    popularity:65,
    limit:9
  })
  .then ((data) => {
    instrumentals = data.body.tracks;
  });
  //Workouts//
  spotifyApi.getRecommendations({
    seed_genres:"edm,electro,dance,dancehall,house",
    min_tempo:128,
    popularity:65,
    limit:9
  })
  .then ((data) => {
    workouts = data.body.tracks;
    res.render("home",{charts:charts,strongest:strongest,instrumentals:instrumentals,workouts:workouts})
  });
});
}
