import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useWindowSize() {
  const [windowSize, updateWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const resizeHandler = () => {
      updateWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return windowSize;
}

export function useDeviceDetection() {
  const [device, setDevice] = useState("");

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice("Mobile");
      } else if (isTablet) {
        setDevice("Tablet");
      } else {
        setDevice("Desktop");
      }
    };

    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);

    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return device;
}

export function useContainerScale(
  landscapeScale = 0.7,
  portraitScale = 0.9,
  auto = false,
) {
  const windowSize = useWindowSize();
  const hasPositiveAspectRatio = useMediaQuery({
    query: "(min-aspect-ratio: 1/1)",
  });

  let containerStyle = {};

  if (!hasPositiveAspectRatio) {
    if (auto) {
      containerStyle = {
        width: portraitScale * windowSize.width,
        height: "auto",
      };
    } else {
      containerStyle = {
        width: portraitScale * windowSize.width,
        height: (windowSize.width * portraitScale * 3) / 4,
      };
    }
  } else {
    if (auto) {
      containerStyle = {
        height: windowSize.height * landscapeScale,
        width: "auto",
      };
    }
    containerStyle = {
      height: windowSize.height * landscapeScale,
      width: (windowSize.height * landscapeScale * 4) / 3,
    };
  }
  return containerStyle;
}
