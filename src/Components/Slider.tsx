import { AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Box, Info, LeftSlideButton, ModalCover, ModalTitle, MovieModal, Overlay, RightSlideButton, Row, SliderTitle, Sliders, boxVariants, infoVariants, rowVariants } from "../styles/SliderStyled";

const offset = 6;

function Slider({ data, title, category }: any) {
  console.log(data, title, category);
  const [slideDir, setSlideDir] = useState(1);
  const navigate = useNavigate();
  const modalMovieMatch: PathMatch<string> | null =
    useMatch("/movies/:movieId");
  const { scrollY } = useScroll();
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
  const onOverlayClick = () => navigate("/");
  const clickedMovie =
    modalMovieMatch?.params.movieId &&
    data?.results.find(
      (movie: any) => String(movie.id) === modalMovieMatch.params.movieId
    );

  return (
    <>
      <Sliders>
        <SliderTitle>{title}</SliderTitle>
        <AnimatePresence custom={slideDir} initial={false} onExitComplete={toggleLeaving}>
          <LeftSlideButton onClick={decreaseIndex}>
            <FaChevronCircleLeft size="50" />
          </LeftSlideButton>
          <Row
            custom={slideDir}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={index}
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie: any) => (
                <Box
                  layoutId={movie.id + ""}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <RightSlideButton onClick={incraseIndex}>
            <FaChevronCircleRight size="50" />
          </RightSlideButton>
        </AnimatePresence>
      </Sliders>
      <AnimatePresence>
        {modalMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <MovieModal
              style={{ top: scrollY.get() + 100 }}
              layoutId={modalMovieMatch.params.movieId}
            >
              {clickedMovie && (
                <>
                  <ModalCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <ModalTitle>{clickedMovie.title}</ModalTitle>
                </>
              )}
            </MovieModal>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Slider;
