import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import moment from "moment";
import {
  Container,
  Grow,
  Paper,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { getSummaries } from "./actions/actions";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.primary.main,
  },
  typ: {
    color: blueGrey[50],
  },
  summary: {
    padding: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(2),
  },
}));

function Summary() {
  const classes = useStyles();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [summaryData, setSummaryData] = useState({
    dischargeDatetime: new Date(),
    patientName: "",
    creatorName: "",
    ic: "",
    allergies: [],
    temperature: 0,
    bloodPressure: "",
    heartRate: 0,
    respiratoryRate: 0,
    spoTwo: 0,
    diagnosis: "",
    appointments: {
      dateTime: new Date(),
      location: "",
    },
    medications: [],
  });
  const dispatch = useDispatch();

  const { id } = useParams();

  const summary = useSelector((state) =>
    id ? state.summaries.find((p) => p._id === id) : null
  );

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  useEffect(() => {
    dispatch(getSummaries());
  }, [dispatch]);

  const logout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (err) {
      throw err;
    }
  };

  const onPrint = () => {
    // test
    console.log("PRINT");
  };

  return (
    <>
      {(authState.isAuthenticated && userInfo && summary && (
        <Container maxWidth="lg">
          <div style={{ textAlign: "center", margin: "40px 0" }}>
            <Button
              id="logout-button"
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
          <Grow in>
            <Container>
              <Paper className={classes.summary}>
                <Typography variant="h4">Discharge Summary</Typography>
                <Button
                  style={{ float: "right", marginRight: "20px" }}
                  size="small"
                  onClick={onPrint}
                >
                  <PrintIcon fontSize="large" />
                </Button>
                <br />
                Discharge date:{" "}
                {moment(summary.dischargeDatetime).format("DD/MM/YYYY")}
                <br />
                Discharge Time:{" "}
                {moment(summary.dischargeDatetime).format("HH:mm")}
                <br />
                Patient Name: {summary.patientName}
                <br />
                IC: {summary.ic}
                <br />
                Allergies:{" "}
                {summary.allergies.map((allergy) => {
                  return (
                    <Typography variant="body2" style={{ marginLeft: "50px" }}>
                      {allergy}
                    </Typography>
                  );
                })}
                <br />
                <Typography variant="h6">Vital Signs:</Typography>
                Temperature: {summary.temperature["$numberDecimal"]} <br />
                Blood Pressure: {summary.bloodPressure} <br />
                Heart Rate: {summary.heartRate} <br />
                <br />
                <Typography variant="h6">Diagnosis:</Typography>
                {summary.diagnosis} <br />
                <br />
                <Typography variant="h6">
                  Upcoming Appointments:
                </Typography>{" "}
                {moment(summary.appointments["dateTime"]).format("DD/MM/YYYY")}
                <br />
                {summary.appointments["location"]}
                <br />
                {moment(summary.appointments["dateTime"]).format("HH:mm")} hrs
                <br />
                <br />
                <Typography variant="h6">Medications:</Typography>
                {summary.medications.map((medication) => {
                  return (
                    <>
                      <Typography variant="body2">{medication.name}</Typography>
                      <Typography variant="body2">
                        {medication.frequency}
                      </Typography>
                      <Typography variant="body2">
                        {medication.specialInstructions}
                      </Typography>
                    </>
                  );
                })}
              </Paper>
            </Container>
          </Grow>
        </Container>
      )) || (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h3" className={classes.typ}>
            Loading...
          </Typography>
        </div>
      )}
    </>
  );
}

export default Summary;
