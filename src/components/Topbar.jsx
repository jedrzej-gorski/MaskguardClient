import styled from "styled-components"
import Box from '@mui/material/Box';
import Tab from "./Tab"
import { MdHome } from "react-icons/md";

const Bar = styled.div`
    top: 0px;
    height: 80px;
    width: 100vw;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    font-weight: bold;
    font-size: 2.0rem;
    box-shadow: 2px 2px 5px gray;
`

const Logo = styled.span`
    color: #122c34;
    font-family: Bavro;
`

const Topbar = ({selectedTab, changeSelectedTab}) => {

    const updateTab = (id) => {
        return () => {changeSelectedTab(id)};
    }

    return (
        <Box component={Bar}>
            <Logo style={{color: '#0280ee'}}>MASKGUARD</Logo>
            <div className="tab-container">
                <Tab caption={"Home"} Icon={MdHome} className={selectedTab === 1 ? "selected-tab" : "tab"} onClick={updateTab(1)} id={1}>
                </Tab>
                <Tab caption={"About"} Icon={MdHome} className={selectedTab === 2 ? "selected-tab" : "tab"} onClick={updateTab(2)} id={2}>
                </Tab>
            </div>
            </Box>
    )
}

export default Topbar;