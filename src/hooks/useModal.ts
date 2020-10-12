import { useContext } from "react";

import ModalContext from "../context/modal";

const useModal = () => useContext(ModalContext);

export default useModal;
