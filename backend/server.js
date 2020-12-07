const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './.env' });


const app = express();
const User = process.env.MONGODB_CONNECTION_STRING;
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
const auth = require("./middleware/auth");

app.post("/upload",auth,function(req, res,next)
{   

    var file;
    if(!req.files)
    {
        res.redirect("http://localhost:3000/newpost?fileuploaded=0")
        return;
    }

    sampleFile = req.files.sampleFile;  // here is the field name of the form
    name = req.files.sampleFile.name
    sampleFile.mv('../public/uploads/'+req.user+"file:"+name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.redirect("http://localhost:3000/newpost?fileuploaded=uploads/"+req.user+"file:"+name);
  });

});

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

const users= require("./routes/user.js");
app.use("/api/users", users);

const posts = require("./routes/posts.js");
app.use("/api/posts/",posts);

app.listen(5000,() => console.log('Listening on 5000'))