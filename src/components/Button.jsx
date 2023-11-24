import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 10px;
  background-color: #2033e3;
  border-radius: 7px;
  color: #122c34;
  font-size: 1.5rem;
  color: #FFFFFF;
  border: none;
  min-width: 100px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #a0d9fa;
  }

  &:disabled {
    cursor: default;
    background-color: lightgray;
    color: gray;
    border-color: gray;
  }
  `

const Button = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>
  }

export default Button;