import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  Box,
  Info,
  LeftSlideButton,
  RightSlideButton,
  Row,
  SliderTitle,
  Sliders,
  boxVariants,
  infoVariants,
  rowVariants,
} from "../styles/SliderStyled";

const offset = 6;




function Slider({ data, title, category }: any) {
  const [slideDir, setSlideDir] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (data && !leaving) {
      setSlideDir(1);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data && !leaving) {
      setSlideDir(-1);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  useEffect(() => {
    console.log("Current Index:", index);
  }, [index]);

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${category}/${movieId}`);
  };

  return (
    <Sliders>
      <SliderTitle>{title}</SliderTitle>
      <LeftSlideButton key={`left-button-${category}`} onClick={increaseIndex}>
        <FaChevronCircleLeft size="50" />
      </LeftSlideButton>
      <RightSlideButton key={`right-button-${category}`} onClick={decreaseIndex}>
        <FaChevronCircleRight size="50" />
      </RightSlideButton>
      <AnimatePresence custom={slideDir} initial={false} onExitComplete={toggleLeaving}>
        <Row
          as={motion.div}
          custom={slideDir}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={`row-${index}-${category}`}
          transition={{ type: "tween", duration: 1 }}
        >
          {data.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie: any) => (
              <Box
                layoutId={`${category}${movie.id}`}
                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                key={`${category}${movie.id}`}
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
      </AnimatePresence>
    </Sliders>
  );
}

export default Slider;
