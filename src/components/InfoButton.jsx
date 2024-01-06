import IconButton from "@mui/material/IconButton";
import React, { useState, useCallback } from "react";
import { MdHelp as MdInfo } from "react-icons/md";
import { styled as materialStyled } from "@mui/system";
import PropTypes from "prop-types";
import { useDeviceDetection } from "./maskguardhooks";

const StyledIconButton = materialStyled(IconButton)({
  position: "absolute",
  right: 0,
  height: "100%",
  marginLeft: "auto",
  backgroundColor: "#FFFFFF",
  "&:before, &:after": {
    content: '""',
    position: "absolute",
    width: "25%",
    height: "25%",
    transition: ".45s ease-in-out",
  },
  "&:before": {
    borderTopLeftRadius: "5px",
    top: "0",
    left: "0",
    borderTop: "2px solid rgba(41, 121, 255, 0.45)",
    borderLeft: "2px solid rgba(41, 121, 255, 0.45)",
  },
  "&:after": {
    borderBottomRightRadius: "5px",
    right: "0",
    bottom: "0",
    borderRight: "2px solid rgba(41, 121, 255, 0.45)",
    borderBottom: "2px solid rgba(41, 121, 255, 0.45)",
  },
  "&:hover::before, &:hover::after": {
    width: "calc(100% - 2px)",
    height: "calc(100% - 2px)",
    borderRadius: "5px",
  },
});

function InfoButton({ isShown, toggleShownUpdate }) {
  const [buttonHeight, setButtonHeight] = useState(undefined);
  const device = useDeviceDetection();
  const buttonObserver = new ResizeObserver((entries) => {
    for (let i = 0, l = entries.length; i < l; i += 1) {
      const entry = entries[i];
      setButtonHeight(entry.contentRect.height);
    }
  });
  const buttonRef = useCallback(
    (node) => {
      if (node !== null) {
        setButtonHeight(node.offsetHeight);
        buttonObserver.observe(node);
      } else {
        buttonObserver.disconnect();
      }
    },
    [buttonObserver],
  );
  const handleToggleDrawer = () => {
    toggleShownUpdate(!isShown);
  };
  let mobileStyle = {};
  if (device === "Mobile" || device === "Tablet") {
    mobileStyle = { position: "relative", marginLeft: "initial" };
  }

  return (
    <StyledIconButton
      sx={mobileStyle}
      ref={buttonRef}
      style={{ width: buttonHeight }}
      variant="contained"
      onClick={handleToggleDrawer}
    >
      <MdInfo size="80%" color="#2979FF" style={{ position: "absolute" }} />
    </StyledIconButton>
  );
}

InfoButton.propTypes = {
  isShown: PropTypes.bool.isRequired,
  toggleShownUpdate: PropTypes.func.isRequired,
};

export default InfoButton;
