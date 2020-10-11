import React from "react";
import { Provider } from "react-redux";

import PageWrapper from "../components/halfmoon/PageWrapper";
import ContentWrapper from "../components/halfmoon/ContentWrapper";
import AppNavbar from "../components/AppNavbar";
import PlayerBuilderPage from "../features/playerBuilder/PlayerBuilderPage";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
        <PageWrapper withNavbar>
          <AppNavbar />
          <ContentWrapper>
            <PlayerBuilderPage />
          </ContentWrapper>
        </PageWrapper>
    </Provider>
  );
}

export default App;
