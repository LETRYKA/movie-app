'use client';

import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_KEY;

export default function Home() {

  useEffect(() => {
    console.log('%c Stop!', 'font-size: 48px; font-family: "Work Sans", sans-serif; color: red; font-weight: bold;');
    console.log('%c This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a movie feature or "hack" someones account, it is a scam and will give them access to your account.', 'font-size: 18px; font-family: "Work Sans", sans-serif; color: white; font-weight: medium;');
  }, []);

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
      console.log(response.data.results)
      setErrorMessage('');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <Hero />
      <Slider />
    </div>
  );
}
