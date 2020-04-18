import styled from "styled-components"

const TimerWindow = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 5px;
  z-index: 0;
  box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.14);
  padding: 1rem;
  margin-top: -80px;
  padding-top: 80px;
  transition: all 0.3s ease-out;
  transform: scale(${props => props.showDetail ? "1" : "0.8"}, ${props => props.showDetail ? "1" : "0.5"}) translateY(${props => props.showDetail ? "0" : "-100px"});
`

export default TimerWindow