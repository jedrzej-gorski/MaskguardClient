import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react'


function App() {
  const [token, setToken] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  const submitFile = async e => {
    e.preventDefault()

    const formData = new FormData(e.target);
    const response = await fetch("http://localhost:5001/predict", {
      method: 'post',
      body: formData
    });
    const json = await response.json();
    console.log(json);
    if (json.token) {
      localStorage.setItem("token", json.token)
      localStorage.setItem("expirationDate", json.expirationDate)
      setToken(json.token)
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
        console.log({unixTime})
        if (expirationDate && expirationDate < unixTime) {
          console.log("Token has expired");
          setToken(null);
          setExpirationDate(null);
          localStorage.clear();
        }
      }, 1000 * 60);

    return () => clearInterval(callback);
  }, [expirationDate, setExpirationDate, setToken]);

  return (
    <div className="App">
      <form onSubmit={submitFile}>
        <label htmlFor="file">Select a file:</label>
        <input type="file" id="file" name="file" />
        <button type="submit">Send</button>
      </form>

      <div className="tokenDisplay">
        {token}
      </div>
      {token && <QRCodeSVG value={token} />}
    </div>
  );
}

export default App;