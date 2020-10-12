import React from "react";
import Content from "../../components/halfmoon/Content";
import ImportExportForm from "../sharing/ImportExportForm";
import Button from "../../components/halfmoon/Button";
import PlayerBuilderRosterList from "./PlayerBuilderRosterList";

interface PlayerBuilderSidebarProps {
  handleAddNew: () => void;
  handleCollapseAll: () => void;
  handleExpandAll: () => void;
}

const PlayerBuilderSidebar = ({
  handleAddNew,
  handleCollapseAll,
  handleExpandAll,
}: PlayerBuilderSidebarProps) => (
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
      <Button
        className="w-full"
        color="primary"
        onClick={handleAddNew}
        type="button"
      >
        Add New
      </Button>
    </Content>
    <PlayerBuilderRosterList />
  </div>
);

export default PlayerBuilderSidebar;
