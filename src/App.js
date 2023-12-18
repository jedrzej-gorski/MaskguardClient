import { useEffect, useState, useRef, useCallback } from "react";
import WrappedWebcam from "./components/WrappedWebcam"
import styled from "styled-components";
import Modal from "./components/Modal";
import QRPage from "./components/QRPage";
import Topbar from "./components/Topbar";
import AboutPage from "./components/AboutPage"
import InfoButton from "./components/InfoButton";
import { Toaster, toast } from "react-hot-toast";
import {Image} from 'image-js';
import Button from "@mui/material/Button";
import {useTransition} from "react-spring";

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
`

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 1%;
  align-items: center;
  flex-direction: column;
  transition: opacity .5s ease-in-out;
  opacity: ${props => props.selectedTab === 0? '1' : '0'}
`

const CaptureButton = styled(Button)`
  width: 60%;
  height: 100%;
`;


function App() {
  const [isDrawerShowing, setDrawerShowing] = useState(null);
  const [token, setToken] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [toastId, setToastId] = useState(null) // used to notify user if camera input gets too dark
  const [selectedTab, changeSelectedTab] = useState(0);
  const [isCaptureEnabled, setIsCaptureEnabled] = useState(false);
  const webcamRef = useRef(null);

  const handleHelp = (newValue) => {
    setIsCaptureEnabled(false);
    setDrawerShowing(newValue)
  }

  const submitImage = async (base64img) => {
    if (!base64img) {
      return;
    }
    const payload = JSON.stringify({
      image: base64img,
    });
    var response = undefined
    try {
      response = await fetch("http://localhost:8000", {
        method: "post",
        body: payload,
        headers: {
          "Content-Type": "application/json",
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
    }
  };

  const getImageIllumination = async (imageSrc) => {
    if (imageSrc == null) {
      return 0
    }
    const image = await Image.load(imageSrc)
    const {data, width, height} = image
    let totalIntensity = 0;

    for (let i = 0; i < data.length; i += 4) {
      const intensity = (data[i] + data[i + 1] + data[i + 2]) / 3;
      totalIntensity += intensity;
    }
    return totalIntensity/ (width * height)
  }

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

  useEffect(() => {
    const callback = setInterval(async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      const intensity = await getImageIllumination(imageSrc)
      if (intensity < 60) {
        setIsCaptureEnabled(false)
        if (isDrawerShowing || token) {
          toast.dismiss()
          setToastId(null)
          return
        }
        if (!toastId) {
          const toastid = toast.loading("Your camera input is too dark. Please take the photo in a well-lit place")
          setToastId(toastid)
        }

      } else {
        toast.dismiss()
        setToastId(null)
        if (!isDrawerShowing && !token) {
          setIsCaptureEnabled(true)
        }
      }
    }, 1000);

    return () => clearInterval(callback);
  }, [toastId, isDrawerShowing, token]);
  const clearToken = () => {
    setToken(null);
    setExpirationDate(null);
    localStorage.clear();
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setIsPreviewVisible(true);
  }, [webcamRef, setImgSrc]);


  return (
    <AppContainer>
      <Toaster containerStyle={{top: 85}}/>
      <Topbar selectedTab={selectedTab} changeSelectedTab={changeSelectedTab}/>
      <UIContainer>
        <MainContainer selectedTab={selectedTab}>
          {!token && (
              <>
                <WrappedWebcam ref={webcamRef} isShowingHelp={isDrawerShowing}>
                </WrappedWebcam>
                <div className="button-container" style={{minWidth: '220px', height: '8%', marginBottom: '1%'}}>
                  <CaptureButton sx={{fontSize: "min(3vmin, 21px)"}} variant="contained" disabled={!isCaptureEnabled} onClick={capture}>Capture photo</CaptureButton>
                  <InfoButton isShown={isDrawerShowing} toggleShownUpdate={handleHelp} pathLength={300}></InfoButton>
                </div>
              </>
          )}
          {token && (
              <QRPage token={token} expirationDate={expirationDate} onRenew={clearToken} />
          )}
        </MainContainer>
        <AboutPage selectedTab={selectedTab}>

        </AboutPage>
      </UIContainer>
      <Modal
          isOpen={isPreviewVisible && !token}
          imageClearer={() => setImgSrc(null)}
          onClose={() => {setIsPreviewVisible(false)}}
          onConfirm={() => {submitImage(imgSrc).then(setIsPreviewVisible)}}
          imgSrc={imgSrc}/>
    </AppContainer>
  );
}

export default App;
