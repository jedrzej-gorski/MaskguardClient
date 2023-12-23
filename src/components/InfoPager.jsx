import '../index.css';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {useTransition, animated, useSprings} from "react-spring";
import {useState} from "react";
import {ReactComponent as ReactIllustration} from '../content/Illustrations1.svg'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import {useTranslation} from "react-i18next";
import constants from "../content/constants.json"


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
    const {t, i18n} = useTranslation()
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

    const [springs, _] = useSprings(constants["helpPages"], (index) => ({
        height: currentPage === index ? '11px' : '7px',
        width: currentPage === index ? '11px' : '7px',
        marginLeft: currentPage === index ? '10%' : '5%',
        marginRight: currentPage === index ? '10%' : '5%',
        config: {
            mass: 0.5,
            tension: 180,
            friction: 21
        }
    }), [currentPage])
    const prevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 0))
    }



    const nextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, constants["helpPages"] - 1))
    }
    const {isShown, ...other} = props
    return <PagerBox isShown={isShown} className="help-pager" >
        <ReactIllustration size='30%' class='page-image'>
        </ReactIllustration>
            {transitions((style, item) => {
                return (
                    <animated.div style={{...style}}>
                        <p className='page-text'>{t(`Help ${item}`)}</p>
                    </animated.div>
                )
            })}

        <div className='page-navigation'>
            <IconButton onClick={prevPage} disabled={!isShown}>
                <MdOutlineChevronLeft  style={{zIndex: 2}} size={'min(8vmin, 30px)'}></MdOutlineChevronLeft>
            </IconButton>
            <div className='dot-container'>
                {springs.map((props, key) => {
                    return <animated.div key={key} className='page-dot' style={props}></animated.div>
                })
                }
            </div>
            <IconButton onClick={nextPage} disabled={!isShown}>
                <MdOutlineChevronRight style={{zIndex: 2}} size={'min(8vmin, 30px)'}></MdOutlineChevronRight>
            </IconButton>
        </div>
    </PagerBox>
}

export default InfoPager