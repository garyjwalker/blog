//jshint esversion:6

const express = require("express")
const ejs = require("ejs")
const _ = require("lodash")

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."

// For storing posts.
const posts = [{title: "Test", content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit derp derp derp derp duuuuuruuurururururururu"},
               {title: "Testicles", content: "Testicles testicles testicles testicles testicles."}]


// Route root / requests.
app.get("/", (req, res) => {
  res.render("home", {homeContent: homeStartingContent, posts: posts})
})


// Route home requests.
app.get("/home", (req, res) => {
  res.redirect("/")
})


// Route home post requests.
app.get("/posts/:postTitle", (req, res) => {
  // Search if postTitle is found in posts.
  const postTitle = _.lowerCase(req.params.postTitle)

  let index = 0
  let found = false

  while(index < posts.length && !found) {
    if (postTitle === _.lowerCase(posts[index].title)) {
      found = true
    } else {
      index++
    }
  }

  if (found) {
    res.render("post", {post: posts[index]})
  } else res.redirect("/")
})


// Route home requests.
app.get("/about", (req, res) => {
  res.render("about", {message: aboutContent})
})


// Route contact requests.
app.get("/contact", (req, res) => {
  res.render("contact", {message: contactContent})
})


// Route compose requests.
app.get("/compose", (req, res) => {
  res.render("compose")
})


// Route post from compose.
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  }

  posts.push(post)
  
  res.redirect("compose")
})


// Start listening on port.
app.listen(3000, function() {
  console.log("Server started on port 3000")
})
