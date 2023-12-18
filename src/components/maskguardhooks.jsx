import {useEffect, useState} from "react";

export function useWindowSize() {
    const [windowSize, updateWindowSize] = useState({width: undefined, height: undefined});

    useEffect(() => {
        const resizeHandler = (() => {
            updateWindowSize({width: window.innerWidth, height: window.innerHeight})
        })

        resizeHandler()

        window.addEventListener("resize", resizeHandler)
        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])

    return windowSize
}