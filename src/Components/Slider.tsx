import { AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Box, Info, LeftSlideButton, ModalCover, ModalTitle, MovieModal, Overlay, RightSlideButton, Row, SliderTitle, Sliders, boxVariants, infoVariants, rowVariants } from "../styles/SliderStyled";
import MovieDetailModal from "./MovieDetailModal";

const offset = 6;

function Slider({ data, title, category }: any) {
  console.log(data, title, category);
  const [slideDir, setSlideDir] = useState(1);
  const navigate = useNavigate();
  // const modalMovieMatch: PathMatch<string> | null =
  //   useMatch("/movies/:movieId");
  // const { scrollY } = useScroll();
  const [index, setIndex] = useState(0);

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1; //배너에서 영화 하나 사용하는거 빼주기
      const maxIndex = Math.floor(totalMovies / offset) - 1; //내림 처리
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setSlideDir(1);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      const totalMoviesLength = data.results.length - 1;
      const maxIndex = Math.floor(totalMoviesLength / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setLeaving(true);
      setSlideDir(-1);
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [leaving, setLeaving] = useState(false);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  // const onOverlayClick = () => navigate("/");
  // const clickedMovie =
  //   modalMovieMatch?.params.movieId &&
  //   data?.results.find(
  //     (movie: any) => String(movie.id) === modalMovieMatch.params.movieId
  //   );

  // 확인: 데이터의 모든 항목이 고유한 ID를 갖는지 점검
  console.log(data.results.map((movie: { id: any; }) => movie.id));

  return (
    <Sliders key={`sliders-${category}`}>
      <SliderTitle key={`slider-title-${category}`}>{title}</SliderTitle>
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
                  layoutId={`${category}-${movie.id}`} // layoutId에 고유한 값 설정
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  key={`${category}-${movie.id}`} // Box에 고유한 key 설정
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <Info key={`info-${category}-${movie.id}`} variants={infoVariants}>
                    <h4 key={`title-${category}-${movie.id}`}>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <RightSlideButton key={`right-button-${category}`} onClick={incraseIndex}>
            <FaChevronCircleRight size="50" />
          </RightSlideButton>
        </AnimatePresence>
      </Sliders>
    );
  }

export default Slider;
