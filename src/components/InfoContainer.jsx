import {useMediaQuery} from "react-responsive";
import {useWindowSize} from "./maskguardhooks";
import InfoPager from "./InfoPager";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    @media (min-aspect-ratio: 11/5) {
      top: calc(-4% - 5px);
    }
`
const InfoContainer = (props) => {
    const windowSize = useWindowSize()
    const hasPositiveAspectRatio = useMediaQuery({query: '(min-aspect-ratio: 1/1)'})
    let containerStyle = {}

    if (!hasPositiveAspectRatio) {
        containerStyle = {width: 0.9 * windowSize.width, height: windowSize.width * 0.9 * 3/4}
    }
    else {
        containerStyle = {height: windowSize.height * 0.7, width: windowSize.height * 0.7 * 4/3}
    }

    return (
        <Container style={containerStyle}>
            <InfoPager isShown={1}></InfoPager>
        </Container>
    )
}

export default InfoContainer