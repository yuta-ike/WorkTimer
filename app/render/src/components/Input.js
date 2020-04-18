import styled from "styled-components"

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  outline: none;
  background: none;
  padding: 5px;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
  appearance: none;

  border-bottom: 1px solid #43a047;

  &:focus{
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
    border-bottom: 1px solid #43a047;
  }
`

export default Input