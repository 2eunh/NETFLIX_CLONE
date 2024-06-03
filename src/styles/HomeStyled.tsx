import styled from "styled-components";

export const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  overflow-x: hidden;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    //배경에 그라데이션 넣어줌
    url(${(props) => props.bgPhoto});
  background-size: cover;
  .btn-area {
    display: flex;
    margin-top: 20px;
    .btn{
      height: 50px;
      font-size: 25px;
      font-weight: 500;
      text-align: center;
      padding-top: 8px;
      color: black;
      border-radius: 5px;
      &:hover{
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .btn-icon{
      padding-top:5px;
    }
  }
`;

export const Title = styled.h2`
  font-size: 58px;
  font-weight: 600;
  margin-bottom: 20px;
`;
export const Overview = styled.p`
  font-size: 26px;
  width: 50%;
`;

export const SliderLow = styled.div`
  width: 100%;
  height: 280px;
`;

export const InfoBtn = styled.div`
  background-color: #ffffffb0;
  width: 220px;
  height: 50px;
  margin-left: 15px;
`;
export const PlayBtn = styled.div`
  background-color: white;
  width: 140px;
  
`;