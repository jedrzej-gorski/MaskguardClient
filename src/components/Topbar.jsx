import "../index.css"
import styled from "styled-components"
import Box from '@mui/material/Box';
import Tab from "./Tab"
import { MdHome, MdInfoOutline, MdOutlineLanguage } from "react-icons/md";
import Button from "@mui/material/Button"
import {useCallback, useEffect, useState} from "react";
import constants from "../content/constants.json"

const Bar = styled.div`
    height: min(10vmin, 71px);
    min-height: 48px;
    width: 100vw;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    box-shadow: 2px 2px 5px gray;
`

const Logo = styled.span`
    height: 100%;
    font-family: Bavro;
    color: #2979FF;
    margin-left: 1%;
    font-size: max(min(6vmin, 60px), 22px);
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Topbar = ({selectedTab, changeSelectedTab}) => {
    const [language, setLanguage] = useState(0)
    const [containerWidth, setContainerWidth] = useState(null)
    const tabContainerObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            setContainerWidth(entry.contentRect.width)
        }
    })
    const containerRef = useCallback(node => {
        if (node !== null) {
            setContainerWidth(node.offsetWidth)
            tabContainerObserver.observe(node)
        }
        else {
            tabContainerObserver.disconnect()
        }
    }, [tabContainerObserver])

    const changeLanguage = () => {
        setLanguage((language + 1) % constants["nLanguages"])
    }
    const updateTab = (id) => {
        return () => {changeSelectedTab(id)};
    }

    return (
        <Box component={Bar}>
            <Logo style={{flex: '0 0 auto', color: '#2979FF', height:'100%'}}>MASKGUARD</Logo>
            <div ref={containerRef} className="tab-container">
                <Tab parentWidth={containerWidth} caption={'Home'} Icon={MdHome} selectedTab={selectedTab} onClick={updateTab(0)} id={0}>
                </Tab>
                <Tab parentWidth={containerWidth} caption={'About'} Icon={MdInfoOutline} selectedTab={selectedTab} onClick={updateTab(1)} id={1}>
                </Tab>
            </div>
        </Box>
    )
}

export default Topbar;