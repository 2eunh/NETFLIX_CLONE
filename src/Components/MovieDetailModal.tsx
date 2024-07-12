import YouTube from "react-youtube";
import {
  ModalCover,
  ModalInfo,
  ModalTitle,
  ModalWrapper,
  Outline,
} from "../styles/ModalStyled";
import { Info, MovieModal } from "../styles/SliderStyled";
import { makeImagePath } from "../utils";
import { FaStar } from "react-icons/fa";

function MovieDetailModal({
  category,
  movieViedo,
  clickedMovie,
  scrollY,
}: any) {
  if (!clickedMovie) {
    return null;
  }

  //장르 받아오기
  let genres = new Array();
  if (clickedMovie?.genres) {
    clickedMovie?.genres.forEach((genre: any) => {
      genres.push(genre.name);
    });
  }
  let genresString = genres.join(", ");

  //평점 반올림
  let roundedVoteAverage;
  if (clickedMovie?.vote_average) {
    roundedVoteAverage = clickedMovie.vote_average.toFixed(1);
  }
  //비디오 받아오기
  // const getVideo = () => {
  let videoKey;
  if (movieViedo && Array.isArray(movieViedo.results)) {
    for (let i = 0; i < movieViedo.results.length; i++) {
      let viedoResults = movieViedo.results[i];
      if (
        viedoResults.site.toLowerCase() === "youtube" &&
        (viedoResults.type.toLowerCase() === "teaser" ||
          viedoResults.type.toLowerCase() === "trailer")
      ) {
        videoKey = viedoResults.key;
        break; 
      } else {
        videoKey = "undefined";
      }
    }
  }else {
    videoKey = "undefined";
  }
  // };

  return (
    <MovieModal
      style={{ top: scrollY + 100 }}
      layoutId={`${category}${clickedMovie.id}`}
      key={`${category}${clickedMovie.id}`}
    >
      {clickedMovie && (
        <>
          {videoKey === "undefined" ? (
            <ModalCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedMovie.backdrop_path,
                  "w500"
                )})`,
              }}
            />
          ) : (
            <YouTube
              videoId={videoKey}
              opts={{
                width: "100%",
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
            ></YouTube>
          )}
          <ModalInfo>
            <ModalTitle>
              <p>{clickedMovie.title}</p>
              <div>
                <FaStar color="yellow" />
                <span className="vote_average">{roundedVoteAverage}</span>
              </div>
            </ModalTitle>
            <Outline>
              <div>
                <span className="label">release date:</span>
                <span className="date">{clickedMovie.release_date}</span>
              </div>
              <div>
                <span className="label">genre:</span>
                <span className="genre">{genresString}</span>
              </div>
              <div>
                <span className="label">runtime:</span>
                <span className="runtime">{clickedMovie.runtime}</span>
              </div>
              <div>
                <span className="overview">{clickedMovie.overview}</span>
              </div>
            </Outline>
          </ModalInfo>
        </>
      )}
    </MovieModal>
  );
}

export default MovieDetailModal;
