const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const data = require("./data.js");
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const uri = "mongodb://localhost:27017/blogDB";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

const Blog = mongoose.model("blog", BlogSchema);

const posts = [];

app.get("/", (req, res) => {
  const content = data.getStringForRoute("home");

  Blog.find({}).then((blog) => {
    console.log(posts.length+" posts we have");
    if (posts.length == 0) {
      console.log(blog.length+" datas on database");
      for (let i = 0; i < blog.length; i++) {
        posts.push({
          title: blog[i].title,
          content: blog[i].body,
        });
      }
      res.render("home", {
        content: content,
        title: "home",
        posts: posts,
      });
    } else {
      console.log("else'aaaa");
      res.render("home", {
        content: content,
        title: "home",
        posts: posts,
      });
    }
  });
});

app.get("/about", (req, res) => {
  const content = data.getStringForRoute("about");
  res.render("about", { content: content, title: "about" });
});

app.get("/contact", (req, res) => {
  const content = data.getStringForRoute("contact");
  res.render("contact", { content: content, title: "contact" });
});

app.get("/compose", (req, res) => {
  const content = data.getStringForRoute("compose");
  res.render("compose", { content: content, title: "compose" });
});

app.post("/compose", (req, res) => {
    console.log("check the V"+req.body);

    const blog = new Blog({
    title : req.body.postTitle,
    body : req.body.postBody
})

blog.save().then(() => {
    console.log("compose saved");
    res.redirect("/");
}).catch((err)=>{
    console.log("error in composing "+err);
res.redirect("/");}) 
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  let title;
  console.log("the input was "+requestedTitle);
  posts.forEach((post) => {
    const storedData = _.lowerCase(post.title);
    if (requestedTitle === storedData) {
      res.render("posts", {
        title: storedData,
        content: post.content,
      });
    }
  });
});


app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
