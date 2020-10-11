import React from "react";
import { useDispatch } from "react-redux";

import Container from "../../components/halfmoon/Container";
import Content from "../../components/halfmoon/Content";
import { AppDispatch, useTypedSelector } from "../../app/store";
import {
  closePlayerDetails,
  openPlayerDetails,
} from "../playerBuilder/playerBuilderSlice";
import NoRosterAvailable from "./NoRosterAvailable";
import CompositionSidebar from "./CompositionSidebar";

const CompositionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const players = useTypedSelector((state) => state.roster.players);
  const numberOfPlayers = players.length;

  const shouldRenderSidebar = numberOfPlayers > 0;

  const handleExpandAll = () => {
    dispatch(openPlayerDetails(players.map((it) => it.id)));
  };

  const handleCollapseAll = () => {
    dispatch(closePlayerDetails(players.map((it) => it.id)));
  };

  if (numberOfPlayers <= 0) {
    return <NoRosterAvailable />;
  }

  return (
    <Container breakpoint="fluid">
      <div className="row">
        {shouldRenderSidebar && (
          <CompositionSidebar
            handleCollapseAll={handleCollapseAll}
            handleExpandAll={handleExpandAll}
          />
        )}
        <div className="col-lg-9">
          <Content>
            <h1 className="content-title font-size-24">
              Build-a-Composition Workshop
            </h1>
            <p>Build a composition here.</p>
          </Content>
          <Content>
            Hi mom
          </Content>
        </div>
      </div>
    </Container>
  );
};

export default CompositionPage;
