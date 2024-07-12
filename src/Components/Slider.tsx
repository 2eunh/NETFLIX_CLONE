import { AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Box, Info, LeftSlideButton, RightSlideButton, Row, SliderTitle, Sliders, boxVariants, infoVariants, rowVariants } from "../styles/SliderStyled";
import MovieDetailModal from "./MovieDetailModal";

const offset = 6;

function Slider({ data, title, category }: any) {
  const [slideDir, setSlideDir] = useState(0);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  // const modalMovieMatch: PathMatch<string> | null =
  //   useMatch("/movies/:movieId");
  // const { scrollY } = useScroll();
  const [index, setIndex] = useState(0);


  // 슬라이더 동작 버튼
  const incraseIndex = () => {
    if (!data || leaving) return;
    toggleLeaving();
    const totalMovies = data.results.length - 1; // 배너에서 영화 하나 사용하는 거 빼주기
    const maxIndex = Math.floor(totalMovies / offset) - 1; // 내림 처리
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    setSlideDir(1);
  };
  
  const decreaseIndex = () => {
    if (!data || leaving) return;
    toggleLeaving();
    const totalMovies = data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setSlideDir(-1);
  };

  //무비 박스 클릭 이벤트
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${category}/${movieId}`);
  };

  return (
    <>
      <Sliders >
        <SliderTitle>{title}</SliderTitle>
        <AnimatePresence custom={slideDir} initial={false} onExitComplete={toggleLeaving}>
          <LeftSlideButton key={`left-button-${category}`} onClick={decreaseIndex}>
            <FaChevronCircleLeft size="50" />
          </LeftSlideButton>
          <Row
            custom={slideDir}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={`row-${index}-${category}`} // Row에 고유한 key 설정
            transition={{ type: "tween", duration: 1 }}
          >
            {data.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie :any) => (
                <Box
                  layoutId={`${category}${movie.id}`} // layoutId에 고유한 값 설정
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  key={`${category}${movie.id}`} // Box에 고유한 key 설정
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <Info  variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <RightSlideButton key={`right-button-${category}`} onClick={incraseIndex}>
            <FaChevronCircleRight size="50" />
          </RightSlideButton>
        </AnimatePresence>
      </Sliders>
    </>

      
    );
  }

export default Slider;
