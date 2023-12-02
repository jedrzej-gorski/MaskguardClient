import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import {useSpring, animated, useSpringRef, useChain} from "react-spring";
import {useState} from "react";


const Tab = (props) => {
    const {caption, Icon, selectedTab, onClick, id, ...other} = props;
    const [animationPhase, setAnimationPhase] = useState(0);
    const stages = ['rotate(0deg)', 'rotate(-10deg)', 'rotate(10deg)']
    const activationClass = selectedTab === id ? 'selected-tab' : 'not-selected-tab'
    const activateAnimation = () => {
        setAnimationPhase(1)
        onClick()
    }

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

    return (
            <Button onClick={activateAnimation} sx={{padding: '0 0',
                minWidth: '110px',
                width: '50%',
                height: '100%',
                lineHeight: 'normal'}}>
                <animated.div style={{display: 'flex', flexDirection:'column', alignItems: 'flex-end', ...shakeTransform}}>
                    <Icon {...other} className={`${activationClass} tab-icon` }/>
                </animated.div>
                <Typography sx={{fontSize: 'min(7vmax, 45px)', lineHeight: 'normal', fontFamily: 'Metropolis', fontWeight: 'normal'}} {...other} className={`${activationClass}`}>{caption}</Typography>
            </Button>

    )
}

export default Tab;