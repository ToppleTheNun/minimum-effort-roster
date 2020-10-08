import {useContext} from "react";

import NavbarContext from "../context/navbar";

const useNavbar = () => useContext(NavbarContext);

export default useNavbar;
