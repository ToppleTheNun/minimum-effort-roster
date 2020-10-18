import React from "react";
import { Step } from "react-joyride";

const steps: Array<Step> = [
  {
    target: "#navbar-builder-link",
    title: "Roster Builder",
    content:
      "This is where you can build your roster by adding players and the classes and specs that they're willing to play.",
  },
  {
    target: "#navbar-composition-link",
    title: "Roster Builder",
    content:
      "This is where you can build a composition for a fight by selecting the player/spec combination you want to use.",
  },
  {
    target: "#import-export-form",
    title: "Import and Export",
    content:
      "This is where you can import rosters and compositions shared by other people or export your own roster.",
  },
  {
    target: "#import-default-roster-button",
    title: "Import Default Roster",
    content:
      "This button imports the default Minimum Effort roster based off of our early Shadowlands Interest Google Form.",
  },
  {
    target: "#export-current-roster-button",
    title: "Export Current Roster",
    content:
      "This button exports the current roster to a pretty large string that you can share. It'll go in the text box above.",
  },
  {
    target: "#code",
    title: "Roster and Composition Code",
    content: (
      <React.Fragment>
        This text box can accept a value from exporting a roster or a HasteBin
        link that looks something like this:{" "}
        <a href="https://hastebin.com/cuwubanafu">
          https://hastebin.com/cuwubanafu
        </a>
      </React.Fragment>
    ),
  },
  {
    target: "#import-roster-from-code-button",
    title: "Import from Code",
    content:
      "This button will try to import your roster and composition from the value that is in the Roster and Composition Code text box.",
  },
  {
    target: "#export-to-hastebin-button",
    title: "Export Current Roster to HasteBin",
    content:
      "This button will export your current roster to HasteBin for easy sharing. The HasteBin link will appear in the Roster and Composition Code text box.",
  },
];

export default steps;
