'use client';

import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";
import axios from 'axios';

import { useParams } from "next/navigation";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [popularMovieData, setPopularMovieData] = useState([]);
  const embedUrl = `https://embed.su/embed/tv/tt0816692`;
  // https://embed.su

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
      setErrorMessage('');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err)
    }
  };


  // const fetchPopularMovies = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/movie/popular`, // Fetching popular movies
  //       {
  //         params: {
  //           api_key: process.env.TMDB_API_KEY, // Use your API key
  //           language: "en-US",
  //           page: 1,
  //           append_to_response: "images",
  //           include_image_language: "en",
  //         },
  //       }
  //     );

  //     // Extract movie IDs and fetch detailed data for each movie
  //     const movies = response.data.results;

  //     // Fetch detailed movie data (including images) for each popular movie
  //     const movieDetailsPromises = movies.map((movie: any) =>
  //       axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
  //         params: {
  //           api_key: process.env.TMDB_API_KEY,
  //           language: "en-US",
  //           append_to_response: "images",
  //           include_image_language: "en",
  //         },
  //       })
  //     );

  //     // Resolve all movie details requests
  //     const movieDetailsResponses = await Promise.all(movieDetailsPromises);

  //     // Extract data
  //     const detailedMovies = movieDetailsResponses.map(res => res.data);

  //     console.log(detailedMovies); // Logging the full movie details

  //   } catch (error) {
  //     console.error("Error fetching movie data:", error);
  //   }
  // };

  // fetchPopularMovies();



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('%c Stop!', 'font-size: 48px; font-family: "Work Sans", sans-serif; color: red; font-weight: bold;');
    console.log('%c This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a movie feature or "hack" someones account, it is a scam and will give them access to your account.', 'font-size: 18px; font-family: "Work Sans", sans-serif; color: white; font-weight: medium;');
  }, []);

  return (
    <div>
      <Hero movieData={popularMovieData} />
      <Slider movieData={popularMovieData} />
    </div>
  );
}
