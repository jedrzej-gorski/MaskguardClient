import Webcam from "react-webcam";
import {useState, forwardRef, useImperativeHandle} from "react";
import {useSpring, animated} from "react-spring"
import { useWindowSize} from "./maskguardhooks";
import InfoPager from "./InfoPager";
import {useMediaQuery} from "react-responsive";


const WrappedWebcam = forwardRef((props, ref) => {
    const {isShowingHelp, ...other} = props
    const windowSize = useWindowSize()
    const hasPositiveAspectRatio = useMediaQuery({query: '(min-aspect-ratio: 1/1)'})
    const isEven = useMediaQuery({query: '(max-aspect-ratio: 21/10) and (min-aspect-ratio: 10/21)'})

    let webcamStyle = {}

    if (!hasPositiveAspectRatio) {
        webcamStyle = {width: 0.9 * windowSize.width, height: windowSize.width * 0.9 * 3/4}
    }
    else {
        webcamStyle = {height: windowSize.height * 0.7, width: windowSize.height * 0.7 * 4/3}
    }

    const containerStyle = isShowingHelp? {zIndex: 1} : {zIndex: -1}

    const {opacity} = useSpring({
        opacity: isShowingHelp && isEven? '0%' : '100%',
        config: {mass: 3,
            friction: 26,
            tension: 170,},
    })

    return (
        <div className="webcam-container">
            <animated.div className="webcam" style={{opacity}}>
                <Webcam
                    audio={false}
                    ref={ref}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "user", aspectRatio: 4/3}}
                    style={webcamStyle}
                    class="webcam"
                />
            </animated.div>
            {isEven &&
            <div className="stacked-container" style={containerStyle}>
                <InfoPager isShown={isShowingHelp}></InfoPager>
            </div>
            }
        </div>
    )
})

export default WrappedWebcam