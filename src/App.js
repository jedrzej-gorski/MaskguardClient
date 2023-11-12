import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import Button from "./components/Button";
import Modal from "./components/Modal";
import QRPage from "./components/QRPage";
import Topbar from "./components/Topbar";
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

const CaptureButton = styled(Button)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
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
    var response = undefined
    try {
      response = await fetch("http://localhost:5000/predict", {
        method: "post",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (e) {
          toast.error("Something went wrong. Please try again");
          setImgSrc(null)
          return
    }
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
          toast.error("Please capture your face inside the picture");
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
      <Toaster containerStyle={{top: 85}}/>
      <Topbar />
      {!token && (
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
        <Modal
          onClose={() => setImgSrc(null)}
          onConfirm={() => submitImage(imgSrc)}
          imgSrc={imgSrc}
        />
      )}
      {token && (
        <QRPage token={token} expirationDate={expirationDate} onRenew={clearToken} />
      )}
    </AppContainer>
  );
}

export default App;
