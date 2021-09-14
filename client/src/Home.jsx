import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";

import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "100px 0 20px",
    color: theme.palette.primary.light,
  },
}));

function Home() {
  const classes = useStyles();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      history.push("/dashboard");
    }
  }, [authState, oktaAuth, history]); // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: "/" });
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Typography className={classes.heading} variant="h1" align="center">
        Okta Nurse
      </Typography>
      {authState.isAuthenticated && !userInfo && (
        <div>Loading user information...</div>
      )}
      {!authState.isAuthenticated && (
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          <Button
            id="login-button"
            variant="contained"
            color="primary"
            onClick={login}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
}

export default Home;
