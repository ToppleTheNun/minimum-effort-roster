import React from "react";
import classNames from "classnames";

import Content from "../../components/halfmoon/Content";
import Container from "../../components/halfmoon/Container";
import PlayerBuilderForm from "./PlayerBuilderForm";
import PlayerBuilderRosterList from "./PlayerBuilderRosterList";
import { AppDispatch, useTypedSelector } from "../../app/store";
import Button from "../../components/halfmoon/Button";
import { useDispatch } from "react-redux";
import {
  openPlayerDetails,
  closePlayerDetails,
  stopEditingPlayer,
} from "./playerBuilderSlice";

const PlayerBuilderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const players = useTypedSelector((state) => state.roster.players);
  const numberOfPlayers = players.length;

  const shouldRenderSidebar = numberOfPlayers > 0;

  const sidebarClasses = classNames({
    "col-lg-auto": !shouldRenderSidebar,
    "col-lg-3": shouldRenderSidebar,
  });
  const mainContentClasses = classNames({
    "col-lg": !shouldRenderSidebar,
    "col-lg-9": shouldRenderSidebar,
  });

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
        {shouldRenderSidebar && (
          <div className={sidebarClasses}>
            <Content className="m-0">
              <div
                className="btn-group w-full"
                role="group"
                aria-label="Basic example"
              >
                <Button color="success" onClick={handleAddNew} type="button">
                  Add New
                </Button>
              </div>
              <div
                className="btn-group w-full"
                role="group"
                aria-label="Basic example"
              >
                <Button onClick={handleCollapseAll} type="button">
                  Collapse All
                </Button>
                <Button onClick={handleExpandAll} type="button">
                  Expand All
                </Button>
              </div>
            </Content>
            <PlayerBuilderRosterList />
          </div>
        )}
        <div className={mainContentClasses}>
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
