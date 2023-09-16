const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playListSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name Playlist Required",
    },
    imgPlaylist: {
      type: String,
    },
    tracks: { type: Array },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playListSchema);
module.exports = Playlist;
