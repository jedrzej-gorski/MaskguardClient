import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import {useSpring, animated, useSpringRef, useChain} from "react-spring";
import {useState} from "react";
import Typewriter from "./Typewriter";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import {useTranslation} from "react-i18next";


const ShakeContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Tab = (props) => {
    const {t, i18n} = useTranslation()
    const {caption, Icon, selectedTab, onClick, id, parentWidth, ...other} = props;
    const [animationPhase, setAnimationPhase] = useState(0);
    const stages = ['rotate(0deg)', 'rotate(-10deg)', 'rotate(10deg)']
    const activationClass = selectedTab === id ? 'selected-tab' : 'not-selected-tab'
    const isWide = useMediaQuery({query: '(min-width: 750px)'})
    const isShortAndWide = useMediaQuery({query: '(max-height: 525px) and (min-width: 600px)'})
    const isTight = useMediaQuery({query: '(max-width: 318px)'})
    const collapsedWidth = !isTight ? 47 : 30
    const activateAnimation = () => {
        setAnimationPhase(1)
        onClick()
    }
    const widthTransform = useSpring({
        width: selectedTab === id ? `${parentWidth - collapsedWidth}px` : `${collapsedWidth}px`,
        config: {mass: 0.5,
        friction: 26,
        tension: 100},
    })

    const shakeTransform = useSpring({
        transform: stages[animationPhase],
        config: {mass: 0.5,
            friction: 13,
            tension: 100,},
        onRest: () =>
        {
            switch (animationPhase) {
                case 1:
                    setAnimationPhase(2)
                    break
                case 2:
                    setAnimationPhase(0)
                    break
            }
        }
    });
    if (!isWide && !isShortAndWide) {
        return (
            <animated.div style={{...widthTransform}}>
                <Button onClick={activateAnimation} sx={{padding: '0 0',
                    minWidth: `${collapsedWidth}px`,
                    width: '100%',
                    height: '100%',
                    lineHeight: 'normal'}} >
                    <ShakeContainer style={{...shakeTransform}}>
                        <Icon {...other} className={`${activationClass} tab-icon` }/>
                    </ShakeContainer>
                    {selectedTab === id
                        ? <Typography sx={{fontSize: 'max(min(7vmin, 45px), 22px)', lineHeight: 'normal', fontFamily: 'Metropolis', fontWeight: 'normal'}} {...other} className={`${activationClass}`}>
                            <Typewriter text={t(caption)} delay={50}></Typewriter>
                        </Typography>
                        : null}
                </Button>
            </animated.div>
        )
    }
    else {
        return (
            <Button onClick={activateAnimation} sx={{padding: '0 0',
                minWidth: '47px',
                width: '100%',
                height: '100%',
                lineHeight: 'normal'}} >
                <ShakeContainer style={{...shakeTransform}}>
                    <Icon {...other} className={`${activationClass} tab-icon` }/>
                </ShakeContainer>
                <Typography sx={{fontSize: 'max(min(7vmin, 45px), 22px)', lineHeight: 'normal', fontFamily: 'Metropolis', fontWeight: 'normal'}} {...other} className={`${activationClass}`}>
                        {t(caption)}
                </Typography>
            </Button>
        )
    }
}

export default Tab;