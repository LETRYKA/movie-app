'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Slider, SliderSeries, Hero, CatCard } from "@/components"
import axios from 'axios';

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default function Home() {
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [playingMovieData, setPlayingMovieData] = useState([]);
  const [topRatedMovieData, setTopRatedMovieData] = useState([]);
  const [trendingSeriesData, setTrendingSeriesData] = useState([]);
  const [topRatedSeriesData, setTopRatedSeriesData] = useState([]);
  const [trendingKD, setTrendingKD] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const popular = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );
      setPopularMovieData(popular.data.results);
      console.log(`TEEEEE`, popular.data.results)

      const nowPlaying = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );
      setPlayingMovieData(nowPlaying.data.results);

      const topRated = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );
      setTopRatedMovieData(topRated.data.results);

      const trendingSeries = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/tv/week`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );
      setTrendingSeriesData(trendingSeries.data.results);

      const topRatedSeries = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/top_rated`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );
      setTopRatedSeriesData(topRatedSeries.data.results);

      const koreanMovies = await axios.get(
        `${process.env.TMDB_BASE_URL}/discover/tv`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
          params: {
            include_adult: 'true',
            include_null_first_air_dates: 'false',
            language: 'ko-KR',
            page: '1',
            sort_by: 'vote_count.desc',
            with_original_language: 'ko'
          },
        }
      );
      setTrendingKD(koreanMovies.data.results);

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Failed to fetch popular movies.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const catMovieCard = [{
    path: "",
    img: "",
    video: "",
  }]

  return (
    <div>
      {errorMessage && <div className="error-message text-red-500">{errorMessage}</div>}
      <Hero movieData={playingMovieData} />
      <div className="ml-[4%]">
        <Slider movieData={popularMovieData} slideTitle="Trending movies" category="popular" />
      </div>
      <div className="w-full flex justify-center items-center mb-12 mt-12 px-8 sm:px-10 lg:px-32">
        <div className="w-full grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-1 sm:gap-4">

          <CatCard onClick={() => router.push(`/collection/106768/disney`)} logo={"/imgs/disney.jpg"} video={"/imgs/disney-vv.mp4"} />
          <CatCard onClick={() => router.push(`/collection/10/star-wars`)} logo={"/imgs/starwars.jpg"} video={"/imgs/starwars-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/86311/marvel`)} logo={"/imgs/marvel.jpg"} video={"/imgs/marvel-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/10/pixar`)} logo={"/imgs/pixar.jpg"} video={"/imgs/pixar-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/10/national-geographic`)} logo={"/imgs/ngeo.jpg"} video={"/imgs/ngeo-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/10/star`)} logo={"/imgs/star.jpg"} video={"/imgs/star-v.mp4"} />
        </div>
      </div>
      <div className="mt-12 ml-[4%]">
        <Slider movieData={topRatedMovieData} slideTitle="Top Rated Movies" category="top_rated" />
      </div>
      <div className="mt-12 ml-[4%]">
        <SliderSeries movieData={trendingSeriesData} slideTitle="Trending Series" category="trending" />
      </div>
      <div className="mt-12 ml-[4%]">
        <SliderSeries movieData={topRatedSeriesData} slideTitle="Top Rated Series" category="top_rated" />
      </div>
      <div className="mt-12 mb-20 ml-[4%]">
        <SliderSeries movieData={trendingKD} slideTitle="Kdramas" category="kdrama" type={true} />
      </div>
    </div>
  );
}
