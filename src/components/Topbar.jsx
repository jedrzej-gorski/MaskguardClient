import styled from "styled-components"

const Bar = styled.div`
    height: 80px;
    background-color: #88CFF9;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    font-family: "Monserrat";
    font-weight: bold;
    font-size: 1.75rem;
    box-shadow: 2px 2px 5px gray;
`

const Logo = styled.span`
    color: #122c34;
`

const Topbar = (props) => {
    return (
        <Bar {...props} >
            <Logo>MaskGuard</Logo>
            </Bar>
    )
}

export default Topbar;