const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistFollowerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  playlist: {
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
    required: true,
  }
});

const  PlaylistFollower = mongoose.model("playlistFollower",  playlistFollowerSchema);
module.exports =  PlaylistFollower;