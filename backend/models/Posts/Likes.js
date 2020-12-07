const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikesSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
});
module.exports = Post = mongoose.model("likes", LikesSchema);