import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import PageWrapper from "../components/halfmoon/PageWrapper";
import ContentWrapper from "../components/halfmoon/ContentWrapper";
import AppNavbar from "../components/AppNavbar";
import PlayerBuilderPage from "../features/playerBuilder/PlayerBuilderPage";
import store from "./store";
import CompositionPage from "../features/composition/CompositionPage";
import Container from "../components/halfmoon/Container";
import Content from "../components/halfmoon/Content";
import Joyride from "../components/Joyride";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PageWrapper withNavbar>
          <Joyride />
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
            <Container
              breakpoint="fluid"
              className="bg-very-dark-dm bg-white-lm overflow-auto"
            >
              <div className="row row-eq-spacing-lg">
                <div className="col-lg-3" />
                <div className="col-lg-3" />
                <div className="col-lg-3" />
                <div className="col-lg-3">
                  <Content className="p-10">
                    <div className="text-muted">
                      © Copyright 2020 Richard Harrah
                    </div>
                  </Content>
                </div>
              </div>
            </Container>
          </ContentWrapper>
        </PageWrapper>
      </Provider>
    </Router>
  );
}

export default App;
