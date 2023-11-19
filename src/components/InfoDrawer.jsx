import {useState, useEffect} from "react";
import { useSpring, animated, useChain, useSpringRef} from "react-spring";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MdInfo } from "react-icons/md";
import {ThemeProvider} from '@mui/material/styles';
import muiTheme from '../theme.js';
import '../index.css';

const InfoDrawer = ({ isShown, size }) => {
    const [, updateState] = useState();
    useEffect(() => {
        window.addEventListener("resize", updateState);
    }, []);
    const moveTransformRef = useSpringRef()
    const {transform} = useSpring({
        ref: moveTransformRef,
        transform: isShown? 'translateX(-100%)' : 'translateX(0%)',
        config: {mass: 1,
                 friction: 26,
                 tension: 170,},
    });
    const textTransformRef = useSpringRef()
    const textTransform = useSpring({
        ref: textTransformRef,
        transform: isShown? `translateX(48px)` : `translateX(0px)`,
        config: {mass: 1,
                 friction: 26,
                 tension: 170,},
    })
    useChain([moveTransformRef, textTransformRef])
    return  (
        <Box component={animated.div} class="drawer" sx={{
        borderRadius: 1,
        boxShadow: 0}}
        style={{
                left: window.innerWidth,
                position: "fixed",
                top: '80px',
                height: "100vh",
                width:`${size}px`,
                backgroundColor: '#FFFFFF',
                transform,
        }}>
            <ThemeProvider theme={muiTheme}>
            <Box sx={{bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: 0,
                      padding: '10px',
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,}} style={{height: "50px"}}>
                <animated.div style={textTransform}>
                    <Typography variant="subtitle2" component="h2" sx={{ fontWeight: 'medium',
                                                                      letterSpacing: '1px',
                                                                      fontSize: 18,
                                                                      color: '#ffffff'
                                                                      }}
                                                                      >
                    Help
                    </Typography>
                </animated.div>
            </Box>
            </ThemeProvider>
            <Box>PLACEHOLDER</Box>
        </Box>
    );
};

export default InfoDrawer;