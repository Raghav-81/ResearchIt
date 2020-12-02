const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PostSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  comments:{
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
});
module.exports = Post = mongoose.model("posts", PostSchema);