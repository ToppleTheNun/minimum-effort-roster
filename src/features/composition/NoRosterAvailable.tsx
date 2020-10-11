import React from "react";
import { Link } from "react-router-dom";

import Content from "../../components/halfmoon/Content";
import Container from "../../components/halfmoon/Container";

const NoRosterAvailable = () => (
  <Container breakpoint="fluid">
    <Content>
      <h1 className="content-title font-size-24">
        Build-a-Composition Workshop
      </h1>
      <p>You need a roster in order to create a composition.</p>
      <p>Build your roster and then come back.</p>
      <Link to="/builder">Build a Roster</Link>
    </Content>
  </Container>
);

export default NoRosterAvailable;
