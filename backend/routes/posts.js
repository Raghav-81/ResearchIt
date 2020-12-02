const router = require("express").Router();
const Post = require("../models/Posts/Post");
const Likes = require("../models/Posts/Likes");
const User = require("../models/User")
const Comment = require("../models/Posts/Comments")
router.post("/newpost",async (req,res) => {
	try{
		let {userid, body} = req.body

		const verifyuser = await User.findById(userid);
		if(!verifyuser){
			return res
        .status(500)
        .json({ msg: "Not a real user" });
		}
		const newPost = new Post({
			userId: userid,
			body: body,
		})
		const savedPost = await newPost.save();
    	res.json(savedPost);
	} catch (err) {
    res.status(500).json({ error: err.message });
  }

});

router.delete("/deletepost", async (req,res) =>{
	try{
	const deletedPost = await Post.findByIdAndDelete(req.query.id);
	const deletealllikes = await Likes.deleteMany({postid: req.query.id})
	const deleteallcomments = await Comment.deleteMany({postid: req.query.id})
	res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});
router.all("/likes" , async (req, res) => {
	try{
		let {userid , postid} = req.body;
		const verifyuser = await User.findById(userid);
		if(!verifyuser){
			return res
        .status(500)
        .json({ error: "Not a real user" });
		}
		const verifypost  = await Post.findById(postid);
		if(!verifypost){
			return res
        .status(500)
        .json({ error: "Not a post" });
		}
		const checklike = await Likes.findOne({userId: userid, postId: postid})
		if(checklike){
			const deletelike = await Likes.deleteOne({userId: userid, postId: postid})
			await Post.findByIdAndUpdate(postid, {$inc : {'likes' : -1}})		
			const post  = await Post.findById(postid)
			res.json(post)
			res.json(deletelike)
		}
		else{
		await Post.findByIdAndUpdate(postid, {$inc : {'likes' : 1}})
		const post  = await Post.findById(postid)
		res.json(post)
		const newLike = new Likes({
			userId: userid,
			postId: postid,
		})
		const savedLike = await newLike.save();
    	res.json(savedLike);
		}
	} catch(err){
		res.status(500).json({error: err.message})
	}
})

router.post("/comments" , async (req, res) => {
	try{
		let {userid , postid , body} = req.body;
		const verifyuser = await User.findById(userid);
		if(!verifyuser){
			return res
        .status(500)
        .json({ error: "Not a real user" });
		}
		const verifypost  = await Post.findById(postid);
		if(!verifypost){
			return res
        .status(500)
        .json({ error: "Not a post" });
		}
		await Post.findByIdAndUpdate(postid, {$inc : {'comments' : 1}})
		const post  = await Post.findById(postid)
		res.json(post)
		const newComment = new Comment({
			userId: userid,
			postId: postid,
			comment: body,
		})
		const savedComment = await newComment.save();
    	res.json(savedComment);
	} catch(err){
		res.status(500).json({error: err.message})
	}
})

router.delete("/deletecomment", async (req,res) =>{
	try{
		let {userid, postid, body} = req.body;
	const deletedComment = await Comment.deleteOne({userId: userid, postId: postid, comment: body});
	await Post.findByIdAndUpdate(postid, {$inc : {'comments' : -1}})		
	const post  = await Post.findById(postid)
	res.json(post)
	res.json(deletedComment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports=router;
