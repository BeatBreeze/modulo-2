const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playListSchema = new Schema({
  tracks: { type: mongoose.Schema.Types.ObjectId, ref: "Tracks" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Playlist = mongoose.model("Playlist", playListSchema);
module.exports = Playlist;
