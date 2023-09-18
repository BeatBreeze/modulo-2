const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerUserSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otherUser: {
      type: Schema.Types.ObjectId,
      ref: "OtherUser",
      required: true,
    },
  },
  { timestamps: true }
);

const FollowerUser = mongoose.model("follower", followerUserSchema);
module.exports = FollowerUser;
