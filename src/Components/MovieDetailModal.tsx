import { useScroll } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { ModalCover, ModalTitle, MovieModal, Overlay } from "../styles/SliderStyled";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import { IGetMoviesResult, getMovieDetail } from "../api";

function MovieDetailModal ({category, modalMovieMatch, clickedMovie, scrollY } : any) {
  
  if (!clickedMovie) {
    return null;
  }

  console.log(category);
  
  
  return (
    <MovieModal
      style={{ top: scrollY + 100 }}
      // layoutId={modalMovieMatch.params.movieId}
      layoutId={`${category}-${clickedMovie.id}`}
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
          <div>ddd</div>
        </>
      )}
    </MovieModal>
  );
};

export default MovieDetailModal;