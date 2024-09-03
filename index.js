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
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

app.get("/", (req, res) => {
    userData = {
        name: user.getName(),
        authorised: isAuthorised,
    }
    res.render(__dirname + "/views/index.ejs", userData)
});

app.get("/newpost", (req, res) => {
    userData = {
        name: user.getName(),
        authorised: isAuthorised,
    }
    res.render(__dirname + "/views/newpost.ejs", userData);
})

app.get("/register", (req, res) => {
    userData = {
        name: user.getName(),
        authorised: isAuthorised,
    }
    res.render(__dirname + "/views/register.ejs", userData);
});

app.get("/home", (req, res) => {
    userData = {
        name: user.getName(),
        authorised: isAuthorised,
    }
    res.render(__dirname + "/views/home.ejs", userData);
});

app.post("/submit", (req, res) => {
    user.register(req.body["username"]);
    console.log(req.body["username"]);
    isAuthorised = true;

    userData = {
        name: user.getName(),
        authorised: isAuthorised,
    }
    res.render(__dirname + "/views/home.ejs", userData);
});

app.post("/save-post", (req, res) => {
    console.log("POST request received at /save-post");
    const content = req.body.content;

    if (content) {
        posts.push(content);
        console.log('Content saved:', content);
        res.json({ message: "Post saved successfully" });
    } else {
        res.status(400).json({ message: "No content received." });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});