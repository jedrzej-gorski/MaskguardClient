import Webcam from "react-webcam";
import {useState, useRef, forwardRef} from "react";
import {useSpring, animated} from "react-spring"
import { useWindowSize} from "./maskguardhooks";
import InfoPager from "./InfoPager";
import {useMediaQuery} from "react-responsive";


const WrappedWebcam = forwardRef((props, ref) => {
    const {isShowingHelp, ...other} = props
    const [isLoaded, setIsLoaded] = useState(false)
    const windowSize = useWindowSize()
    const hasPositiveAspectRatio = useMediaQuery({query: '(min-aspect-ratio: 1/1)'})
    const isPortrait = useMediaQuery({query: '(max-aspect-ratio: 4/6'})
    let webcamStyle = {}

    if (!hasPositiveAspectRatio) {
        webcamStyle = {width: 0.9 * windowSize.width, height: windowSize.width * 0.9 * 3/4}
    }
    else {
        webcamStyle = {height: windowSize.height * 0.7, width: windowSize.height * 0.7 * 4/3}
    }

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
                    videoConstraints={{ facingMode: "user", aspectRatio: 4/3}}
                    style={webcamStyle}
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