import { useContext } from "react";

import RosterContext from "../context/roster";

const useRoster = () => useContext(RosterContext);

export default useRoster;
