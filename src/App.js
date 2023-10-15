import { useEffect, useState, useRef, useCallback } from "react";
import { QRCodeSVG } from 'qrcode.react'
import Webcam from 'react-webcam'


function App() {
  const [token, setToken] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);

  const submitImage = async base64img => {
    const payload = JSON.stringify({
      image: base64img
    })
    const response = await fetch("http://localhost:5001/predict", {
      method: 'post',
      body: payload,
      headers: { "Content-Type": "application/json" }
    })
    const json = await response.json();
    console.log(json);
    if (json.token) {
      localStorage.setItem("token", json.token)
      localStorage.setItem("expirationDate", json.expirationDate)
      setToken(json.token)
      setImgSrc(null)
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expirationDate")
    if (storedToken) {
      setToken(storedToken)
      setExpirationDate(expirationDate);
    }
  }, [token, setToken]);

  useEffect(() => {
    const callback = setInterval(
      () => {
        console.log({ expirationDate });
        const unixTime = Math.floor(Date.now() / 1000);
        console.log({ unixTime })
        if (expirationDate && expirationDate < unixTime) {
          clearToken()
        }
      }, 1000 * 60);

    return () => clearInterval(callback);
  }, [expirationDate, setExpirationDate, setToken]);

  const clearToken = () => {
    setToken(null);
    setExpirationDate(null);
    localStorage.clear();
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc)
  }, [webcamRef, setImgSrc]);

  return (
    <div className="App">
      {!imgSrc && !token &&
        <><Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'user' }}
        />
          <button onClick={capture}>Capture photo</button>
        </>
      }
      {imgSrc && !token && (
        <>
          <img
            src={imgSrc}
            alt="captured camera input"
          />
          <button onClick={() => setImgSrc(null)}>Discard</button>
          <button onClick={() => submitImage(imgSrc)}>Send</button>
        </>
      )}
      <div>
        {token}
      </div>
      {token && <><QRCodeSVG value={token} style={{ padding: "20px" }} />
        <button onClick={clearToken}>Refresh</button>
      </>}
    </div>
  );
}

export default App;