import styled from "styled-components";
import Button from "@mui/material/Button";
import {animated, useSpring, useTransition} from 'react-spring'
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from '../theme.js';
import {useTranslation} from "react-i18next";

const PopUp = styled(animated.div)`
  z-index: 10;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  background-color: white;
  border: solid 2px;
  border-color: rgba(0, 0.5, 0.9, 0.6);
  border-radius: 16px;
  padding: 12px;
  box-sizing: border-box;
  @media (max-aspect-ratio: 11/10) {
    width: 90%;
  }
  width: 99vh; 
  max-height: 95%;
`;

const Overlay = styled(animated.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  transition: opacity .5s ease-in-out;
  opacity: ${props => props.isOpen? '1' : '0'};
  background-color: rgba(0, 0, 0, 0.6)
`;

const CapturedImage = styled.img`
  height: 100%;
  @media (max-device-height: 928px) {
    max-height: 70vh;
  }
  max-height: 90vh;
  @media (max-aspect-ratio: 1/1) {
    max-width: 90vh;
  }
  width: 100%;
  object-fit: contain;
  border-radius: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0px 12px 0px;
  max-width: 600px;
  width: 100%;

`;

const Modal = ({ imageClearer, isOpen, onClose, onConfirm, imgSrc }) => {
    const transition = useTransition(isOpen, {
        from: { opacity: 0, transform: "translate(-50%, -150%)" },
        enter: { opacity: 1, transform: "translate(-50%, -50%)"},
        leave: { opacity: 0, transform: 'translate(-50%, 100%)'},
        config: {
            mass: 0.5,
            tension: 180,
            friction: 21
        },
        onRest: () => {
            if (!isOpen) {
                imageClearer()
            }
        }
    })
    const {t, i18n} = useTranslation()
  return(
      <>
        {transition((style, item) => {
            if (item) {
                return (
                    <>
                        <Overlay onClick={onClose} isOpen={isOpen}/>
                        <PopUp style={style}>
                            <CapturedImage src={imgSrc} alt="captured camera input" />
                            <ButtonWrapper>
                                <ThemeProvider theme={muiTheme}>
                                    <Button variant="contained" sx={{bgcolor: 'primary.main', margin: '5px'}} onClick={onClose}>{t('Discard')}</Button>
                                    <Button variant="contained" sx={{bgcolor: 'primary.main', margin: '5px'}} onClick={onConfirm}>{t('Send')}</Button>
                                </ThemeProvider>
                            </ButtonWrapper>
                        </PopUp>
                    </>
              )
            }
        })}
      </>
    )
};

export default Modal;
