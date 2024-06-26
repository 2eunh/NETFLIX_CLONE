import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "../api";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import { BsInfoCircle } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import {
  Banner,
  InfoBtn,
  Loader,
  Overview,
  PlayBtn,
  SliderLow,
  Title,
  Wrapper,
} from "../styles/HomeStyled";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence, useScroll } from "framer-motion";
import { Overlay } from "../styles/SliderStyled";
import MovieDetailModal from "../Components/MovieDetailModal";

function Home() {
  // const { data: nowPlaying, isLoading: nowPlayingIsLoading } =
  //   useQuery<IGetMoviesResult>("movies", () => getNowPlaying());
  // const { data: popular, isLoading: popularIsLoading } =
  //   useQuery<IGetMoviesResult>("popular", () => getPopular());
  // const { data: topRated, isLoading: topRatedIsLoading } =
  //   useQuery<IGetMoviesResult>("topRated", () => getTopRated());
  // const { data: upcoming, isLoading: upcomingIsLoading } =
  //   useQuery<IGetMoviesResult>("upcoming", () => getUpcoming());

  const addCategory = (data: IGetMoviesResult, category: string) => ({
    ...data,
    results: data.results.map((movie: any) => ({
      ...movie,
      category,
    })),
  });

  const { data: nowPlaying, isLoading: nowPlayingIsLoading } =
    useQuery<IGetMoviesResult>("movies", () => getNowPlaying(), {
      select: (data) => addCategory(data, "nowPlaying"),
    });
  const { data: popular, isLoading: popularIsLoading } =
    useQuery<IGetMoviesResult>("popular", () => getPopular(), {
      select: (data) => addCategory(data, "popular"),
    });
  const { data: topRated, isLoading: topRatedIsLoading } =
    useQuery<IGetMoviesResult>("topRated", () => getTopRated(), {
      select: (data) => addCategory(data, "topRated"),
    });
  const { data: upcoming, isLoading: upcomingIsLoading } =
    useQuery<IGetMoviesResult>("upcoming", () => getUpcoming(), {
      select: (data) => addCategory(data, "upcoming"),
    });
  const clickInfo = () => {
    const bannerMovie = popular?.results[0];
  };
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");

  const modalMovieMatch: PathMatch<string> | null =
    useMatch("/movies/:movieId");
  const clickedMovie = () => {

  };

  console.log(clickedMovie);

  return (
    <Wrapper>
      {nowPlayingIsLoading ||
      popularIsLoading ||
      topRatedIsLoading ||
      upcomingIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(popular?.results[0].backdrop_path || "")}
          >
            <Title>{popular?.results[0].title}</Title>
            <Overview>{popular?.results[0].overview}</Overview>
            <div className="btn-area">
              <PlayBtn className="btn">
                <FaPlay className="btn-icon" /> Play
              </PlayBtn>
              <InfoBtn className="btn" onClick={clickInfo}>
                <BsInfoCircle className="btn-icon" /> Information
              </InfoBtn>
            </div>
          </Banner>
          {/* <SliderLow>
            <Slider data={nowPlaying} title="Now Playing" category="now"/>
          </SliderLow> */}
          <SliderLow>
            <Slider data={popular} title="Popular Movies" category="popular" />
          </SliderLow>
          <SliderLow>
            <Slider data={topRated} title="Top Rated" category="top" />
          </SliderLow>
          <SliderLow>
            <Slider data={upcoming} title="Upcoming" category="upc" />
          </SliderLow>

          <AnimatePresence>
            {modalMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <MovieDetailModal
                  modalMovieMatch={modalMovieMatch}
                  clickedMovie={clickedMovie}
                  scrollY={scrollY.get()}
                ></MovieDetailModal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
