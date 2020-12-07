const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Posts/Post");
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, userName } = req.body;

    if (!email || !password || !passwordCheck || !userName)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const existName = await User.findOne({ Name: userName });
    if (existName)
      return res
        .status(400)
        .json({ msg: "An account with this userName already exists." });
    
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: passwordHash,
      Name: userName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    var user = await User.findOne({ email: email });
    if (!user)
      user = await User.findOne({Name: email})
      if(!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token.toString(), process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

router.post("/contact", async(req,res) =>{
  try{
    const {name, email,phone,complain} = req.body;
    if (!email || !name || !phone || !complain)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    var transporter = require('nodemailer').createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.password,
      }
    }, function(error){
      res.status(400).json({error: error})
    });
    var mailOptions = {
      from: process.env.email,
      to: process.env.email,
      subject: 'Complain or Enquiry',
      text: 'Name:' + name + "\nEmail:" + email + "\nPhone:" + phone +"\nMessage:" + complain,
    };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.json(mailOptions)
  } catch(err){
    console.log(err)
    res.status(500),json({error: err.message})
  }

});

router.get("/profile" ,auth, async(req,res) => {
  try{
    const user = await User.findById(req.user);  
    const posts = await Post.find({userId: user._id})
    res.send(posts)
  } catch(err){
    console.log(err)
    res.status(500).json({error: err.message})
  }
})

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
  });
});
module.exports = router;