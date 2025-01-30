'use client';

import SSlide from "@/components/skeleton/SSlider";
import { useEffect, useState } from "react";
import CatCard from "@/components/catCard";
import Slider from "@/components/Slider";
import Hero from "@/components/Hero";
import axios from 'axios';

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default function Home() {
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [playingMovieData, setPlayingMovieData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );
      setPopularMovieData(response.data.results);
      console.log(response.data.results)
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Failed to fetch popular movies.");
      console.error(err);
    }
  };

  const fetchPlaying = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );
      setPlayingMovieData(response.data.results);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Failed to fetch popular movies.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPlaying();
  }, []);

  return (
    <div>
      {errorMessage && <div className="error-message text-red-500">{errorMessage}</div>}
      <Hero movieData={playingMovieData} />
      {isLoading ? (<SSlide />) :
        (<Slider movieData={popularMovieData} slideTitle="Trending movies" />)}
      <div className="w-full flex justify-center items-center mb-10 pr-[30px] pl-[30px] lg:pl-20 lg:pr-20">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          <CatCard logo={"/imgs/disney.jpg"} video={"/imgs/disney-v.mp4"} />
          <CatCard logo={"/imgs/starwars.jpg"} video={"/imgs/starwars-v.mp4"} />
          <CatCard logo={"/imgs/marvel.jpg"} video={"/imgs/marvel-v.mp4"} />
          <CatCard logo={"/imgs/pixar.jpg"} video={"/imgs/pixar-v.mp4"} />
          <CatCard logo={"/imgs/ngeo.jpg"} video={"/imgs/ngeo-v.mp4"} />
          <CatCard logo={"/imgs/star.jpg"} video={"/imgs/star-v.mp4"} />
        </div>
      </div>
    </div>
  );
}
