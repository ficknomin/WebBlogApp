import express from "express"
import { dirname } from 'path'
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var username = "";
var isAuthorised = false;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs")
});

app.get("/register", (req, res) => {
    res.render(__dirname + "/views/register.ejs")
});

app.post("/submit", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});