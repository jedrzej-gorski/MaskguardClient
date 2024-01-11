import CountDown, { zeroPad } from "react-countdown";
import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/system";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  @media (min-aspect-ratio: 10/10) and (max-height: 450px) {
    flex-direction: row;
  }
  flex-direction: column;
  justify-content: space-evenly;
`;

const QRWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: #2979ff 2px solid;
  margin: 5px;
`;

const StyledQRCode = styled(QRCodeSVG)`
  max-height: 100%;
  max-width: 510px;
  padding: 10px;
  box-sizing: border-box;
  @media (min-aspect-ratio: 10/10) {
    width: auto;
    height: 70vmin;
  }
  @media (max-aspect-ratio: 10/10) and (max-height: 375px) {
    width: 64vw;
    height: auto;
  }
  @media (max-aspect-ratio: 10/10) and (max-height: 450px) {
    width: 69vw;
    height: auto;
  }
  @media (max-aspect-ratio: 10/10) and (max-height: 700px) {
    width: 74vw;
    height: auto;
  }
  width: 80vw;
  height: auto;
  flex: 0 1 auto;
`;

const Counter = styled.div`
  text-align: center;
  margin: 4px;
  font-size: min(4vmin, 25px);
`;

const StyledButton = materialStyled(Button)({
  color: "#2979FF",
  fontSize: "min(4vmin, 25px)",
});

function QRPage({ token, expirationDate, onRenew }) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <StyledQRCode value={token} bgColor="#00000000" />
      <QRWrapper>
        <Counter>
          {t("QR Content")}
          <CountDown
            renderer={({ minutes, seconds }) =>
              `${minutes}:${zeroPad(seconds)}`
            }
            date={expirationDate * 1000}
          />
        </Counter>
        <StyledButton onClick={onRenew}>{t("Renew")}</StyledButton>
      </QRWrapper>
    </Wrapper>
  );
}

QRPage.propTypes = {
  token: PropTypes.string.isRequired,
  expirationDate: PropTypes.number.isRequired,
  onRenew: PropTypes.func.isRequired,
};

export default QRPage;
