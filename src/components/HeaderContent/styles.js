import styled from 'styled-components'

export const HeaderStyle = styled.header`  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  &.header-bar{
    position: fixed;
    top: 0;
    height: 55px;
    padding: 0;
    margin: 0;
    background-color: #1f5afd;
    border-bottom: 1px solid #5e72e4;
    width: 100%;
    z-index: 99;
  }

  &>.screen-width{
    /* max-width: 1024px; */
    padding: 8.5vw;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    z-index: 999;
  }

  &.screen-header-content{
    height: 70px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  }

  &>.title-header-content{
    position: initial;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 69px;
    top: 15px
  }
`

export const LogoStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
`