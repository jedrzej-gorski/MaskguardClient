import "../index.css";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { MdHome, MdInfoOutline } from "react-icons/md";
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";

const Bar = styled.div`
  height: min(10vmin, 71px);
  min-height: 48px;
  width: 100vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  box-shadow: 2px 2px 5px gray;
`;

const Logo = styled.span`
  height: 100%;
  font-family: Bavro;
  color: #2979ff;
  margin-left: 1%;
  font-size: max(min(6vmin, 60px), 22px);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function Topbar({ selectedTab, changeSelectedTab }) {
  const [containerWidth, setContainerWidth] = useState(null);
  const tabContainerObserver = new ResizeObserver((entries) => {
    for (let i = 0, l = entries.length; i < l; i += 1) {
      const entry = entries[i];
      setContainerWidth(entry.contentRect.width);
    }
  });
  const containerRef = useCallback(
    (node) => {
      if (node !== null) {
        setContainerWidth(node.offsetWidth);
        tabContainerObserver.observe(node);
      } else {
        tabContainerObserver.disconnect();
      }
    },
    [tabContainerObserver],
  );

  const updateTab = (id) => {
    return () => {
      changeSelectedTab(id);
    };
  };

  return (
    <Box component={Bar}>
      <Logo style={{ flex: "0 0 auto", color: "#2979FF", height: "100%" }}>
        MASKGUARD
      </Logo>
      <div ref={containerRef} className="tab-container">
        <Tab
          parentWidth={containerWidth}
          caption="Home"
          Icon={MdHome}
          selectedTab={selectedTab}
          onClick={updateTab(0)}
          id={0}
        />
        <Tab
          parentWidth={containerWidth}
          caption="About"
          Icon={MdInfoOutline}
          selectedTab={selectedTab}
          onClick={updateTab(1)}
          id={1}
        />
      </div>
    </Box>
  );
}

Topbar.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  changeSelectedTab: PropTypes.func.isRequired,
};

export default Topbar;
