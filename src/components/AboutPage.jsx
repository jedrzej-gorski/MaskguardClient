import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import constants from "../content/constants.json";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NameItem = styled.p`
  font-size: min(4vmin, 20px);
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

const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  width: 80%;
  height: 80%;
  opacity: ${(props) => (props.$isStartingAnimation ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: ${(props) =>
      props.$isStartingAnimation ? "calc(100% - 2px)" : "30px"};
    height: ${(props) =>
      props.$isStartingAnimation ? "calc(100% - 2px)" : "30px"};
    border-radius: ${(props) => (props.$isStartingAnimation ? "5px" : "0px")};
    transition: 0.75s ease-in-out;
  }
  &:before {
    border-top-left-radius: 5px;
    top: 0;
    left: 0;
    border-top: 2px solid rgb(41, 121, 255);
    border-left: 2px solid rgb(41, 121, 255);
  }
  &:after {
    border-bottom-right-radius: 5px;
    right: 0;
    bottom: 0;
    border-right: 2px solid rgb(41, 121, 255);
    border-bottom: 2px solid rgb(41, 121, 255);
  }
`;

function AboutPage({ selectedTab }) {
  const [isStartingAnimation, setIsStartingAnimation] = useState(false);
  const { t } = useTranslation();
  const transition = useTransition(selectedTab === 1, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      mass: 0.5,
      tension: 180,
      friction: 21,
    },
  });
  useEffect(() => {
    if (selectedTab === 1) {
      setIsStartingAnimation(true);
    } else {
      setIsStartingAnimation(false);
    }
  }, [selectedTab]);

  const rows = [];
  for (let i = 0; i < constants.authors.length; i += 1) {
    rows.push(
      <NameItem key={constants.authors[i]}>{constants.authors[i]}</NameItem>,
    );
  }

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div className="stacked-container" style={style}>
              <FlexContainer>
                <ContentBox $isStartingAnimation={isStartingAnimation}>
                  <Logo
                    style={{
                      flex: "0 0 auto",
                      color: "#2979FF",
                      height: "25%",
                      fontHeight: "0",
                    }}
                  >
                    MASKGUARD
                  </Logo>
                  <Typography
                    sx={{
                      fontSize: "min(5vmin, 20px)",
                      margin: "5px",
                      fontHeight: "0",
                    }}
                  >
                    {t("Authors Header")}
                  </Typography>
                  {rows}
                </ContentBox>
              </FlexContainer>
            </animated.div>
          ),
      )}
    </>
  );
}

AboutPage.propTypes = {
  selectedTab: PropTypes.number.isRequired,
};

export default AboutPage;
