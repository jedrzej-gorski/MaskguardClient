import CountDown, { zeroPad } from "react-countdown";
import Button from './Button';
import styled from 'styled-components';
import { QRCodeSVG } from "qrcode.react";

const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledQRCode = styled(QRCodeSVG)`
  padding: 20px;
  width: 100%;
  max-width: 300px;
  height: auto;
  box-sizing: border-box;
`;

const Header = styled.h1`
  font-size: 1.75rem;
  text-align: center;
  font-weight: bold;
`;

const Counter = styled.div`
  font-size: 1.5rem;
  padding-bottom: 12px;
`;

const QRPage = ({token, expirationDate, onRenew}) => {
    return (
        <QRWrapper>
          <Header>Your access code is ready</Header>
          <StyledQRCode value={token} bgColor="#00000000" />
          <Counter>
            {"The token will expire in "}
            <CountDown
              renderer={({ minutes, seconds }) =>
                `${minutes}:${zeroPad(seconds)}`
              }
              date={expirationDate * 1000}
            />
          </Counter>
          <Button onClick={onRenew}>Renew</Button>
        </QRWrapper>
    )
}

export default QRPage;