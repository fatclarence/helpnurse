import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Paper, makeStyles, Typography, Avatar } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
      width: theme.spacing(35),
      height: theme.spacing(35),
    },
  },
  paper: {
    borderRadius: "15px",
  },
  cardContainer: {
    margin: "20px 40px",
    flexDirection: "column",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

function Summaries() {
  const classes = useStyles();
  const summaries = useSelector((state) => state.summaries);
  return (
    <div className={classes.root}>
      {summaries?.map((summary) => (
        <Paper className={classes.paper} elevation={3} key={summary._id}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/${summary._id}`}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Avatar className={classes.purple}>
                {summary.patientName[0]}
              </Avatar>
            </div>
            <Grid container className={classes.cardContainer} spacing={2}>
              <Grid item>
                <Typography variant="h5">{summary.patientName}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Discharge Date:{" "}
                  {moment(summary.dischargeDatetime).format("DD/MM/YYYY")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Discharge Time:{" "}
                  {moment(summary.dischargeDatetime).format("HH:mm")} hrs
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Nurse-in-charge: {summary.creatorName}
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </Paper>
      ))}
    </div>
  );
}

export default Summaries;
