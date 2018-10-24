var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlinesdb";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, (err) =>{
    if(err) {
        console.log(err);
    }
    else {
        console.log("Mongoose connection is successful");
    }
});

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

app.listen(PORT, ()=>{
    console.log("Listening on port:" + PORT);
});