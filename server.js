const express = require("express");
const app = express();


app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false}));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/resources', express.static(__dirname + '/public/resources'));


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});


app.listen(3000);