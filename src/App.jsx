import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { toast, Toaster } from "react-hot-toast";
import Button from "@mui/material/Button";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import WrappedWebcam from "./components/WrappedWebcam";
import Modal from "./components/Modal";
import QRPage from "./components/QRPage";
import Topbar from "./components/Topbar";
import InfoContainer from "./components/InfoContainer";
import AboutPage from "./components/AboutPage";
import InfoButton from "./components/InfoButton";
import { useDeviceDetection } from "./components/maskguardhooks";
import MobileInput from "./components/MobileInput";

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const UIContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: calc(100% - max(48px, min(10vmin, 71px)));
  flex: 1 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const WebcamSectionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1%;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-aspect-ratio: 21/10) {
    flex-direction: column;
    height: 100%;
  }
  @media (min-aspect-ratio: 21/10) {
    flex-direction: row;
    width: 100%;
  }
  gap: 1%;
  align-items: center;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.selectedTab === 0 ? "1" : "0")};
`;

const CaptureButton = styled(Button)`
  width: 60%;
  height: 100%;
`;

function App() {
  const { t } = useTranslation();
  const [isDrawerShowing, setDrawerShowing] = useState(false);
  const [token, setToken] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selectedTab, changeSelectedTab] = useState(0);
  const webcamRef = useRef(null);
  const isEven = useMediaQuery({
    query: "(max-aspect-ratio: 21/10) and (min-aspect-ratio: 10/21)",
  });
  const deviceType = useDeviceDetection();

  const submitImage = async (base64img) => {
    if (!base64img) {
      return;
    }
    const payload = JSON.stringify({
      image: base64img,
    });
    let response;
    try {
      response = await fetch("https://api.mask-guard.net/predict", {
        method: "post",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      setImgSrc(null);
      return;
    }
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("expirationDate", json.expirationDate);
      setToken(json.token);
      setExpirationDate(json.expirationDate);
    } else {
      switch (json["predicted-class"]) {
        case "no_mask":
          toast.error(
            "You don't seem to be wearing a mask - please put one on to continue",
          );
          break;
        case "incorrect":
          toast.error(
            "You are wearing your mask incorrectly. Please adjust the position of your mask and try again",
          );
          break;
        default:
          toast.error("Please capture your face inside the picture");
      }
    }
  };

  const clearToken = () => {
    setToken(null);
    setExpirationDate(null);
    localStorage.clear();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expDate = localStorage.getItem("expirationDate");
    if (storedToken) {
      setToken(storedToken);
      setExpirationDate(parseInt(expDate, 10));
    }
  }, [token, setToken]);

  useEffect(() => {
    const callback = setInterval(() => {
      const currentunixTime = Math.floor(Date.now() / 1000);
      if (expirationDate && expirationDate < currentunixTime) {
        clearToken();
        setImgSrc(null);
        toast(
          "Your token has expired. \nPlease take a photo to generate a new one.",
        );
      }
    }, 1000 * 2);

    return () => clearInterval(callback);
  }, [expirationDate, setExpirationDate, setToken]);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setIsPreviewVisible(true);
  }, [webcamRef, setImgSrc]);

  return (
    <AppContainer>
      <Toaster containerStyle={{ top: 85 }} />
      <Topbar selectedTab={selectedTab} changeSelectedTab={changeSelectedTab} />
      <UIContainer>
        <MainContainer selectedTab={selectedTab}>
          <WebcamSectionContainer>
            {!token && deviceType === "Desktop" && (
              <>
                <WrappedWebcam
                  ref={webcamRef}
                  isShowingHelp={isDrawerShowing}
                />
                <div
                  className="button-container"
                  style={{
                    minWidth: "220px",
                    height: "8%",
                    marginBottom: "1%",
                  }}
                >
                  <CaptureButton
                    sx={{ fontSize: "min(3vmin, 21px)" }}
                    variant="contained"
                    onClick={capture}
                  >
                    {t("Capture Photo")}
                  </CaptureButton>
                  {isEven && (
                    <InfoButton
                      isShown={isDrawerShowing}
                      toggleShownUpdate={setDrawerShowing}
                      pathLength={300}
                    />
                  )}
                </div>
              </>
            )}
            {!token && (deviceType === "Mobile" || deviceType === "Tablet") && (
              <>
                <MobileInput
                  ref={webcamRef}
                  isShowingHelp={isDrawerShowing}
                  capture={capture}
                />
                <div
                  className="button-container"
                  style={{
                    minWidth: "220px",
                    height: "13%",
                    maxHeight: "75px",
                  }}
                >
                  {isEven && (
                    <InfoButton
                      isShown={isDrawerShowing}
                      toggleShownUpdate={setDrawerShowing}
                      pathLength={300}
                    />
                  )}
                </div>
              </>
            )}
            {token && (
              <QRPage
                token={token}
                expirationDate={expirationDate}
                onRenew={clearToken}
              />
            )}
          </WebcamSectionContainer>
          {!isEven && <InfoContainer />}
        </MainContainer>
        <AboutPage selectedTab={selectedTab} />
      </UIContainer>
      <Modal
        isOpen={isPreviewVisible && !token}
        imageClearer={() => setImgSrc(null)}
        onClose={() => {
          setIsPreviewVisible(false);
        }}
        onConfirm={() => {
          submitImage(imgSrc).then(setIsPreviewVisible(false));
        }}
        imgSrc={imgSrc}
      />
    </AppContainer>
  );
}

export default App;
