import styled from "styled-components";

export const ModalWrapper = styled.div`
  
`;

export const ModalCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  border: 0;
`;


export const ModalInfo = styled.div`
  padding:  20px;
`;

export const ModalTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 30px;
  font-weight: 600;
  display: flex;
  div{
    font-size: 22px;
    margin-top: 8px;
    margin-left: 20px;
    .vote_average{
      margin-left: 5px;
    }
  }
`;

export const Outline = styled.div`
  margin: 20px 0;
  div{
    font-size: 20px;
    margin: 10px 0;
    .label{
      color: #9a9999;
      margin-right: 10px;
    }
  }
  .overview{
    margin-top: 15px;
    font-size: 15px;
  }
`;