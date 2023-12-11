import {useState, useEffect} from "react";
import { useSpring, animated, useChain, useSpringRef} from "react-spring";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ThemeProvider} from '@mui/material/styles';
import {styled as materialStyled} from '@mui/system';
import { TfiLayoutPlaceholder } from "react-icons/tfi";
import styled from 'styled-components'
import '../index.css';

const StyledBox = styled.div`
        display: flex;
        opacity: ${props => props.isShown ? '1' : '0'};
        border-radius: 5px;
        position: absolute;
        z-index: -2;
        right: 5px;
        top: 100px;
        background-color: #FFFFFF;
        transition: opacity 0.6s ease-in-out;
        &:before, &:after {
          content: '';
          position: absolute;
          width: ${props => props.isShown ? 'calc(100% - 2px)' : '30px'};
          height: ${props => props.isShown ? 'calc(100% - 2px)' : '30px'};
          border-radius: ${props => props.isShown ? '5px' : '0px'};
          transition: .45s ease-in-out;
        };
        &:before {
          border-top-left-radius: 5px;
          top: 0;
          left: 0;
          border-top: 2px solid rgb(41, 121, 255);
          border-left: 2px solid rgb(41, 121, 255);
        };
        &:after {
          border-bottom-right-radius: 5px;
          right: 0;
          bottom: 0;
          border-right: 2px solid rgb(41, 121, 255);
          border-bottom: 2px solid rgb(41, 121, 255);
        };
`

const InfoBox = ({ isShown }) => {

    return  (
        <StyledBox isShown={isShown}>

        </StyledBox>
    );
};

export default InfoBox;