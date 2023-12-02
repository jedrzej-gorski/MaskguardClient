import Webcam from "react-webcam";
import {useState, useRef, forwardRef} from "react";

const WrappedWebcam = forwardRef((props, ref) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const handleUserMedia = () => {
        setIsLoaded(true)
    }
    return (
        <Webcam
            audio={false}
            ref={ref}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user", aspectRatio: props.ratio}}
            class={isLoaded? "webcam" : "loading-webcam webcam"}
            onUserMedia={handleUserMedia}
        />
    )
})

export default WrappedWebcam