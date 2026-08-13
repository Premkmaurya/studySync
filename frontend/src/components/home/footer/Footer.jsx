import React, { memo } from "react";
import StudySyncFooter from "./StudySyncFooter";

const Footer = ({ className = "" }) => {
  return <StudySyncFooter className={className} />;
};

export default memo(Footer);
