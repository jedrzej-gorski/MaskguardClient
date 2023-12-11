import '../index.css';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {useTransition, animated, useSpring} from "react-spring";
import {useState} from "react";
import {TfiLayoutPlaceholder} from "react-icons/tfi";
import helpContent from '../content/help_content.json';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import IconButton from "@mui/material/IconButton";


const PagerBox = styled(Box)`
  opacity: ${props => props.isShown ? '1' : '0'};
  transition: opacity 0.3s ease-in-out;
  &:before, &:after {
    content: '';
    position: absolute;
    width: ${props => props.isShown ? 'calc(100% - 2px)' : '30px'};
    height: ${props => props.isShown ? 'calc(100% - 2px)' : '30px'};
    border-radius: ${props => props.isShown ? '5px' : '0px'};
    transition: .75s ease-in-out;
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
const InfoPager = (props) => {
    const [currentPage, setCurrentPage] = useState(0)
    const transitions = useTransition(currentPage, {
        exitBeforeEnter: true,
        from: {opacity: 0, transform: 'translate3d(100%, 0, 0)' },
        enter: {opacity: 1, transform: 'translate3d(0%, 0, 0)' },
        leave: {opacity: 0, transform: 'translate3d(-50%, 0, 0)'},
        config: {
            mass: 0.5,
            tension: 180,
            friction: 21
        }
    });

    const prevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 0))
    }

    const nextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, helpContent.length - 1))
    }
    const {isShown, ...other} = props
    return <PagerBox isShown={isShown} className="help-pager" >
        <TfiLayoutPlaceholder size='min(25vh, 50px)' class='page-image'>
        </TfiLayoutPlaceholder>
            {transitions((style, item) => {
                return (
                    <animated.div style={{...style}}>
                        <p className='page-text'>{helpContent[item].content}</p>
                    </animated.div>
                )
            })}

        <div className='page-navigation'>
            <IconButton onClick={prevPage}>
                <MdOutlineChevronLeft  style={{zIndex: 2}} size={'min(8vmin, 30px)'}></MdOutlineChevronLeft>
            </IconButton>
            <div className='dot-container'>
                <div className={currentPage === 0 ? 'page-dot selected-page-dot' : 'page-dot'}></div>
                <div className={currentPage === 1 ? 'page-dot selected-page-dot' : 'page-dot'}></div>
                <div className={currentPage === 2 ? 'page-dot selected-page-dot' : 'page-dot'}></div>
            </div>
            <IconButton onClick={nextPage}>
                <MdOutlineChevronRight style={{zIndex: 2}} size={'min(8vmin, 30px)'}></MdOutlineChevronRight>
            </IconButton>
        </div>
    </PagerBox>
}

export default InfoPager