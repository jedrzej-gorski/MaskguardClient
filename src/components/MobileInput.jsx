import {styled as materialStyled} from "@mui/system"
import {useSpring, animated} from "react-spring"
import { useWindowSize} from "./maskguardhooks";
import InfoPager from "./InfoPager";
import {useMediaQuery} from "react-responsive";
import { MdPhotoCamera } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {forwardRef, useImperativeHandle, useRef} from "react";
import {useTranslation} from "react-i18next";

const LoadButton = materialStyled(IconButton)({
  height: '90%',
  width: '100%'
})

class WebcamReplacement {
    constructor () {
        this.data = null;
    }

    loadImage(image, callback, refToClear) {
        const reader = new FileReader()

        reader.onloadend = () => {
            this.data = reader.result
            callback()
        }
        if (image != null) {
            reader.readAsDataURL(image)
        }
    }
}

const MobileInput = forwardRef(({isShowingHelp, capture, submit}, ref) => {
    useImperativeHandle(ref, () => ({
        getScreenshot() {
            return Package.data
        }
    }))
    const {t, i18n} = useTranslation()
    const windowSize = useWindowSize()
    const hasPositiveAspectRatio = useMediaQuery({query: '(min-aspect-ratio: 1/1)'})
    const isEven = useMediaQuery({query: '(max-aspect-ratio: 21/10) and (min-aspect-ratio: 10/21)'})
    const Package = new WebcamReplacement()
    const fileInputRef = useRef()
    const fileLoader = (e) => {
        Package.loadImage(e.target.files[0], capture)
    }

    const clickRedirect = () => {
        fileInputRef.current.click()
    }

    let containerStyle = {}

    if (!hasPositiveAspectRatio) {
        containerStyle = {width: 0.9 * windowSize.width, height: windowSize.width * 0.9 * 3/4}
    }
    else {
        containerStyle = {height: windowSize.height * 0.7, width: windowSize.height * 0.7 * 4/3}
    }

    const helpStyle = isShowingHelp? {zIndex: 1} : {zIndex: -1}

    const {opacity} = useSpring({
        opacity: isShowingHelp && isEven? '0%' : '100%',
        config: {mass: 3,
            friction: 26,
            tension: 170,},
    })

    return (
        <div style={containerStyle} className="webcam-container" >
            <animated.div className="webcam photo-box" style={{opacity}}>
                <input ref={fileInputRef} style={{display: 'none', height: '90%', width: '100%'}} type="file" accept="image/*" capture="environment" onChange={fileLoader}></input>
                <LoadButton onClick={clickRedirect}>
                    <MdPhotoCamera size='100%'></MdPhotoCamera>
                </LoadButton>
                <Typography sx={{fontSize: 'max(min(7vmin, 45px), 22px)', position: 'relative', bottom: 'max(min(7vmin, 45px), 22px)', lineHeight: 'normal', fontFamily: 'Metropolis', fontWeight: 'normal'}} className='selected-tab'>
                    {t("Upload Photo")}
                </Typography>
            </animated.div>
            {isEven &&
                <div className="stacked-container" style={helpStyle}>
                    <InfoPager isShown={isShowingHelp}></InfoPager>
                </div>
            }
        </div>
    )
})

export default MobileInput