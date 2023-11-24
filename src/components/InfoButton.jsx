import IconButton from '@mui/material/IconButton';
import {useState, useEffect} from "react";
import { useSpring, animated, useSpringRef, useChain } from "react-spring";
import { MdInfo } from "react-icons/md";
import  InfoClose from "./info-close";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";

const StyledIconButton = styled(animated.div)`
    position: fixed;
    width: 50px;
    height: 50px;
    top: 40px;
    right: -1px;
    z-index: 1;
`;



const InfoButton = ({ isShown, toggleShownUpdate, pathLength }) => {
    const [, updateState] = useState();

    const handleToggleDrawer = () => {
      toggleShownUpdate(!isShown);
    };

    const transformRef = useSpringRef()
    const transform = useSpring({
        ref: transformRef,
        transform: isShown? `translateX(-${pathLength}px)` : `translateX(0px)`,
        config: {mass: 1,
                 friction: 26,
                 tension: 170,},
    })
    const backTransformRef = useSpringRef()
    const backTransform = useSpring({
        ref: backTransformRef,
        transform: isShown? `translateX(50px)` : `translateX(0px)`,
        config: {mass: 1,
                 friction: 26,
                 tension: 170,},
    })
    useChain(isShown ? [transformRef, backTransformRef] : [backTransformRef, transformRef]);
    return  (
        <StyledIconButton style={backTransform}>
        <StyledIconButton style={transform}>
                <IconButton variant="contained" onClick={handleToggleDrawer} sx={{bgcolor: 'primary.main',
                    borderBottomRightRadius: '0px',
                    borderBottomLeftRadius: '5px',
                    borderTopRightRadius: '0px',
                    borderTopLeftRadius: '5px'}}
                style={{position: 'fixed'}}>
                    <InfoClose height={34} width={34} isOpen={isShown}></InfoClose>
                </IconButton>
        </StyledIconButton>
        </StyledIconButton>
    );

};

export default InfoButton;
