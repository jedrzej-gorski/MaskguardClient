import styled from "styled-components";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import muiTheme from '../theme.js';

const PopUp = styled(motion.div)`
  z-index: 10;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 16px;
  padding: 12px;
  max-height: 90%;
  box-sizing: border-box;
  width: 90%;
  max-width: 1024px;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
`;

const CapturedImage = styled.img`
  height: 100%;
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

const Modal = ({ isOpen, onClose, onConfirm, imgSrc }) => {
  return (
    <>
      {isOpen && <Overlay onClick={onClose} />}
      <AnimatePresence>
        {isOpen && (
          <PopUp
            initial={{ transform: "translate(-50%, -150%)", opacity: 0 }}
            animate={{ transform: "translate(-50%, -50%)", opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ transform: "translate(-50%, 150%)" }}
          >
            <CapturedImage src={imgSrc} alt="captured camera input" />
            <ButtonWrapper>
              <ThemeProvider theme={muiTheme}>
                  <Button variant="contained" sx={{bgcolor: 'primary.main'}} onClick={onClose}>Discard</Button>
                  <Button variant="contained" sx={{bgcolor: 'primary.main'}} onClick={onConfirm}>Send</Button>
              </ThemeProvider>
            </ButtonWrapper>
          </PopUp>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
