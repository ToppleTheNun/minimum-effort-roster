import React from "react";

import Content from "../../components/halfmoon/Content";
import Button from "../../components/halfmoon/Button";
import CompositionRosterList from "./CompositionRosterList";
import ImportExportForm from "../sharing/ImportExportForm";

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
      <ImportExportForm />
    </Content>
    <Content className="m-5">
      <div className="btn-group w-full" role="group">
        <Button className="w-half" onClick={handleCollapseAll} type="button">
          Collapse All
        </Button>
        <Button className="w-half" onClick={handleExpandAll} type="button">
          Expand All
        </Button>
      </div>
    </Content>
    <CompositionRosterList />
  </div>
);

export default CompositionSidebar;
