import React from "react";

import Content from "../../components/halfmoon/Content";
import Container from "../../components/halfmoon/Container";
import PlayerBuilderForm from "./PlayerBuilderForm";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import {
  openPlayerDetails,
  closePlayerDetails,
  stopEditingPlayer,
} from "./playerBuilderSlice";
import PlayerBuilderSidebar from "./PlayerBuilderSidebar";

const PlayerBuilderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const players = useTypedSelector((state) => state.roster.players);

  const handleAddNew = () => {
    dispatch(stopEditingPlayer());
  };

  const handleExpandAll = () => {
    dispatch(openPlayerDetails(players.map((it) => it.id)));
  };

  const handleCollapseAll = () => {
    dispatch(closePlayerDetails(players.map((it) => it.id)));
  };

  return (
    <Container breakpoint="fluid">
      <div className="row">
        <PlayerBuilderSidebar
          handleAddNew={handleAddNew}
          handleCollapseAll={handleCollapseAll}
          handleExpandAll={handleExpandAll}
        />
        <div className="col-lg-9">
          <Content>
            <h1 className="content-title font-size-24">
              Build-a-Player Workshop
            </h1>
            <p>Build a player here.</p>
          </Content>
          <Content>
            <PlayerBuilderForm />
          </Content>
        </div>
      </div>
    </Container>
  );
};

export default PlayerBuilderPage;
