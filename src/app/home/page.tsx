'use client';

import { Slider, SliderSeries, Hero, CatCard } from "@/components";
import { Analytics } from "@vercel/analytics/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const fetchDataFromAPI = async (endpoint: string, params = {}) => {
  try {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
      params,
    });
    return response.data.results;
  } catch (err) {
    console.error(`Failed to fetch from ${endpoint}`, err);
    throw err;
  }
};

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

      const popularData = await fetchDataFromAPI('/movie/popular?language=en-US&page=1');
      setPopularMovieData(popularData);

      const nowPlayingData = await fetchDataFromAPI('/movie/now_playing?language=en-US&page=1');
      setPlayingMovieData(nowPlayingData);

      const topRatedData = await fetchDataFromAPI('/movie/top_rated?language=en-US&page=1');
      setTopRatedMovieData(topRatedData);

      const trendingSeriesData = await fetchDataFromAPI('/trending/tv/week');
      setTrendingSeriesData(trendingSeriesData);

      const topRatedSeriesData = await fetchDataFromAPI('/tv/top_rated');
      setTopRatedSeriesData(topRatedSeriesData);

      const koreanMoviesData = await fetchDataFromAPI('/discover/tv', {
        include_adult: 'true',
        include_null_first_air_dates: 'false',
        language: 'ko-KR',
        page: '1',
        sort_by: 'vote_count.desc',
        with_original_language: 'ko',
      });
      setTrendingKD(koreanMoviesData);

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Failed to fetch movie data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {errorMessage && <div className="error-message text-red-500">{errorMessage}</div>}
      <Hero movieData={playingMovieData} />
      <div className="ml-[4%]">
        <Slider movieData={popularMovieData} slideTitle="Trending movies" category="popular" />
      </div>
      <div className="w-full flex justify-center items-center mb-12 mt-12 px-8 sm:px-10 lg:px-32">
        <div className="w-full grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-1 sm:gap-4">
          <CatCard onClick={() => router.push(`/collection/3166/disney`)} logo={"/imgs/disney.jpg"} video={"/imgs/disney-vv.mp4"} />
          <CatCard onClick={() => router.push(`/collection/1-lucasfilm-ltd/starwars`)} logo={"/imgs/starwars.jpg"} video={"/imgs/starwars-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/420/marvel`)} logo={"/imgs/marvel.jpg"} video={"/imgs/marvel-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/3/pixar`)} logo={"/imgs/pixar.jpg"} video={"/imgs/pixar-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/4/paramount`)} logo={"/imgs/paramount.jpg"} video={"/imgs/paramount-v.mp4"} />
          <CatCard onClick={() => router.push(`/collection/7521/ngeo`)} logo={"/imgs/ngeo.jpg"} video={"/imgs/ngeo-v.mp4"} />
        </div>
      </div>
      <div className="mt-12 ml-[4%]">
        <Slider movieData={topRatedMovieData} slideTitle="Top Rated Movies" category="top_rated" />
      </div>
      <div className="mt-12 ml-[4%]">
        <SliderSeries movieData={trendingSeriesData} slideTitle="Trending Series" category="trending" type={false} />
      </div>
      <div className="mt-12 ml-[4%]">
        <SliderSeries movieData={topRatedSeriesData} slideTitle="Top Rated Series" category="top_rated" type={false} />
      </div>
      <div className="mt-12 mb-20 ml-[4%]">
        <SliderSeries movieData={trendingKD} slideTitle="Kdramas" category="kdrama" type={true} />
      </div>
      <Analytics />
    </div>
  );
}
