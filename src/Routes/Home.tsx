import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import { BsInfoCircle } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { Banner, InfoBtn, Loader, Overview, PlayBtn, SliderLow, Title, Wrapper } from "../styles/HomeStyled";


function Home() {
  const { data: nowPlaying, isLoading: nowPlayingIsLoading } =
    useQuery<IGetMoviesResult>("movies", () => getNowPlaying());
  const { data: popular, isLoading: popularIsLoading } =
    useQuery<IGetMoviesResult>("popular", () => getPopular());
  const { data: topRated, isLoading: topRatedIsLoading } =
    useQuery<IGetMoviesResult>("topRated", () => getTopRated());
  const { data: upcoming, isLoading: upcomingIsLoading } =
    useQuery<IGetMoviesResult>("upcoming", () => getUpcoming());

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
            // onClick={incraseIndex}
            bgPhoto={makeImagePath(popular?.results[0].backdrop_path || "")}
          >
            <Title>{popular?.results[0].title}</Title>
            <Overview>{popular?.results[0].overview}</Overview>
            <div className="btn-area">
              <PlayBtn className="btn">
                <FaPlay className="btn-icon" /> Play
              </PlayBtn>
              <InfoBtn className="btn">
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
        </>
      )}
    </Wrapper>
  );
}

export default Home;
