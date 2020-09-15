var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const registeredParticipants = [];

var jsonParser = bodyParser.json();

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
