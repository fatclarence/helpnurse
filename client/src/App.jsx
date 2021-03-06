import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import config from "./config";

import Home from "./Home";
import Dashboard from "./Dashboard";
import Summary from "./Summary";

const oktaAuth = new OktaAuth(config.oidc);

function App() {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login/callback" component={LoginCallback} />
        <SecureRoute path="/dashboard" exact component={Dashboard} />
        <SecureRoute path="/dashboard/:id" component={Summary} />
      </Switch>
    </Security>
  );
}

export default App;
