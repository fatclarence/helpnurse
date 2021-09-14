import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";

import { Button, Typography, makeStyles } from "@material-ui/core";
import { getSummaries } from "./actions/actions";
import { blueGrey } from "@material-ui/core/colors";
import Summaries from "./Summaries";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.primary.main,
  },
  typ: {
    color: blueGrey[50],
  },
}));

function Dashboard() {
  const classes = useStyles();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (err) {
      throw err;
    }
  };

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
    // Fetch and update state of summaries
    dispatch(getSummaries());
  }, [dispatch]);

  return (
    <>
      {(authState.isAuthenticated && userInfo && (
        <>
          <Typography className={classes.heading} variant="h2" align="center">
            Dashboard
          </Typography>
          <div>
            <div style={{ textAlign: "center" }}>
              <Button
                id="logout-button"
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
            <Summaries />
            {console.log(userInfo)}
          </div>
        </>
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

export default Dashboard;
