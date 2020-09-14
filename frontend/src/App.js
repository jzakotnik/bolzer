import React, { useState } from "react";

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
  const [participants, setParticipants] = useState([
    "Jure",
    "Hanna",
    "Carlotta",
  ]);

  function addParticipant(newParticipant) {
    const newparticipants = [...participants];
    newparticipants.push(newParticipant);
    setParticipants(newparticipants);
    console.log(participants);
  }

  return (
    <div>
      <SignInSide participants={participants} addParticipant={addParticipant} />
    </div>
  );
}

export default App;
