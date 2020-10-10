import React from "react";

import Content from "../halfmoon/Content";
import Container from "../halfmoon/Container";
import PlayerBuilderForm from "./PlayerBuilderForm";
import PlayerBuilderRosterList from "./PlayerBuilderRosterList";

const PlayerBuilder = () => {
  return (
    <Container breakpoint="fluid">
      <div className="row">
        <div className="col-lg-3">
          <PlayerBuilderRosterList />
        </div>
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

export default PlayerBuilder;
