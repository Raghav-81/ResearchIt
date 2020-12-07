const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  comment:{
  	type: String,
  	required: true
  },
});
module.exports = Comment = mongoose.model("comments", CommentsSchema);