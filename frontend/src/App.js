import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(async () => {
    const result = await axios("http://localhost:4000/participants");
    console.log("Got some results from the API Call:");
    console.log(result);
    setParticipants(result.data);
  }, []);

  function addParticipant(newParticipant) {
    const newparticipants = [...participants];
    newparticipants.push(newParticipant);
    setParticipants(newparticipants);
    console.log(participants);
  }

  function deleteParticipant(indexParticipant) {
    const newparticipants = [...participants];
    newparticipants.splice(indexParticipant, 1);
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
