import React from 'react'
import styled from 'styled-components'

const Show = styled.div`
  position: relative;
  padding: 1em;
  background: ${props => props.theme.primaryGrad};
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px ${props => props.theme.primaryShadow};
  border-radius: 5px;
  color: #ffffff;
  text-align: center;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  z-index: 2;
  font-size: large;
  cursor: pointer;
`

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
const TimeLabel = styled.div`
  text-align: center;
  grid-column: ${props => props.itemId}
`

export default (props) => {
  const { children: { hour, minute, second }, ...rest } = props
  

  return(
    <Show {...rest}>
      <Root>
        <TimeLabel itemId="1">
          <span style={{ fontSize: "24px" }}>{("0" + hour).slice(-2)}</span><br/><span style={{fontSize: "12px"}}>時間</span>
        </TimeLabel>
        <TimeLabel itemId="2">
          <span style={{ fontSize: "24px" }}>{("0" + minute).slice(-2)}</span><br/><span style={{ fontSize: "12px" }}>分</span>
        </TimeLabel>
        <TimeLabel itemId="3">
          <span style={{ fontSize: "24px" }}>{("0" + second).slice(-2)}</span><br/><span style={{ fontSize: "12px" }}>秒</span>
        </TimeLabel>
      </Root>
      {/* <div style={{textAlign: "center", fontSize: "12px"}}>{("0" + hour2).slice(-2)}:{("0" + minute2).slice(-2)}:{("0" + second2).slice(-2)}</div> */}
    </Show>
  )
}