import { useContext } from "react";

import DropdownContext from "../context/dropdown";

const useDropdown = () => useContext(DropdownContext);

export default useDropdown;
