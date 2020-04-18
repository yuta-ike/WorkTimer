import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.primary};
  cursor: pointer;

  &:hover{
    background: rgba(0, 0, 0, 0.1);
  }
`

export default ({onClick, children, ...rest}) => {
  const handleClick = (e) => {
    onClick(e)
  }
  return(
    <Button onClick={handleClick} {...rest}>
      {children}
    </Button>
  )
}
