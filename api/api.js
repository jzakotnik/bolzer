var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const registeredParticipants = ["Jure", "Hanna"];

var jsonParser = bodyParser.json();

var corsOptions = {
  origin: "http://localhost",
};

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/participants", (req, res, next) => {
  res.json(registeredParticipants);
});

app.post("/participant", jsonParser, (req, res, next) => {
  console.log("Received new participant");
  console.log(req.body);
  registeredParticipants.push(req.body.participant);
  res.json(registeredParticipants);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
