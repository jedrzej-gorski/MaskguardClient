import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 10px;
  background-color: #88CFF9;
  color: #122c34;
  border-radius: 8px;
  border-color: #122c34;
  border-width: 4px;
  font-weight: bold;
  font-size: 1.5rem;
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