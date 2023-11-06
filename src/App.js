import { useEffect, useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import Webcam from "react-webcam";
import styled from "styled-components";
import CountDown, { zeroPad } from "react-countdown";
import { Toaster, toast } from "react-hot-toast";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #c9d6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    70deg,
    #e2e2e2,
    #c9d6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    70deg,
    #e2e2e2,
    #c9d6ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Button = styled.button`
  padding: 10px;
  background-color: #88CFF9;
  color: #122c34;
  border-radius: 8px;
  border-color: #122c34;
  border-width: 4px;
  font-weight: bold;
  font-size: 1.5rem;
  min-width: 100px;
  cursor: pointer;
`;

const CaptureButton = styled(Button)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
`;

const Modal = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 16px;
  padding: 12px;
  max-height: 90%;
  box-sizing: border-box;
  width: 90%;
  max-width: 1024px;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
`;

const CapturedImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0px 12px 0px;
  max-width: 600px;
  width: 100%;
`;

const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  height: 100%;
`;

const StyledQRCode = styled(QRCodeSVG)`
  padding: 20px;
  width: 100%;
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

function App() {
  const [token, setToken] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);

  const submitImage = async (base64img) => {
    if (!base64img) {
      return;
    }
    const payload = JSON.stringify({
      image: base64img,
    });
    const response = await fetch("http://localhost:5000/predict", {
      method: "post",
      body: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("expirationDate", json.expirationDate);
      setToken(json.token);
      setExpirationDate(json.expirationDate);
      setImgSrc(null);
    } else {
      switch (json["predicted-class"]) {
        case "no_mask":
          toast.error(
            "You don't seem to be wearing a mask - please put one on to continue"
          );
          break;
        case "incorrect":
          toast.error(
            "You are wearing your mask incorrectly. Please adjust the position of your mask and try again"
          );
          break;
        default:
          toast.error("Something went wrong. Please try again");
      }
      setImgSrc(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if (storedToken) {
      setToken(storedToken);
      setExpirationDate(expirationDate);
    }
  }, [token, setToken]);

  useEffect(() => {
    const callback = setInterval(() => {
      const currentunixTime = Math.floor(Date.now() / 1000);
      if (expirationDate && expirationDate < currentunixTime) {
        clearToken();
        setImgSrc(null);
        toast(
          "Your token has expired. \nPlease take a photo to generate a new one."
        );
      }
    }, 1000 * 2);

    return () => clearInterval(callback);
  }, [expirationDate, setExpirationDate, setToken]);

  const clearToken = () => {
    setToken(null);
    setExpirationDate(null);
    localStorage.clear();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <AppContainer>
      <Toaster />
      {!imgSrc && !token && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            style={{
              width: "100%",
              height: "100%",
              margin: 0,
            }}
          />
          <CaptureButton onClick={capture}>Capture photo</CaptureButton>
        </>
      )}
      {imgSrc && !token && (
        <>
          <Overlay onClick={() => setImgSrc(null)} />
          <Modal>
            <CapturedImage src={imgSrc} alt="captured camera input" />
            <ButtonWrapper>
              <Button onClick={() => setImgSrc(null)}>Discard</Button>
              <Button onClick={() => submitImage(imgSrc)}>Send</Button>
            </ButtonWrapper>
          </Modal>
        </>
      )}
      {token && (
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
          <Button onClick={clearToken}>Renew</Button>
        </QRWrapper>
      )}
    </AppContainer>
  );
}

export default App;
