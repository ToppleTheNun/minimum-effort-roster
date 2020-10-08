import React from "react";

import PageWrapper from "./components/halfmoon/PageWrapper";
import ContentWrapper from "./components/halfmoon/ContentWrapper";
import AppNavbar from "./components/AppNavbar";
import PlayerBuilder from "./components/PlayerBuilder/PlayerBuilder";
import RosterProvider from "./components/RosterProvider";

function App() {
  return (
    <PageWrapper withNavbar>
      <RosterProvider>
        <AppNavbar />
        <ContentWrapper>
          <PlayerBuilder />
        </ContentWrapper>
      </RosterProvider>
    </PageWrapper>
  );
}

export default App;
