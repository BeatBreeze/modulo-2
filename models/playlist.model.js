const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playListSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name Playlist Required'
  },
  tracks: { type: Array },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Playlist = mongoose.model("Playlist", playListSchema);
module.exports = Playlist;