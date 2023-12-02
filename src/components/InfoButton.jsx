import IconButton from '@mui/material/IconButton';
import {useState, useEffect} from "react";
import { useSpring, animated, useSpringRef, useChain } from "react-spring";
import { MdHelp as MdInfo } from "react-icons/md";
import {styled as materialStyled} from "@mui/system"
import styled from "styled-components";


const StyledIconButton = materialStyled(IconButton)({
    height: '100%',
    width: '',
    marginLeft: 'auto',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    '&:before, &:after': {
        content: '""',
        position: 'absolute',
        width: '25%',
        height: '25%',
        transition: '.45s ease-in-out',
    },
    '&:before': {
        borderTopLeftRadius: '5px',
        top: '0',
        left: '0',
        borderTop: '2px solid rgba(41, 121, 255, 0.45)',
        borderLeft: '2px solid rgba(41, 121, 255, 0.45)',
    },
    '&:after': {
        borderBottomRightRadius: '5px',
        right: '0',
        bottom: '0',
        borderRight: '2px solid rgba(41, 121, 255, 0.45)',
        borderBottom: '2px solid rgba(41, 121, 255, 0.45)',
    },
    '&:hover::before, &:hover::after': {
        width: 'calc(100% - 2px)',
        height: 'calc(100% - 2px)',
        borderRadius: '5px',
    }
});


const InfoButton = ({ isShown, toggleShownUpdate, pathLength }) => {
    const handleToggleDrawer = () => {
      toggleShownUpdate(!isShown);
    };

    return  (
        <StyledIconButton variant="contained" onClick={handleToggleDrawer}>
            <MdInfo color={'#2979FF'}></MdInfo>
        </StyledIconButton>
    );

};

export default InfoButton;
