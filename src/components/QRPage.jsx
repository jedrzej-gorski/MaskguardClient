import CountDown, { zeroPad } from "react-countdown";
import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/system";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const QRWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: #2979ff 2px solid;
`;

const StyledQRCode = styled(QRCodeSVG)`
  width: 75%;
  max-width: 300px;
  height: auto;
  box-sizing: border-box;
`;

const Header = styled.h1`
  font-size: min(5vmin, 30px);
  text-align: center;
  font-weight: bold;
`;

const Counter = styled.div`
  font-size: min(4vmin, 25px);
  text-align: center;
`;

const StyledButton = materialStyled(Button)({
  color: "#2979FF",
  fontSize: "min(4vmin, 25px)",
});

function QRPage({ token, expirationDate, onRenew }) {
  const { t } = useTranslation();
  return (
    <QRWrapper>
      <Header>{t("QR Header")}</Header>
      <StyledQRCode value={token} bgColor="#00000000" />
      <Counter>
        {t("QR Content")}
        <CountDown
          renderer={({ minutes, seconds }) => `${minutes}:${zeroPad(seconds)}`}
          date={expirationDate * 1000}
        />
      </Counter>
      <StyledButton onClick={onRenew}>{t("Renew")}</StyledButton>
    </QRWrapper>
  );
}

QRPage.propTypes = {
  token: PropTypes.string.isRequired,
  expirationDate: PropTypes.number.isRequired,
  onRenew: PropTypes.func.isRequired,
};

export default QRPage;
