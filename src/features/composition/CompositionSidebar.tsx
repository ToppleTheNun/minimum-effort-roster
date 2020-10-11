import Content from "../../components/halfmoon/Content";
import Button from "../../components/halfmoon/Button";
import CompositionRosterList from "./CompositionRosterList";
import React from "react";
import CompositionForm from "./CompositionForm";

interface CompositionSidebarProps {
  handleCollapseAll: () => void;
  handleExpandAll: () => void;
}

const CompositionSidebar = ({
  handleCollapseAll,
  handleExpandAll,
}: CompositionSidebarProps) => (
  <div className="col-lg-3">
    <Content className="m-5">
      <CompositionForm />
      <div className="btn-group w-full" role="group" aria-label="Basic example">
        <Button onClick={handleCollapseAll} type="button">
          Collapse All
        </Button>
        <Button onClick={handleExpandAll} type="button">
          Expand All
        </Button>
      </div>
    </Content>
    <CompositionRosterList />
  </div>
);

export default CompositionSidebar;
