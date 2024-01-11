import Webcam from "react-webcam";
import React, { forwardRef } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import { useContainerScale } from "./maskguardhooks";
import InfoPager from "./InfoPager";

const WrappedWebcam = forwardRef((props, ref) => {
  const { isShowingHelp } = props;
  const webcamStyle = useContainerScale();
  const isEven = useMediaQuery({
    query: "(max-aspect-ratio: 21/10) and (min-aspect-ratio: 10/21)",
  });

  const containerStyle = isShowingHelp ? { zIndex: 1 } : { zIndex: -1 };

  const { opacity } = useSpring({
    opacity: isShowingHelp && isEven ? "0%" : "100%",
    config: { mass: 3, friction: 26, tension: 170 },
  });

  return (
    <div className="webcam-container">
      <animated.div className="webcam" style={{ opacity }}>
        <Webcam
          audio={false}
          ref={ref}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user", aspectRatio: 4 / 3 }}
          style={webcamStyle}
          className="webcam"
        />
      </animated.div>
      {isEven && (
        <div className="stacked-container" style={containerStyle}>
          <InfoPager isShown={isShowingHelp} />
        </div>
      )}
    </div>
  );
});

WrappedWebcam.propTypes = {
  isShowingHelp: PropTypes.bool.isRequired,
};

export default WrappedWebcam;
