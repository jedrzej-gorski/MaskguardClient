import styled from 'styled-components';
import Button from './Button';

const PopUp = styled.div`
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

const Modal = ({onClose, onConfirm, imgSrc}) => {

    return (
        <>
          <Overlay onClick={onClose} />
          <PopUp>
            <CapturedImage src={imgSrc} alt="captured camera input" />
            <ButtonWrapper>
              <Button onClick={onClose}>Discard</Button>
              <Button onClick={onConfirm}>Send</Button>
            </ButtonWrapper>
          </PopUp>
        </>
    )
}

export default Modal;