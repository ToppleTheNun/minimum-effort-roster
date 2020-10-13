import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import PageWrapper from "../components/halfmoon/PageWrapper";
import ContentWrapper from "../components/halfmoon/ContentWrapper";
import AppNavbar from "../components/AppNavbar";
import PlayerBuilderPage from "../features/playerBuilder/PlayerBuilderPage";
import store from "./store";
import CompositionPage from "../features/composition/CompositionPage";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PageWrapper withNavbar>
          <AppNavbar />
          <ContentWrapper>
            <Switch>
              <Route path="/builder">
                <PlayerBuilderPage />
              </Route>
              <Route path="/composition">
                <CompositionPage />
              </Route>
              <Route path="/">
                <Redirect to="/builder" />
              </Route>
            </Switch>
          </ContentWrapper>
        </PageWrapper>
      </Provider>
    </Router>
  );
}

export default App;
