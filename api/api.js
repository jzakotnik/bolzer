var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var registeredParticipants = [];

var jsonParser = bodyParser.json();

var corsOptions = {
  origin: "https://bolzer.me",
};

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

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
  registeredParticipants.length > 0
    ? res.json(registeredParticipants)
    : res.json(["Noch niemand"]);
  //res.json(registeredParticipants);
});

app.post("/participant", jsonParser, (req, res, next) => {
  console.log("Received new participant, here is the new entry");
  console.log(req.body);
  registeredParticipants.push(req.body);
  res.json(registeredParticipants);
  console.log("Received new participant, here is the db");
  console.log(registeredParticipants);
});

app.delete("/participant", jsonParser, (req, res, next) => {
  console.log("Received new participant for deletion, here is the new entry");
  console.log(req.body);
  const newparticipants = registeredParticipants.filter(function (obj) {
    return obj.id !== req.body.participantID;
  });
  console.log("New database after deletion:");
  console.log(newparticipants);
  registeredParticipants = [...newparticipants];
  res.json(registeredParticipants);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
