import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import {useSpring, animated, useSpringRef, useChain} from "react-spring";
import {useState} from "react";


const Tab = (props) => {
    const {caption, Icon, className, onClick, ...other} = props;
    const [animationPhase, setAnimationPhase] = useState(0);
    const stages = ['rotate(0deg)', 'rotate(-10deg)', 'rotate(10deg)']
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
            <Button sx={{minWidth: '110px', minHeight: '80px', width: '50%'}} onClick={activateAnimation} className="single-tab-container">
                <animated.div style={{display: 'flex', alignItems: 'flex-end', ...shakeTransform}}>
                    <Icon {...other} className={`${className} tab-icon` }/>
                </animated.div>
                <Typography sx={{fontSize: '2.3em', height: '42px', fontFamily: 'Metropolis', fontWeight: 'normal'}} {...other} className={`${className}`}>{caption}</Typography>
            </Button>

    )
}

export default Tab;