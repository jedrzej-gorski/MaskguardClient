import Webcam from "react-webcam";
import {useState, useRef, forwardRef} from "react";
import {useSpring, animated} from "react-spring"
import InfoPager from "./InfoPager";

const WrappedWebcam = forwardRef((props, ref) => {
    const {isShowingHelp, ...other} = props
    const [isLoaded, setIsLoaded] = useState(false)

    const {opacity} = useSpring({
        opacity: isShowingHelp? '0%' : '100%',
        config: {mass: 3,
            friction: 26,
            tension: 170,},
    })
    const handleUserMedia = () => {
        setIsLoaded(true)
    }
    return (
        <div className="webcam-container">
            <animated.div className="webcam" style={{opacity}}>
                <Webcam
                    audio={false}
                    ref={ref}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "user", aspectRatio: props.ratio}}
                    class={isLoaded? "webcam" : "loading-webcam webcam"}
                    onUserMedia={handleUserMedia}
                />
            </animated.div>
            <div className="stacked-container">
                <InfoPager isShown={isShowingHelp}></InfoPager>
            </div>
        </div>
    )
})

export default WrappedWebcam