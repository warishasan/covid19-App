import React, { useContext } from "react";
import { GlobalContext } from "../GlobalState.js";
import InfoPanelGlobal from "./InfoPanelGlobal.js";
import InfoPanelCountry from "./InfoPanelCountry.js";

function PageSelector() {
  const { state } = useContext(GlobalContext);

  if (state === "global") {
    return <InfoPanelGlobal />;
  } else {
    return <InfoPanelCountry />;
  }
}

export default PageSelector;
