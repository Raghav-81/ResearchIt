const router = require("express").Router();
const Post = require("../models/Posts/Post");
const Likes = require("../models/Posts/Likes");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Comment = require("../models/Posts/Comments");

router.post("/newpost",auth,async (req,res) => {
	try{
		let {title,body, query} = req.body
		if (!title || !body )
      		return res.status(400).json({ msg: "Not all fields have been entered." });
		console.log(query)
		if(query == 0 || query ==-1)
			return res.status(400).json({ msg: "No file uploaded" });
		const verifyuser = await User.findById(req.user);
		if(!verifyuser){
			return res
        .status(400)
        .json({ msg: "Pls Login first" });
		}
		
		const newPost = new Post({
			userId: req.user,
			body: body,
			title: title,
			filename: query,
		})
		const savedPost = await newPost.save();
    	res.json(savedPost);
	} catch (err) {
		console.log(err)
    res.status(500).json({ error: err.message });
  }

});

router.post("/likes" ,async (req, res) => {
	try{
		let {userid,postid} = req.body;
		const verifypost  = await Post.findById(postid);
		if(!verifypost){
			return res
        .status(500)
        .json({ error: "Not a post" });
		}
		await Post.findByIdAndUpdate(postid, {$inc : {'likes' : 1}})
		const post  = await Post.findById(postid)
		const newLike = new Likes({
			userId: userid,
			postId: postid,
		})
		const savedLike = await newLike.save();
		res.json(savedLike)
	} catch(err){
		console.log(err)
		res.status(500).json({error: err.message})
		return;
	}
})


module.exports=router;
