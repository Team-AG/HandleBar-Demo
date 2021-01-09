//dependencies
// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");



// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");
const app = express();


// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + "/controllers/public"));
// We need to use sessions to keep track of our user's login status
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));



//Parse application body 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


//set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Syncing our database and logging a message to the user upon success
//Start server so that it can listen
db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});