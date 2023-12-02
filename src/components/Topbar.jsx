import "../index.css"
import styled from "styled-components"
import Box from '@mui/material/Box';
import Tab from "./Tab"
import { MdHome, MdInfoOutline, MdOutlineLanguage } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";


const Bar = styled.div`
    height: min(10vmax, 71px);
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
    font-size: min(7vmax, 80px);
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Topbar = ({selectedTab, changeSelectedTab}) => {
    const updateTab = (id) => {
        return () => {changeSelectedTab(id)};
    }

    return (
        <Box component={Bar}>
            <Logo style={{color: '#2979FF', height:'100%'}}>MASKGUARD</Logo>
            <div className="tab-container">
                <Tab caption={"Home"} Icon={MdHome} selectedTab={selectedTab} onClick={updateTab(1)} id={1}>
                </Tab>
                <Tab caption={"About"} Icon={MdInfoOutline} selectedTab={selectedTab} onClick={updateTab(2)} id={2}>
                </Tab>
            </div>
            <div style={{width: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <MdOutlineLanguage size={'min(7vmax, 55px)'} style={{color: '#5494ff'}}></MdOutlineLanguage>
            </div>
            </Box>
    )
}

export default Topbar;