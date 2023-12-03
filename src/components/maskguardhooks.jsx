import {useEffect, useMemo, useState} from "react";

const throttle = (func, time) => {
    let progress = false;
    return (...args) => {
        if (progress) {
            return;
        }
        progress = true
        setTimeout(() => {
            func(...args);
            progress = false;
        }, time)
    }
}

export function useThrottledWindowSize(time) {
    const [windowSize, updateWindowSize] = useState({width: undefined, height: undefined});

    useEffect(() => {
        console.log("called")
        const resizeHandler = throttle(() => {
            updateWindowSize({width: window.innerWidth, height: window.innerHeight});
        }, time);

        resizeHandler()

        window.addEventListener("resize", resizeHandler)
        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])

    return windowSize;
}
