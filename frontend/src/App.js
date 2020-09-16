import React, { useState, useEffect } from "react";
import axios from "axios";
import useInterval from "use-interval";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";

import SignInSide from "./SignInSide";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  header: {
    height: 48,
    font: "courier",
  },
}));

function App() {
  //const classes = useStyles();
  const [participants, setParticipants] = useState([]);

  async function fetchData() {
    const result = await axios("http://localhost:4000/participants");
    console.log("Got some results from the API Call:");
    console.log(result);
    setParticipants(result.data);
  }

  async function deleteData(participantID) {
    console.log("Deleting data");
    console.log(participantID);
    const result = await axios({
      method: "delete",
      url: "http://localhost:4000/participant",
      data: { participantID },
    });
    console.log(result);
  }

  async function insertData(participant) {
    //const result = await axios("http://localhost:4000/participants");
    const result = await axios({
      method: "post",
      url: "http://localhost:4000/participant",
      data: participant,
    });
    console.log("Inserted Data...");
    console.log(participant);
  }

  useInterval(() => {
    // Your custom logic here
    console.log("Getting some data from API");
    fetchData();
  }, 50000000);

  useEffect(() => {
    fetchData();
  }, []);

  function addParticipant(newParticipant) {
    const newparticipants = [...participants];
    const uniqueParticipant = { id: uuidv4(), participant: newParticipant };
    newparticipants.push(uniqueParticipant);
    console.log("Adding data to DB API:");
    console.log(uniqueParticipant);
    insertData(uniqueParticipant);
    setParticipants(newparticipants);

    console.log(participants);
  }

  function deleteParticipant(participantID) {
    //const newparticipants = [...participants];
    console.log("Deleting participant..");
    console.log(participantID);
    deleteData(participantID);
    const newparticipants = participants.filter(function (obj) {
      return obj.id !== participantID;
    });
    setParticipants(newparticipants);
  }

  return (
    <div>
      <SignInSide
        participants={participants}
        addParticipant={addParticipant}
        deleteParticipant={deleteParticipant}
      />
    </div>
  );
}

export default App;
