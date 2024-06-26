import { useScroll } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { ModalCover, ModalTitle, MovieModal, Overlay } from "../styles/SliderStyled";
import { makeImagePath } from "../utils";

function MovieDetailModal ({modalMovieMatch,clickedMovie, scrollY } : any) {
  
  // const navigate = useNavigate();
  // const onOverlayClick = () => navigate("/");
  // const { scrollY } = useScroll();
  // const modalMovieMatch: PathMatch<string> | null =
  //   useMatch("/movies/:movieId");
  // const clickedMovie =
  //   modalMovieMatch?.params.movieId &&
  //   data?.results.find(
  //     (movie: any) => String(movie.id) === modalMovieMatch.params.movieId
  //   );

  console.log(modalMovieMatch,clickedMovie, scrollY);
  console.log(clickedMovie);
  console.log(scrollY);
  

  return (
    <MovieModal
      style={{ top: scrollY + 100 }}
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
  );
};

export default MovieDetailModal;