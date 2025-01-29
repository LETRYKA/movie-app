'use client';

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import CatCard from "@/components/catCard";
import axios from 'axios';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [popularMovieData, setPopularMovieData] = useState([]);

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
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Failed to fetch popular movies.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {errorMessage && <div className="error-message text-red-500">{errorMessage}</div>}
      <Hero movieData={popularMovieData} setIsLoading={setIsLoading} isLoading={isLoading} />
      <Slider movieData={popularMovieData} slideTitle="Trending movies" />
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-10 pl-8 pr-8">
        <CatCard logo={"/imgs/disney.jpg"} video={"/imgs/disney-v.mp4"} />
        <CatCard logo={"/imgs/starwars.jpg"} video={"/imgs/starwars-v.mp4"} />
        <CatCard logo={"/imgs/marvel.jpg"} video={"/imgs/marvel-v.mp4"} />
        <CatCard logo={"/imgs/pixar.jpg"} video={"/imgs/pixar-v.mp4"} />
        <CatCard logo={"/imgs/ngeo.jpg"} video={"/imgs/ngeo-v.mp4"} />
        <CatCard logo={"/imgs/star.jpg"} video={"/imgs/star-v.mp4"} />
      </div>
    </div>
  );
}
