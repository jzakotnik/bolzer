import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Divider from "@material-ui/core/Divider";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import { createMuiTheme } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Impressum "}
      <Link color="inherit" href="https://bolzer.me/impressum.html">
        hier klicken
      </Link>{" "}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(background.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //backgroundRepeat: "no-repeat",
    //backgroundSize: "cover",
    //backgroundPosition: "center",
    //backgroundImage: "url(background.jpg)",
  },
  avatarList: {
    margin: 10,
    justifycontent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatarText: {
    paddingLeft: "10px",
    paddingRight: "50px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const [enteredName, setEnteredName] = useState("");

  const classes = useStyles();
  //console.log("Propos changed");

  const onChange = (e) => {
    setEnteredName(e.target.value);
    //console.log(enteredName);
  };

  const onSaveName = () => {
    props.addParticipant(enteredName);
    setEnteredName("");
  };

  const onDeleteName = (id) => {
    console.log(id);
    props.deleteParticipant(id);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ich bin auf dem Bolzer
          </Typography>
          <form
            className={classes.form}
            noValidate
            onKeyPress={(ev) => {
              //prevent enter from submitting form
              //console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                ev.preventDefault();
              }
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              onChange={onChange}
              value={enteredName}
              required
              fullWidth
              id="participantName"
              label="Vorname"
              name="email"
              inputProps={{ maxLength: 15 }}
              autoComplete="email"
              autoFocus
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSaveName}
            >
              Ich bin da
            </Button>
          </form>

          <Avatar className={classes.avatar}>
            <LocationOnIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Wer ist schon da
          </Typography>
          <List>
            {props.participants.map((value) => {
              return (
                <div key={value.id}>
                  <ListItemAvatar>
                    <div className={classes.avatarList}>
                      <Avatar>
                        <InsertEmoticonIcon />
                      </Avatar>
                      <ListItemText
                        className={classes.avatarText}
                        primary={value.participant}
                      />
                      <Button
                        onClick={() => onDeleteName(value.id)}
                        key={value.id}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DeleteForeverIcon />}
                      >
                        Weg
                      </Button>
                    </div>
                  </ListItemAvatar>

                  <Divider />
                </div>
              );
            })}
          </List>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
