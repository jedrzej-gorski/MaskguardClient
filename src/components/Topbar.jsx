import styled from "styled-components"
import Box from '@mui/material/Box';

const Bar = styled.div`
    top: 0px;
    height: 80px;
    width: 100vw;
    background-color: #0280ee;
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
`

const Topbar = (props) => {
    return (
        <Box {...props} component={Bar}>
            <Logo style={{color: '#FFFFFF'}}>MASKGUARD</Logo>
            </Box>
    )
}

export default Topbar;