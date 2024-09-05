import express from "express"
import bodyParser from "body-parser";
import { dirname } from 'path'
import { fileURLToPath } from "url"
import User from "./user.js"
import Post from "./post.js"


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


var user = new User();
var isAuthorised = false;
var posts = [];

var userData;



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    userData = {
        user: user,
        authorised: isAuthorised,
        posts: posts,
    }
    res.render(__dirname + "/views/index.ejs", userData)
});

app.get("/new-post", (req, res) => {
    userData = {
        user: user,
        authorised: isAuthorised,
        posts: posts,
    }
    res.render(__dirname + "/views/newpost.ejs", userData);
})

app.get("/register", (req, res) => {
    userData = {
        user: user,
        authorised: isAuthorised,
        posts: posts,
    }
    res.render(__dirname + "/views/register.ejs", userData);
});

app.get("/home", (req, res) => {
    console.log(posts);
    userData = {
        user: user,
        authorised: isAuthorised,
        posts: posts,
    }
    res.render(__dirname + "/views/home.ejs", userData);

});

app.get('/load-post', (req, res) => {
    
    const postTitle = req.query.title;
    const post = posts.find(p => p.title === postTitle);

    console.log(post.text); 

    userData = {
        user: user,
        authorised: isAuthorised,
        post: post,
    }
    res.render(__dirname + "/views/post.ejs", userData);

});

app.get('/user-profile', (req, res) => {
    userData = {
        user: user,
        authorised: isAuthorised,
        posts: posts,
    }
    res.render(__dirname + "/views/profile.ejs", userData);
})

app.post("/submit", (req, res) => {
    user.register(req.body["username"]);
    console.log(req.body["username"]);
    isAuthorised = true;

    userData = {
        user: user,
        authorised: isAuthorised,
        posts: posts,
    }
    res.render(__dirname + "/views/home.ejs", userData);
});

app.post("/save-post", (req, res) => {
    console.log(req.body);
    const content = req.body.content;
    const title = req.body.title;

    if (content) {
        console.log("POST request received at /save-post");
        const post = new Post(title, content, user.getName());
        posts.push(post);
        user.posts.push(post);
        
        console.log('Posts:', posts);
        userData = {
            user: user,
            authorised: isAuthorised,
            posts: posts,
        }
    
        res.render(__dirname + "/views/home.ejs", userData);

    } else {
        res.status(400).json({ message: "No content received." });
    }
});

app.get("/delete-post", (req, res) => {
    const postTitle = req.query.title;
    const post = posts.find(p => p.title === postTitle);

    const index = posts.indexOf(post);

    if(index >= 0){
        posts.splice(index, 1);
    }

    userData = {
        user: user,
        authorised: isAuthorised,
        posts: posts,
    }
    res.render(__dirname + "/views/home.ejs", userData);
})


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});