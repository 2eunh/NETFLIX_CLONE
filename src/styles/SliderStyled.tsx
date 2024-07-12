import { motion } from "framer-motion";
import styled from "styled-components";

export const Sliders = styled(motion.div)`
  position: relative;
  top: -100px;
`;
export const SliderTitle = styled.p`
  margin: 0 30px 5px;
  font-size: 25px;
  font-weight: 500;
  text-shadow: 0px 2px 2px  grey;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 96%;
  margin: 10px 30px ;
`;

export const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:hover{
    cursor: pointer;
  }
`;

export const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: relative;
  width: 100%;
  top: 165px;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 15px;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const MovieModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 9;
`;



export const LeftSlideButton = styled(motion.div)`
  position: absolute;
  z-index: 99;
  top: 120px;
  margin: 0 10px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease; // 여기에 transition 추가
  &:hover {
    cursor: pointer;
    transform: scale(1.1); // scale 속성을 transform으로 변경
    opacity: 0.7;
  }
`;

export const RightSlideButton = styled(motion.div)`
  position: absolute;
  z-index: 99;
  top: 120px;
  margin: 0 10px;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease; 
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    opacity: 0.7;
  }
`;


export const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};
